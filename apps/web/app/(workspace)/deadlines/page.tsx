
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  FileText,
  Bell,
  X,
  CalendarClock,
} from "lucide-react";

type DeadlineStatus = "Upcoming" | "Completed" | "Overdue";
type Priority = "High" | "Medium" | "Low";

type Deadline = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  priority: Priority;
  status: DeadlineStatus;
  source: string;
};

const initialDeadlines: Deadline[] = [
  {
    id: 1,
    title: "GST Payment",
    description: "Complete the monthly GST payment.",
    date: "2026-11-05",
    category: "Tax",
    priority: "High",
    status: "Upcoming",
    source: "GST Invoice October.pdf",
  },
  {
    id: 2,
    title: "Office Rent",
    description: "Pay the monthly office rent.",
    date: "2026-11-07",
    category: "Payment",
    priority: "High",
    status: "Upcoming",
    source: "Rental Agreement.pdf",
  },
  {
    id: 3,
    title: "Vendor Contract Renewal",
    description: "Review renewal terms and conditions.",
    date: "2026-11-12",
    category: "Contract",
    priority: "Medium",
    status: "Upcoming",
    source: "Vendor Contract.docx",
  },
  {
    id: 4,
    title: "Insurance Renewal",
    description: "Renew the business insurance policy.",
    date: "2026-10-28",
    category: "Insurance",
    priority: "High",
    status: "Overdue",
    source: "Insurance Policy.pdf",
  },
  {
    id: 5,
    title: "Software Subscription",
    description: "Complete the subscription payment.",
    date: "2026-11-18",
    category: "Payment",
    priority: "Low",
    status: "Upcoming",
    source: "Software Invoice.pdf",
  },
  {
    id: 6,
    title: "Employee Agreement Review",
    description: "Review employee agreement documentation.",
    date: "2026-11-22",
    category: "Contract",
    priority: "Medium",
    status: "Upcoming",
    source: "Employee Agreement.pdf",
  },
  {
    id: 7,
    title: "Quarterly Compliance Review",
    description: "Review required business compliance records.",
    date: "2026-11-25",
    category: "Compliance",
    priority: "Medium",
    status: "Upcoming",
    source: "Compliance Checklist.pdf",
  },
  {
    id: 8,
    title: "Previous Tax Filing",
    description: "Example completed tax filing task.",
    date: "2026-10-20",
    category: "Tax",
    priority: "Low",
    status: "Completed",
    source: "Tax Records.pdf",
  },
];

const statusStyles: Record<DeadlineStatus, string> = {
  Upcoming: "bg-blue-500/10 text-blue-600",
  Completed: "bg-emerald-500/10 text-emerald-600",
  Overdue: "bg-red-500/10 text-red-600",
};

const priorityStyles: Record<Priority, string> = {
  High: "text-red-600",
  Medium: "text-amber-600",
  Low: "text-emerald-600",
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState(initialDeadlines);
  const [monthDate, setMonthDate] = useState(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState("2026-11-05");
  const [selectedDeadline, setSelectedDeadline] =
    useState<Deadline | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [notice, setNotice] = useState("");

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const monthName = monthDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [year, month]);

  const visibleDeadlines = useMemo(() => {
    return deadlines.filter((deadline) => {
      const matchesSearch = `${deadline.title} ${deadline.description}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || deadline.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [deadlines, search, categoryFilter]);

  const selectedDateDeadlines = visibleDeadlines.filter(
    (deadline) => deadline.date === selectedDate
  );

  const upcomingCount = deadlines.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const overdueCount = deadlines.filter(
    (item) => item.status === "Overdue"
  ).length;

  const completedCount = deadlines.filter(
    (item) => item.status === "Completed"
  ).length;

  function changeMonth(amount: number) {
    setMonthDate(new Date(year, month + amount, 1));
    setSelectedDate("");
  }

  function completeDeadline(id: number) {
    setDeadlines((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Completed" } : item
      )
    );
    setSelectedDeadline(null);
    setNotice("Deadline marked completed in this temporary preview.");
  }

  function dateKey(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Business Schedule Management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Deadlines & Calendar
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Keep track of important business dates and never miss a deadline.
          </p>
        </div>

        <button
          onClick={() =>
            setNotice(
              "Manual deadline creation will be implemented in a future phase."
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Deadline
        </button>
      </div>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <CalendarClock
          size={19}
          className="mt-0.5 shrink-0 text-blue-600"
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Preview mode:</strong>{" "}
          Calendar events and dates are sample records. They are not synced
          with your backend or extracted from real documents.
        </p>
      </div>

      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--foreground)]">
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded-lg p-1 hover:bg-[var(--muted)]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Upcoming",
            value: upcomingCount,
            icon: Clock3,
            color: "bg-blue-500/10 text-blue-600",
          },
          {
            label: "Overdue",
            value: overdueCount,
            icon: AlertTriangle,
            color: "bg-red-500/10 text-red-600",
          },
          {
            label: "Completed",
            value: completedCount,
            icon: CheckCircle2,
            color: "bg-emerald-500/10 text-emerald-600",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted-foreground)]">
                  {item.label} Deadlines
                </span>
                <span className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold text-[var(--foreground)]">
                {item.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Calendar and selected day */}
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 xl:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Monthly Calendar
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Select a date to view its deadlines.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="rounded-lg border border-[var(--border)] p-2 hover:bg-[var(--muted)]"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="min-w-32 text-center text-sm font-semibold text-[var(--foreground)]">
                {monthName}
              </span>
              <button
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="rounded-lg border border-[var(--border)] p-2 hover:bg-[var(--muted)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-semibold text-[var(--muted-foreground)]"
                >
                  {day}
                </div>
              )
            )}

            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />;
              }

              const key = dateKey(day);
              const dayDeadlines = visibleDeadlines.filter(
                (deadline) => deadline.date === key
              );
              const isSelected = selectedDate === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(key)}
                  className={`relative flex min-h-16 flex-col items-center justify-start rounded-xl border p-2 transition sm:min-h-20 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isSelected
                        ? "text-blue-600"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {day}
                  </span>

                  <div className="mt-2 flex gap-1">
                    {dayDeadlines.slice(0, 3).map((deadline) => (
                      <span
                        key={deadline.id}
                        className={`h-1.5 w-1.5 rounded-full ${
                          deadline.status === "Completed"
                            ? "bg-emerald-500"
                            : deadline.status === "Overdue"
                              ? "bg-red-500"
                              : "bg-blue-500"
                        }`}
                      />
                    ))}
                  </div>

                  {dayDeadlines.length > 0 && (
                    <span className="mt-1 hidden text-[10px] text-[var(--muted-foreground)] sm:block">
                      {dayDeadlines.length} event(s)
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-4 border-t border-[var(--border)] pt-4">
            {[
              { label: "Upcoming", color: "bg-blue-500" },
              { label: "Completed", color: "bg-emerald-500" },
              { label: "Overdue", color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-[var(--muted-foreground)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Selected date panel */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-blue-600" />
            <h2 className="font-bold text-[var(--foreground)]">
              Selected Date
            </h2>
          </div>

          <p className="mt-2 text-sm font-medium text-[var(--muted-foreground)]">
            {selectedDate ? formatDate(selectedDate) : "Choose a calendar date"}
          </p>

          <div className="mt-5 space-y-3">
            {selectedDateDeadlines.length > 0 ? (
              selectedDateDeadlines.map((deadline) => (
                <button
                  key={deadline.id}
                  onClick={() => setSelectedDeadline(deadline)}
                  className="w-full rounded-xl border border-[var(--border)] p-4 text-left transition hover:bg-[var(--muted)]"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {deadline.title}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    {deadline.category}
                  </p>
                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[deadline.status]}`}
                  >
                    {deadline.status}
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-xl bg-[var(--muted)] p-5 text-center">
                <CalendarDays
                  size={26}
                  className="mx-auto text-[var(--muted-foreground)]"
                />
                <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
                  No deadlines
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  No matching events on this date.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* All deadlines */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              All Deadlines
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {visibleDeadlines.length} record(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Search size={17} className="text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search deadlines..."
                className="h-10 min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Filter size={16} className="text-[var(--muted-foreground)]" />
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-10 bg-transparent text-sm text-[var(--foreground)] outline-none"
              >
                <option value="All">All categories</option>
                <option value="Tax">Tax</option>
                <option value="Payment">Payment</option>
                <option value="Contract">Contract</option>
                <option value="Insurance">Insurance</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {visibleDeadlines
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((deadline) => (
              <div
                key={deadline.id}
                className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[var(--muted)]/40 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                    <FileText size={21} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {deadline.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {deadline.category} · {formatDate(deadline.date)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`text-xs font-semibold ${priorityStyles[deadline.priority]}`}
                  >
                    {deadline.priority} priority
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[deadline.status]}`}
                  >
                    {deadline.status}
                  </span>

                  <button
                    onClick={() => setSelectedDeadline(deadline)}
                    className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-blue-600"
                    aria-label={`View ${deadline.title}`}
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            ))}

          {visibleDeadlines.length === 0 && (
            <div className="px-5 py-12 text-center">
              <CalendarDays
                size={32}
                className="mx-auto text-[var(--muted-foreground)]"
              />
              <p className="mt-3 font-semibold text-[var(--foreground)]">
                No deadlines found
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Try another search or category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selectedDeadline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDeadline(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deadline-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id="deadline-dialog-title"
                className="font-bold text-[var(--foreground)]"
              >
                Deadline Details
              </h2>
              <button
                onClick={() => setSelectedDeadline(null)}
                aria-label="Close details"
                className="rounded-lg p-2 hover:bg-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Title
                </p>
                <p className="mt-1 font-semibold text-[var(--foreground)]">
                  {selectedDeadline.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Description
                </p>
                <p className="mt-1 text-sm text-[var(--foreground)]">
                  {selectedDeadline.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {formatDate(selectedDeadline.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Category
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedDeadline.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Priority
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${priorityStyles[selectedDeadline.priority]}`}
                  >
                    {selectedDeadline.priority}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Status
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedDeadline.status}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Source document
                </p>
                <p className="mt-1 break-all text-sm text-[var(--foreground)]">
                  {selectedDeadline.source}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {selectedDeadline.status !== "Completed" && (
                <button
                  onClick={() => completeDeadline(selectedDeadline.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <CheckCircle2 size={17} />
                  Mark Completed
                </button>
              )}

              <button
                onClick={() => setSelectedDeadline(null)}
                className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


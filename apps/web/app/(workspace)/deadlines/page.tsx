
"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
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
  X,
  CalendarClock,
  RotateCcw,
  Flag,
  CalendarCheck,
  Info,
  LockKeyhole,
  Crown,
  Zap,
  Gem,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import {
  hasFeatureAccess,
  PLAN_DETAILS,
  type PlanType,
} from "@/lib/subscription/feature-config";

// DEMO PLAN
// Replace with the authenticated user's plan from the backend later.
const currentPlan: PlanType = "free";

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
  Upcoming:
    "bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]",
  Completed:
    "bg-[#DCFCE7] text-[#166534] dark:bg-[#14532D] dark:text-[#BBF7D0]",
  Overdue:
    "bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#7F1D1D] dark:text-[#FECACA]",
};

const priorityStyles: Record<Priority, string> = {
  High: "text-[#B91C1C] dark:text-[#FCA5A5]",
  Medium: "text-[#A16207] dark:text-[#FCD34D]",
  Low: "text-[#15803D] dark:text-[#86EFAC]",
};

const categories = [
  "All",
  "Tax",
  "Payment",
  "Contract",
  "Insurance",
  "Compliance",
];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const panel =
  "rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]";

const heading = "text-[#142B4A] dark:text-white";
const secondary = "text-[#58708F] dark:text-[#A9BEDA]";

const inputStyle =
  "h-11 w-full rounded-xl border border-[#C7DDF5] bg-[#F5F9FF] px-3 text-sm font-medium text-[#142B4A] outline-none transition focus:border-blue-500 dark:border-[#345477] dark:bg-[#102749] dark:text-white";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#C7DDF5] bg-white px-4 py-3 text-sm font-semibold !text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#345477] dark:bg-[#17365E] dark:!text-white dark:hover:bg-[#244D7D]";

const planIcons: Record<PlanType, typeof Zap> = {
  free: Zap,
  pro: Crown,
  business: Gem,
};

function PlanBadge({ plan }: { plan: PlanType }) {
  const Icon = planIcons[plan];
  const details = PLAN_DETAILS[plan];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold"
      style={{
        color: details.color,
        borderColor: `${details.color}55`,
        backgroundColor: `${details.color}12`,
      }}
    >
      <Icon size={13} />
      {details.name}
    </span>
  );
}

function PremiumCard({
  title,
  description,
  plan,
}: {
  title: string;
  description: string;
  plan: PlanType;
}) {
  if (
    hasFeatureAccess(
      currentPlan,
      plan === "pro" ? "advanced-reminders" : "business-insights"
    )
  ) {
    return null;
  }

  const details = PLAN_DETAILS[plan];

  return (
    <div className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#345477] dark:bg-[#102749]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-3 text-blue-700 dark:bg-[#17365E] dark:text-blue-200">
            <LockKeyhole size={21} />
          </div>

          <div>
            <h3 className={`font-bold ${heading}`}>{title}</h3>
            <p className={`mt-1 text-xs leading-6 ${secondary}`}>
              {description}
            </p>
            <div className="mt-3">
              <PlanBadge plan={plan} />
            </div>
          </div>
        </div>

        <Link
          href="/subscription"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
          style={{
            backgroundColor: details.color,
            color: plan === "business" ? "#142B4A" : "#FFFFFF",
          }}
        >
          Upgrade Plan
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [monthDate, setMonthDate] = useState(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState("2026-11-05");
  const [selectedDeadline, setSelectedDeadline] =
    useState<Deadline | null>(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "Payment",
    priority: "Medium" as Priority,
    source: "",
  });

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
      const searchText =
        `${deadline.title} ${deadline.description} ${deadline.source} ${deadline.category}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        deadline.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        deadline.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [deadlines, search, categoryFilter, statusFilter]);

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

  const highPriorityCount = deadlines.filter(
    (item) => item.priority === "High" && item.status !== "Completed"
  ).length;

  const sortedDeadlines = [...visibleDeadlines].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  function changeMonth(amount: number) {
    setMonthDate(new Date(year, month + amount, 1));
    setSelectedDate("");
  }

  function dateKey(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  function resetFilters() {
    setSearch("");
    setCategoryFilter("All");
    setStatusFilter("All");
  }

  function updateDeadlineStatus(id: number, status: DeadlineStatus) {
    setDeadlines((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedDeadline(null);
    setNotice(
      `Deadline marked as ${status.toLowerCase()} in this local preview.`
    );
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      date: "",
      category: "Payment",
      priority: "Medium",
      source: "",
    });
  }

  function addDeadline(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newDeadline: Deadline = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date,
      category: formData.category,
      priority: formData.priority,
      status: "Upcoming",
      source: formData.source.trim() || "Manually added",
    };

    setDeadlines((current) => [...current, newDeadline]);

    const newDate = new Date(`${newDeadline.date}T00:00:00`);
    setMonthDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
    setSelectedDate(newDeadline.date);

    setShowAddForm(false);
    resetForm();
    setNotice("New deadline added to this local preview.");
  }

  return (
    <div className="space-y-7 pb-12">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#93C5FD]">
              <CalendarClock size={17} />
              BUSINESS SCHEDULE MANAGEMENT
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Deadlines & Calendar
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Organise important business dates, monitor upcoming
              responsibilities and keep track of completed tasks.
            </p>

            <div className="mt-4">
              <PlanBadge plan={currentPlan} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex h-16 w-16 items-center justify-center self-start rounded-2xl bg-[#2563EB] shadow-lg">
              <CalendarDays size={32} className="text-white" />
            </div>

            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#142B4A] transition hover:bg-[#DBEAFE]"
            >
              <Plus size={17} />
              Add Deadline
            </button>
          </div>
        </div>
      </section>

      {/* PREVIEW NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <Info size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />

        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> Calendar events and dates are
          sample records. New records and status changes are temporary
          and are not synced with your backend.
        </p>
      </div>

      {/* NOTICE */}
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
        >
          <p className="leading-6">{notice}</p>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="shrink-0 rounded-lg p-1 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#142B4A]"
          >
            <X size={17} />
          </button>
        </motion.div>
      )}

      {/* SUMMARY CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Upcoming",
            value: upcomingCount,
            description: "Tasks scheduled ahead",
            icon: Clock3,
            color: "bg-[#DBEAFE] text-[#2563EB]",
          },
          {
            label: "Overdue",
            value: overdueCount,
            description: "Require attention",
            icon: AlertTriangle,
            color: "bg-[#FEE2E2] text-[#B91C1C]",
          },
          {
            label: "Completed",
            value: completedCount,
            description: "Tasks marked complete",
            icon: CheckCircle2,
            color: "bg-[#DCFCE7] text-[#166534]",
          },
          {
            label: "High Priority",
            value: highPriorityCount,
            description: "Important responsibilities",
            icon: Flag,
            color: "bg-[#FEF3C7] text-[#A16207]",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className={`${panel} p-5 shadow-sm`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`text-sm font-semibold ${secondary}`}>
                  {item.label}
                </span>

                <span className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon size={20} />
                </span>
              </div>

              <p className={`mt-4 text-3xl font-bold ${heading}`}>
                {item.value}
              </p>

              <p className={`mt-1 text-xs ${secondary}`}>
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* PREMIUM FEATURES */}
      <PremiumCard
        title="Advanced Reminders"
        description="Unlock enhanced reminder management for important business dates."
        plan="pro"
      />

      <PremiumCard
        title="Business Intelligence"
        description="Unlock advanced business insights and reporting tools."
        plan="business"
      />

      {/* CALENDAR AND SELECTED DATE */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* CALENDAR */}
        <div className={`${panel} p-5 shadow-sm xl:col-span-2`}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className={`text-lg font-bold ${heading}`}>
                Monthly Calendar
              </h2>

              <p className={`mt-1 text-xs ${secondary}`}>
                Select a date to view its deadlines.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="rounded-lg border border-[#D7E6F8] bg-[#EFF6FF] p-2 text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white dark:hover:bg-[#2563EB]"
              >
                <ChevronLeft size={19} />
              </button>

              <span className={`min-w-36 text-center text-sm font-bold ${heading}`}>
                {monthName}
              </span>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="rounded-lg border border-[#D7E6F8] bg-[#EFF6FF] p-2 text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white dark:hover:bg-[#2563EB]"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div
                  key={day}
                  className={`py-3 text-center text-xs font-bold ${secondary}`}
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
                  type="button"
                  onClick={() => setSelectedDate(key)}
                  aria-label={`${formatDate(key)}, ${dayDeadlines.length} deadlines`}
                  aria-pressed={isSelected}
                  className={`flex min-h-16 flex-col items-center justify-start rounded-xl border p-2 transition sm:min-h-20 ${
                    isSelected
                      ? "border-[#2563EB] bg-[#DBEAFE] dark:bg-[#203D65]"
                      : "border-transparent hover:border-[#D7E6F8] hover:bg-[#EFF6FF] dark:hover:border-[#263D60] dark:hover:bg-[#203D65]"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      isSelected
                        ? "text-[#1D4ED8] dark:text-[#93C5FD]"
                        : heading
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
                            ? "bg-[#16A34A]"
                            : deadline.status === "Overdue"
                              ? "bg-[#DC2626]"
                              : "bg-[#2563EB]"
                        }`}
                      />
                    ))}
                  </div>

                  {dayDeadlines.length > 0 && (
                    <span className={`mt-1 hidden text-[10px] font-medium ${secondary} sm:block`}>
                      {dayDeadlines.length} event(s)
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* CALENDAR LEGEND */}
          <div className="mt-5 flex flex-wrap gap-5 border-t border-[#D7E6F8] pt-4 dark:border-[#263D60]">
            {[
              { label: "Upcoming", color: "bg-[#2563EB]" },
              { label: "Completed", color: "bg-[#16A34A]" },
              { label: "Overdue", color: "bg-[#DC2626]" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <span className={`text-xs font-medium ${secondary}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SELECTED DATE */}
        <div className={`${panel} p-5 shadow-sm`}>
          <div className="flex items-center gap-2">
            <CalendarCheck size={21} className="text-[#2563EB]" />

            <h2 className={`font-bold ${heading}`}>Selected Date</h2>
          </div>

          <p className={`mt-2 text-sm font-semibold ${secondary}`}>
            {selectedDate
              ? formatDate(selectedDate)
              : "Choose a calendar date"}
          </p>

          <div className="mt-5 space-y-3">
            {selectedDateDeadlines.length > 0 ? (
              selectedDateDeadlines.map((deadline) => (
                <button
                  key={deadline.id}
                  type="button"
                  onClick={() => setSelectedDeadline(deadline)}
                  className="w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 text-left transition hover:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65]"
                >
                  <p className={`text-sm font-bold ${heading}`}>
                    {deadline.title}
                  </p>

                  <p className={`mt-2 text-xs ${secondary}`}>
                    {deadline.category}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[deadline.status]}`}
                  >
                    {deadline.status}
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-xl bg-[#EFF6FF] p-5 text-center dark:bg-[#203D65]">
                <CalendarDays
                  size={28}
                  className="mx-auto text-[#2563EB]"
                />

                <p className={`mt-3 text-sm font-bold ${heading}`}>
                  No deadlines
                </p>

                <p className={`mt-1 text-xs leading-5 ${secondary}`}>
                  No matching events on this date.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ALL DEADLINES */}
      <section className={`${panel} overflow-hidden shadow-sm`}>
        <div className="flex flex-col justify-between gap-4 border-b border-[#D7E6F8] p-5 dark:border-[#263D60] lg:flex-row lg:items-center">
          <div>
            <h2 className={`text-lg font-bold ${heading}`}>
              All Deadlines
            </h2>

            <p className={`mt-1 text-xs ${secondary}`}>
              {visibleDeadlines.length} record(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/* SEARCH */}
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#203D65]">
              <Search size={17} className="shrink-0 text-[#2563EB]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search deadlines..."
                className="h-10 min-w-0 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            {/* CATEGORY FILTER */}
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#203D65]">
              <Filter size={16} className="shrink-0 text-[#2563EB]" />

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-10 min-w-0 bg-transparent text-sm text-[#142B4A] outline-none dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm font-medium text-[#142B4A] outline-none dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
            >
              <option value="All">All statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-3 text-sm font-semibold text-[#142B4A] transition hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* DEADLINE RECORDS */}
        <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
          {sortedDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#EFF6FF] dark:hover:bg-[#203D65] sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#203D65]">
                  <FileText size={22} />
                </div>

                <div>
                  <p className={`text-sm font-bold ${heading}`}>
                    {deadline.title}
                  </p>

                  <p className={`mt-1 text-xs ${secondary}`}>
                    {deadline.category} · {formatDate(deadline.date)}
                  </p>

                  <p className={`mt-1 text-xs ${secondary}`}>
                    {deadline.source}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`text-xs font-bold ${priorityStyles[deadline.priority]}`}
                >
                  {deadline.priority} priority
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusStyles[deadline.status]}`}
                >
                  {deadline.status}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedDeadline(deadline)}
                  aria-label={`View ${deadline.title}`}
                  className="rounded-lg bg-[#DBEAFE] p-2 text-[#142B4A] transition hover:bg-[#BFDBFE] dark:bg-[#203D65] dark:text-white dark:hover:bg-[#2563EB]"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
          ))}

          {visibleDeadlines.length === 0 && (
            <div className="px-5 py-12 text-center">
              <CalendarDays
                size={34}
                className="mx-auto text-[#2563EB]"
              />

              <p className={`mt-3 font-bold ${heading}`}>
                No deadlines found
              </p>

              <p className={`mt-1 text-sm ${secondary}`}>
                Try another search or change your filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className={`${primaryButton} mt-4`}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ADD DEADLINE FORM */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#07162B]/75 p-4 backdrop-blur-sm"
          onClick={() => setShowAddForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-deadline-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 bg-[#142B4A] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#2563EB] p-3">
                  <CalendarDays size={22} />
                </div>

                <div>
                  <h2 id="add-deadline-title" className="font-bold">
                    Add New Deadline
                  </h2>
                  <p className="mt-1 text-xs text-[#DBEAFE]">
                    Create a demonstration calendar event
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                aria-label="Close form"
                className="rounded-lg p-2 text-white hover:bg-[#2563EB]"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={addDeadline} className="space-y-4 p-5 sm:p-6">
              <div>
                <label className={`mb-1.5 block text-xs font-semibold ${heading}`}>
                  Deadline title *
                </label>
                <input
                  required
                  maxLength={100}
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                  placeholder="e.g. GST Payment"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={`mb-1.5 block text-xs font-semibold ${heading}`}>
                  Description *
                </label>
                <textarea
                  required
                  maxLength={300}
                  rows={3}
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe this deadline..."
                  className={`${inputStyle} h-auto py-3`}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={`mb-1.5 block text-xs font-semibold ${heading}`}>
                    Due date *
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(event) =>
                      setFormData({ ...formData, date: event.target.value })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={`mb-1.5 block text-xs font-semibold ${heading}`}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      })
                    }
                    className={inputStyle}
                  >
                    {categories
                      .filter((category) => category !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className={`mb-1.5 block text-xs font-semibold ${heading}`}>
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        priority: event.target.value as Priority,
                      })
                    }
                    className={inputStyle}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className={`mb-1.5 block text-xs font-semibold ${heading}`}>
                    Source document
                  </label>
                  <input
                    value={formData.source}
                    onChange={(event) =>
                      setFormData({ ...formData, source: event.target.value })
                    }
                    placeholder="Optional"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-3 dark:border-[#345477] dark:bg-[#102749]">
                <p className={`text-xs leading-5 ${secondary}`}>
                  This deadline will be added to the local page preview only.
                  Backend saving will be integrated later.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className={secondaryButton}
                >
                  Cancel
                </button>

                <button type="submit" className={primaryButton}>
                  <Plus size={17} />
                  Add Deadline
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* DEADLINE DETAILS MODAL */}
      {selectedDeadline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDeadline(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="deadline-dialog-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#142B4A] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#2563EB] p-3">
                  <CalendarClock size={23} />
                </div>

                <div>
                  <h2 id="deadline-dialog-title" className="font-bold">
                    Deadline Details
                  </h2>

                  <p className="mt-1 text-xs text-[#DBEAFE]">
                    Business schedule record
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDeadline(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-white transition hover:bg-[#2563EB]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                  Deadline title
                </p>

                <h3 className={`mt-1 text-xl font-bold ${heading}`}>
                  {selectedDeadline.title}
                </h3>

                <p className={`mt-2 text-sm leading-6 ${secondary}`}>
                  {selectedDeadline.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <CalendarDays size={19} className="text-[#2563EB]" />

                  <p className={`mt-3 text-xs ${secondary}`}>Due Date</p>

                  <p className={`mt-1 text-sm font-bold ${heading}`}>
                    {formatDate(selectedDeadline.date)}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <Flag size={19} className="text-[#2563EB]" />

                  <p className={`mt-3 text-xs ${secondary}`}>Priority</p>

                  <p className={`mt-1 text-sm font-bold ${priorityStyles[selectedDeadline.priority]}`}>
                    {selectedDeadline.priority}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <Filter size={19} className="text-[#2563EB]" />

                  <p className={`mt-3 text-xs ${secondary}`}>Category</p>

                  <p className={`mt-1 text-sm font-bold ${heading}`}>
                    {selectedDeadline.category}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <CheckCircle2 size={19} className="text-[#2563EB]" />

                  <p className={`mt-3 text-xs ${secondary}`}>Status</p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[selectedDeadline.status]}`}
                  >
                    {selectedDeadline.status}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#D7E6F8] p-4 dark:border-[#263D60]">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#2563EB]" />

                  <p className={`text-sm font-bold ${heading}`}>
                    Source Document
                  </p>
                </div>

                <p className={`mt-2 break-all text-sm ${secondary}`}>
                  {selectedDeadline.source}
                </p>
              </div>

              <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-3 dark:border-[#263D60] dark:bg-[#203D65]">
                <p className={`text-xs leading-5 ${secondary}`}>
                  Preview record: changes made here are temporary and
                  will not be saved to the backend.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedDeadline.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateDeadlineStatus(
                        selectedDeadline.id,
                        "Completed"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
                  >
                    <CheckCircle2 size={17} />
                    Mark Completed
                  </button>
                )}

                {selectedDeadline.status === "Completed" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateDeadlineStatus(
                        selectedDeadline.id,
                        "Upcoming"
                      )
                    }
                    className={secondaryButton}
                  >
                    <RotateCcw size={16} />
                    Reopen Deadline
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedDeadline(null)}
                  className={secondaryButton}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

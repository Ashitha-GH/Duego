
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Bell,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  X,
  FileText,
  Wallet,
  CalendarClock,
  Trash2,
  Check,
  BellRing,
} from "lucide-react";

type ReminderStatus = "Pending" | "Completed" | "Overdue";
type ReminderPriority = "High" | "Medium" | "Low";

type Reminder = {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  source: string;
};

const initialReminders: Reminder[] = [
  {
    id: 1,
    title: "GST Payment Reminder",
    description: "Remember to complete the monthly GST payment.",
    category: "Tax",
    date: "2026-11-05",
    priority: "High",
    status: "Pending",
    source: "GST Invoice October.pdf",
  },
  {
    id: 2,
    title: "Office Rent Payment",
    description: "Pay the monthly office rental amount.",
    category: "Payment",
    date: "2026-11-07",
    priority: "High",
    status: "Pending",
    source: "Rental Agreement.pdf",
  },
  {
    id: 3,
    title: "Vendor Contract Review",
    description: "Review renewal terms before the agreement expires.",
    category: "Contract",
    date: "2026-11-12",
    priority: "Medium",
    status: "Pending",
    source: "Vendor Contract.docx",
  },
  {
    id: 4,
    title: "Insurance Renewal Follow-up",
    description: "Follow up on the overdue insurance renewal.",
    category: "Insurance",
    date: "2026-10-28",
    priority: "High",
    status: "Overdue",
    source: "Insurance Policy.pdf",
  },
  {
    id: 5,
    title: "Software Subscription",
    description: "Check the annual software subscription.",
    category: "Payment",
    date: "2026-11-18",
    priority: "Low",
    status: "Pending",
    source: "Software Invoice.pdf",
  },
  {
    id: 6,
    title: "Employee Agreement Review",
    description: "Review employee agreement documentation.",
    category: "Contract",
    date: "2026-11-22",
    priority: "Medium",
    status: "Completed",
    source: "Employee Agreement.pdf",
  },
];

const statusStyles: Record<ReminderStatus, string> = {
  Pending: "bg-blue-500/10 text-blue-600",
  Completed: "bg-emerald-500/10 text-emerald-600",
  Overdue: "bg-red-500/10 text-red-600",
};

const priorityStyles: Record<ReminderPriority, string> = {
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

export default function RemindersPage() {
  const [reminders, setReminders] = useState(initialReminders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedReminder, setSelectedReminder] =
    useState<Reminder | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newDate, setNewDate] = useState("2026-11-10");
  const [newPriority, setNewPriority] =
    useState<ReminderPriority>("Medium");

  const filteredReminders = useMemo(() => {
    return reminders.filter((reminder) => {
      const matchesSearch = (
        reminder.title +
        " " +
        reminder.description +
        " " +
        reminder.source
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || reminder.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || reminder.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [reminders, search, statusFilter, categoryFilter]);

  const pendingCount = reminders.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = reminders.filter(
    (item) => item.status === "Completed"
  ).length;

  const overdueCount = reminders.filter(
    (item) => item.status === "Overdue"
  ).length;

  function addReminder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTitle.trim() || !newDate) return;

    const reminder: Reminder = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim() || "No description added.",
      category: newCategory,
      date: newDate,
      priority: newPriority,
      status: "Pending",
      source: "Manually created",
    };

    setReminders((current) => [reminder, ...current]);
    setShowForm(false);
    setNewTitle("");
    setNewDescription("");
    setNewCategory("General");
    setNewDate("2026-11-10");
    setNewPriority("Medium");
    setNotice("Reminder added to this temporary preview.");
  }

  function markCompleted(id: number) {
    setReminders((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Completed" } : item
      )
    );

    setSelectedReminder(null);
    setNotice("Reminder marked completed in this preview.");
  }

  function deleteReminder(id: number) {
    setReminders((current) => current.filter((item) => item.id !== id));
    setSelectedReminder(null);
    setNotice("Reminder removed from this preview.");
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Business Notifications
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Reminders
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Stay informed about payments, deadlines, renewals, and important
            business tasks.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Reminder
        </button>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <BellRing size={19} className="mt-0.5 shrink-0 text-blue-600" />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Preview mode:</strong>{" "}
          These are sample reminders. New reminders and status changes are
          stored only in the current page state. No actual email, SMS, or
          push notifications are sent.
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

      {/* Summary */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-[var(--foreground)]">
            Reminder Overview
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">
            Sample figures
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Reminders",
              value: reminders.length,
              icon: Bell,
              color: "bg-blue-500/10 text-blue-600",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: Clock3,
              color: "bg-amber-500/10 text-amber-600",
            },
            {
              label: "Completed",
              value: completedCount,
              icon: CheckCircle2,
              color: "bg-emerald-500/10 text-emerald-600",
            },
            {
              label: "Overdue",
              value: overdueCount,
              icon: AlertTriangle,
              color: "bg-red-500/10 text-red-600",
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
                    {item.label}
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
      </section>

      {/* Quick information */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
              <CalendarClock size={22} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Pending reminders
              </p>
              <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                {pendingCount}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Tasks that still need attention.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
              <BellRing size={22} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Reminder management
              </p>
              <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
                Stay organized
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Manage your important tasks from one workspace.
          </p>
        </div>
      </div>

      {/* Filters and list */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              All Reminders
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {filteredReminders.length} reminder(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Search size={17} className="text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reminders..."
                className="h-10 min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Filter size={16} className="text-[var(--muted-foreground)]" />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 bg-transparent text-sm text-[var(--foreground)] outline-none"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="All">All categories</option>
              <option value="Tax">Tax</option>
              <option value="Payment">Payment</option>
              <option value="Contract">Contract</option>
              <option value="Insurance">Insurance</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {filteredReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[var(--muted)]/40 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <Bell size={21} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {reminder.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {reminder.description}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    {reminder.category} · {formatDate(reminder.date)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                <span
                  className={`text-xs font-semibold ${priorityStyles[reminder.priority]}`}
                >
                  {reminder.priority} priority
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[reminder.status]}`}
                >
                  {reminder.status}
                </span>
                <button
                  onClick={() => setSelectedReminder(reminder)}
                  aria-label={`View ${reminder.title}`}
                  className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-blue-600"
                >
                  <Bell size={19} />
                </button>
              </div>
            </div>
          ))}

          {filteredReminders.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Bell
                size={32}
                className="mx-auto text-[var(--muted-foreground)]"
              />
              <p className="mt-3 font-semibold text-[var(--foreground)]">
                No reminders found
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Detail popup */}
      {selectedReminder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedReminder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reminder-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2
                  id="reminder-dialog-title"
                  className="font-bold text-[var(--foreground)]"
                >
                  Reminder Details
                </h2>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Preview record
                </p>
              </div>
              <button
                onClick={() => setSelectedReminder(null)}
                aria-label="Close details"
                className="rounded-lg p-2 hover:bg-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Reminder title
                </p>
                <p className="mt-1 font-semibold text-[var(--foreground)]">
                  {selectedReminder.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Description
                </p>
                <p className="mt-1 text-sm text-[var(--foreground)]">
                  {selectedReminder.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Date
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {formatDate(selectedReminder.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Category
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedReminder.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Priority
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${priorityStyles[selectedReminder.priority]}`}
                  >
                    {selectedReminder.priority}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Status
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedReminder.status}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Source
                </p>
                <p className="mt-1 break-all text-sm text-[var(--foreground)]">
                  {selectedReminder.source}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {selectedReminder.status !== "Completed" && (
                <button
                  onClick={() => markCompleted(selectedReminder.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Check size={17} />
                  Mark Completed
                </button>
              )}

              <button
                onClick={() => deleteReminder(selectedReminder.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/10"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create reminder modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowForm(false)}
        >
          <form
            onSubmit={addReminder}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[var(--foreground)]">
                  Create Reminder
                </h2>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Add a new business reminder.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="rounded-lg p-2 hover:bg-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Reminder title
              </label>
              <input
                required
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="e.g. GST payment follow-up"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 text-sm text-[var(--foreground)] outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Description
              </label>
              <textarea
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                placeholder="Add reminder details..."
                rows={3}
                className="w-full rounded-xl border border-[var(--border)] bg-transparent p-3 text-sm text-[var(--foreground)] outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  Due date
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(event) => setNewDate(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
                >
                  <option>General</option>
                  <option>Tax</option>
                  <option>Payment</option>
                  <option>Contract</option>
                  <option>Insurance</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Priority
              </label>
              <select
                value={newPriority}
                onChange={(event) =>
                  setNewPriority(event.target.value as ReminderPriority)
                }
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

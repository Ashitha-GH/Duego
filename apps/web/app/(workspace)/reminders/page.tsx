
"use client";

import { useMemo, useState, type FormEvent } from "react";
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
  Trash2,
  Check,
  BellRing,
  CalendarClock,
  RotateCcw,
  Flag,
  Info,
  ArrowRight,
  Lock,
  Crown,
  Sparkles,
} from "lucide-react";

import {
  hasFeatureAccess,
  PLAN_DETAILS,
  type PlanType,
} from "@/lib/subscription/feature-config";

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
  Pending:
    "bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]",
  Completed:
    "bg-[#DCFCE7] text-[#166534] dark:bg-[#14532D] dark:text-[#BBF7D0]",
  Overdue:
    "bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#7F1D1D] dark:text-[#FECACA]",
};

const priorityStyles: Record<ReminderPriority, string> = {
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
  "General",
];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function PlanBadge({ plan }: { plan: PlanType }) {
  const details = PLAN_DETAILS[plan];

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
      style={{
        backgroundColor: `${details.color}20`,
        color: details.color,
      }}
    >
      {plan === "business" ? (
        <Crown size={15} />
      ) : plan === "pro" ? (
        <Sparkles size={15} />
      ) : (
        <CheckCircle2 size={15} />
      )}
      {details.name} Plan
    </span>
  );
}

function PremiumFeatureCard({
  title,
  description,
  plan,
  featureId,
  currentPlan,
}: {
  title: string;
  description: string;
  plan: "pro" | "business";
  featureId: string;
  currentPlan: PlanType;
}) {
  const hasAccess = hasFeatureAccess(currentPlan, featureId);
  const details = PLAN_DETAILS[plan];
  const isBusiness = plan === "business";

  return (
    <div
      className={`rounded-2xl border p-5 ${
        isBusiness
          ? "border-[#D6A84B] bg-[#FFFBEB] dark:border-[#8A6A2E] dark:bg-[#142B4A]"
          : "border-[#93C5FD] bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl p-3 ${
              isBusiness
                ? "bg-[#FEF3C7] text-[#A16207]"
                : "bg-[#DBEAFE] text-[#2563EB]"
            }`}
          >
            {isBusiness ? <Crown size={22} /> : <BellRing size={22} />}
          </div>

          <div>
            <h3 className="font-bold text-[#142B4A] dark:text-white">
              {title}
            </h3>
            <p
              className="mt-1 text-xs font-bold"
              style={{ color: details.color }}
            >
              {details.name.toUpperCase()} FEATURE
            </p>
          </div>
        </div>

        {hasAccess ? (
          <CheckCircle2 className="shrink-0 text-[#15803D]" size={22} />
        ) : (
          <Lock
            className="shrink-0"
            size={20}
            style={{ color: details.color }}
          />
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
        {description}
      </p>

      {hasAccess ? (
        <p className="mt-4 text-sm font-bold text-[#15803D]">
          Your {details.name} access is active.
        </p>
      ) : (
        <a
          href="/subscription"
          className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
            isBusiness
              ? "bg-[#D6A84B] !text-[#142B4A] hover:bg-[#C49736]"
              : "bg-[#2563EB] !text-white hover:bg-[#1D4ED8]"
          }`}
        >
          <Lock size={15} />
          Upgrade to {details.name}
          <ArrowRight size={16} />
        </a>
      )}
    </div>
  );
}

export default function RemindersPage() {
  const [reminders, setReminders] =
    useState<Reminder[]>(initialReminders);

  // Demo plan. Backend subscription data will replace this later.
  const currentPlan: PlanType = "free";
  const currentPlanDetails = PLAN_DETAILS[currentPlan];

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
      const searchText =
        `${reminder.title} ${reminder.description} ${reminder.source} ${reminder.category}`.toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "All" ||
        reminder.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        reminder.category === categoryFilter;

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

  const highPriorityCount = reminders.filter(
    (item) =>
      item.priority === "High" && item.status !== "Completed"
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  }

  function addReminder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTitle.trim() || !newDate) return;

    const reminder: Reminder = {
      id: Date.now(),
      title: newTitle.trim(),
      description:
        newDescription.trim() || "No description added.",
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

    resetFilters();

    setNotice(
      "Reminder added successfully to this temporary preview."
    );
  }

  function markCompleted(id: number) {
    setReminders((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Completed" }
          : item
      )
    );

    setSelectedReminder(null);

    setNotice(
      "Reminder marked as completed in preview mode. This change has not been saved to the backend."
    );
  }

  function deleteReminder(id: number) {
    setReminders((current) =>
      current.filter((item) => item.id !== id)
    );

    setSelectedReminder(null);

    setNotice(
      "Reminder removed from this temporary preview."
    );
  }

  return (
    <div className="space-y-7 pb-10">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#93C5FD]">
              <BellRing size={17} />
              BUSINESS NOTIFICATIONS
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Reminders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Stay informed about payments, deadlines, renewals and
              important business tasks from one workspace.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] shadow-lg">
            <Bell size={32} className="text-white" />
          </div>
        </div>
      </section>

      {/* PREVIEW NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <Info size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />

        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> These are sample reminders.
          New reminders and status changes are stored only in the
          current page state. No actual email, SMS or push notifications
          are sent.
        </p>
      </div>

      {/* MEMBERSHIP OVERVIEW */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              Your Duego Membership
            </h2>
            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Your plan determines which reminder tools you can access.
            </p>
          </div>

          <PlanBadge plan={currentPlan} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <PremiumFeatureCard
            title="Advanced Reminders"
            description="Unlock advanced reminder management and tools for keeping track of important business tasks."
            plan="pro"
            featureId="advanced-reminders"
            currentPlan={currentPlan}
          />

          <PremiumFeatureCard
            title="Business Insights"
            description="Unlock business-level insights to help monitor important business activities and follow-ups."
            plan="business"
            featureId="business-insights"
            currentPlan={currentPlan}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#D7E6F8] bg-white p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div>
            <p className="text-sm font-bold text-[#142B4A] dark:text-white">
              Current membership: {currentPlanDetails.name}
            </p>
            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Plan price: ₹{currentPlanDetails.price} / month
            </p>
          </div>

          <a
            href="/subscription"
            className="inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-4 py-2.5 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
          >
            View Plans
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* NOTICE */}
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
        >
          <p className="leading-6">{notice}</p>

          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="shrink-0 rounded-lg p-1 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#142B4A]"
          >
            <X size={17} />
          </button>
        </motion.div>
      )}

      {/* REMINDER OVERVIEW */}
      <section>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              Reminder Overview
            </h2>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Monitor your business tasks and notifications.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#DBEAFE] px-3 py-1.5 text-xs font-bold text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]">
            {reminders.length} Total Records
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Reminders",
              value: reminders.length,
              description: "All reminder records",
              icon: Bell,
              color: "bg-[#DBEAFE] text-[#2563EB]",
            },
            {
              label: "Pending",
              value: pendingCount,
              description: "Tasks needing attention",
              icon: Clock3,
              color: "bg-[#FEF3C7] text-[#A16207]",
            },
            {
              label: "Completed",
              value: completedCount,
              description: "Tasks marked complete",
              icon: CheckCircle2,
              color: "bg-[#DCFCE7] text-[#166534]",
            },
            {
              label: "Overdue",
              value: overdueCount,
              description: "Require follow-up",
              icon: AlertTriangle,
              color: "bg-[#FEE2E2] text-[#B91C1C]",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#58708F] dark:text-[#A9BEDA]">
                    {item.label}
                  </span>

                  <span className={`rounded-xl p-2.5 ${item.color}`}>
                    <Icon size={20} />
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-[#142B4A] dark:text-white">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* QUICK INFORMATION */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
              <CalendarClock size={23} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#58708F] dark:text-[#A9BEDA]">
                Pending Reminders
              </p>

              <p className="mt-1 text-2xl font-bold text-[#142B4A] dark:text-white">
                {pendingCount}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
            These reminders still need attention or follow-up.
          </p>
        </div>

        <div className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#FEF3C7] p-3 text-[#A16207]">
              <Flag size={23} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#58708F] dark:text-[#A9BEDA]">
                High Priority
              </p>

              <p className="mt-1 text-2xl font-bold text-[#142B4A] dark:text-white">
                {highPriorityCount}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
            Important reminders that have not yet been completed.
          </p>
        </div>
      </section>

      {/* ALL REMINDERS */}
      <section className="overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]">
        <div className="flex flex-col justify-between gap-4 border-b border-[#D7E6F8] p-5 dark:border-[#263D60] lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              All Reminders
            </h2>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              {filteredReminders.length} reminder(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/* SEARCH */}
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#203D65]">
              <Search size={17} className="shrink-0 text-[#2563EB]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reminders..."
                className="h-10 min-w-0 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            {/* STATUS FILTER */}
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#203D65]">
              <Filter size={16} className="shrink-0 text-[#2563EB]" />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 min-w-0 bg-transparent text-sm text-[#142B4A] outline-none dark:text-white"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            {/* CATEGORY FILTER */}
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-10 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm text-[#142B4A] outline-none dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All categories" : category}
                </option>
              ))}
            </select>

            {/* RESET */}
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-3 text-sm font-semibold text-[#142B4A] transition hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* REMINDER RECORDS */}
        <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
          {filteredReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#EFF6FF] dark:hover:bg-[#203D65] sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#203D65]">
                  <Bell size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    {reminder.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    {reminder.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    <span>{reminder.category}</span>
                    <span>·</span>
                    <CalendarDays size={13} />
                    <span>{formatDate(reminder.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <span
                  className={`text-xs font-bold ${priorityStyles[reminder.priority]}`}
                >
                  {reminder.priority} priority
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusStyles[reminder.status]}`}
                >
                  {reminder.status}
                </span>

                <button
                  onClick={() => setSelectedReminder(reminder)}
                  aria-label={`View ${reminder.title}`}
                  className="rounded-lg bg-[#DBEAFE] p-2 text-[#142B4A] transition hover:bg-[#BFDBFE] dark:bg-[#203D65] dark:text-white dark:hover:bg-[#2563EB]"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}

          {filteredReminders.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Bell size={34} className="mx-auto text-[#2563EB]" />

              <p className="mt-3 font-bold text-[#142B4A] dark:text-white">
                No reminders found
              </p>

              <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                Try changing your search or filters.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 rounded-xl bg-[#142B4A] px-4 py-2.5 text-sm font-bold !text-white hover:bg-[#2563EB]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CREATE REMINDER BUTTON */}
      <button
        onClick={() => {
          setNotice("");
          setShowForm(true);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#93C5FD] bg-[#EFF6FF] p-5 text-sm font-bold text-[#142B4A] transition hover:border-[#2563EB] hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
      >
        <Plus size={19} className="text-[#2563EB]" />
        Create New Reminder
      </button>

      {/* REMINDER DETAILS MODAL */}
      {selectedReminder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedReminder(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reminder-dialog-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between bg-[#142B4A] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#2563EB] p-3">
                  <BellRing size={23} />
                </div>

                <div>
                  <h2 id="reminder-dialog-title" className="font-bold">
                    Reminder Details
                  </h2>

                  <p className="mt-1 text-xs text-[#DBEAFE]">
                    Business notification record
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReminder(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-white transition hover:bg-[#2563EB]"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                  Reminder title
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#142B4A] dark:text-white">
                  {selectedReminder.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  {selectedReminder.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <CalendarDays size={19} className="text-[#2563EB]" />

                  <p className="mt-3 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Reminder Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#142B4A] dark:text-white">
                    {formatDate(selectedReminder.date)}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <Flag size={19} className="text-[#2563EB]" />

                  <p className="mt-3 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Priority
                  </p>

                  <p
                    className={`mt-1 text-sm font-bold ${priorityStyles[selectedReminder.priority]}`}
                  >
                    {selectedReminder.priority}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <Filter size={19} className="text-[#2563EB]" />

                  <p className="mt-3 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#142B4A] dark:text-white">
                    {selectedReminder.category}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                  <CheckCircle2 size={19} className="text-[#2563EB]" />

                  <p className="mt-3 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[selectedReminder.status]}`}
                  >
                    {selectedReminder.status}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#D7E6F8] p-4 dark:border-[#263D60]">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#2563EB]" />

                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Source Document
                  </p>
                </div>

                <p className="mt-2 break-all text-sm text-[#58708F] dark:text-[#A9BEDA]">
                  {selectedReminder.source}
                </p>
              </div>

              <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-3 dark:border-[#263D60] dark:bg-[#203D65]">
                <p className="text-xs leading-5 text-[#142B4A] dark:text-[#DBEAFE]">
                  Preview record: actions on this reminder are temporary
                  and are not saved to the backend.
                </p>
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="flex flex-wrap gap-3 border-t border-[#D7E6F8] p-5 dark:border-[#263D60]">
              {selectedReminder.status !== "Completed" && (
                <button
                  onClick={() => markCompleted(selectedReminder.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
                >
                  <Check size={17} />
                  Mark Completed
                </button>
              )}

              <button
                onClick={() => deleteReminder(selectedReminder.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-bold text-[#B91C1C] transition hover:bg-[#FEE2E2] dark:border-[#7F1D1D] dark:bg-[#7F1D1D] dark:text-[#FECACA]"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* CREATE REMINDER MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/75 p-4 backdrop-blur-sm"
          onClick={() => setShowForm(false)}
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onSubmit={addReminder}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
          >
            {/* FORM HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                  <BellRing size={23} />
                </div>

                <div>
                  <h2 className="font-bold text-[#142B4A] dark:text-white">
                    Create Reminder
                  </h2>

                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Add an important business task.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
              >
                <X size={19} />
              </button>
            </div>

            {/* TITLE */}
            <div className="space-y-2">
              <label
                htmlFor="reminder-title"
                className="text-sm font-bold text-[#142B4A] dark:text-white"
              >
                Reminder Title *
              </label>

              <input
                id="reminder-title"
                required
                maxLength={100}
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="e.g. GST payment follow-up"
                className="h-11 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label
                htmlFor="reminder-description"
                className="text-sm font-bold text-[#142B4A] dark:text-white"
              >
                Description
              </label>

              <textarea
                id="reminder-description"
                maxLength={500}
                value={newDescription}
                onChange={(event) =>
                  setNewDescription(event.target.value)
                }
                placeholder="Add reminder details..."
                rows={3}
                className="w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-3 text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            {/* DATE AND CATEGORY */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="reminder-date"
                  className="text-sm font-bold text-[#142B4A] dark:text-white"
                >
                  Due Date *
                </label>

                <input
                  id="reminder-date"
                  type="date"
                  required
                  value={newDate}
                  onChange={(event) => setNewDate(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm text-[#142B4A] outline-none focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="reminder-category"
                  className="text-sm font-bold text-[#142B4A] dark:text-white"
                >
                  Category
                </label>

                <select
                  id="reminder-category"
                  value={newCategory}
                  onChange={(event) =>
                    setNewCategory(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm text-[#142B4A] outline-none focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
                >
                  <option value="General">General</option>
                  <option value="Tax">Tax</option>
                  <option value="Payment">Payment</option>
                  <option value="Contract">Contract</option>
                  <option value="Insurance">Insurance</option>
                </select>
              </div>
            </div>

            {/* PRIORITY */}
            <div className="space-y-2">
              <label
                htmlFor="reminder-priority"
                className="text-sm font-bold text-[#142B4A] dark:text-white"
              >
                Priority
              </label>

              <select
                id="reminder-priority"
                value={newPriority}
                onChange={(event) =>
                  setNewPriority(
                    event.target.value as ReminderPriority
                  )
                }
                className="h-11 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm text-[#142B4A] outline-none focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            {/* PREVIEW MESSAGE */}
            <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-3 dark:border-[#263D60] dark:bg-[#203D65]">
              <p className="text-xs leading-5 text-[#142B4A] dark:text-[#DBEAFE]">
                This reminder will be added to the current preview only.
                Notification delivery and permanent storage require
                backend integration.
              </p>
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-4 py-3 text-sm font-bold text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
              >
                <Plus size={17} />
                Create Reminder
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}

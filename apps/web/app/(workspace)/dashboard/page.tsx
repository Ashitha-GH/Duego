
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Files,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  Upload,
  Wallet,
  AlertTriangle,
  CircleDollarSign,
  Activity,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Documents",
    value: "128",
    change: "+12 this month",
    positive: true,
    icon: Files,
    color: "blue",
    href: "/documents",
  },
  {
    title: "AI Analysed",
    value: "96",
    change: "75% analysed",
    positive: true,
    icon: BrainCircuit,
    color: "indigo",
    href: "/analysis",
  },
  {
    title: "Pending Payments",
    value: "₹48,500",
    change: "5 pending records",
    positive: false,
    icon: Wallet,
    color: "gold",
    href: "/payments",
  },
  {
    title: "Upcoming Deadlines",
    value: "08",
    change: "Next 30 days",
    positive: false,
    icon: CalendarDays,
    color: "sky",
    href: "/deadlines",
  },
];

const chartData = {
  "7D": [
    { day: "Mon", documents: 8, analyses: 5 },
    { day: "Tue", documents: 12, analyses: 9 },
    { day: "Wed", documents: 7, analyses: 6 },
    { day: "Thu", documents: 15, analyses: 11 },
    { day: "Fri", documents: 10, analyses: 8 },
    { day: "Sat", documents: 6, analyses: 4 },
    { day: "Sun", documents: 13, analyses: 10 },
  ],
  "30D": [
    { day: "Week 1", documents: 18, analyses: 13 },
    { day: "Week 2", documents: 25, analyses: 19 },
    { day: "Week 3", documents: 20, analyses: 16 },
    { day: "Week 4", documents: 32, analyses: 24 },
  ],
  "90D": [
    { day: "Aug", documents: 38, analyses: 28 },
    { day: "Sep", documents: 52, analyses: 39 },
    { day: "Oct", documents: 64, analyses: 48 },
  ],
};

const activities = [
  {
    name: "Service Agreement.pdf",
    detail: "AI analysis completed",
    time: "10 minutes ago",
    status: "Analysed",
    icon: BrainCircuit,
    color: "indigo",
  },
  {
    name: "GST Invoice October.pdf",
    detail: "Document uploaded",
    time: "Yesterday",
    status: "Processing",
    icon: FileText,
    color: "blue",
  },
  {
    name: "Vendor Contract.docx",
    detail: "Deadline extracted",
    time: "2 days ago",
    status: "Completed",
    icon: CheckCircle2,
    color: "sky",
  },
];

const deadlines = [
  {
    title: "GST Payment",
    date: "05 Nov 2026",
    category: "Tax",
    status: "Urgent",
  },
  {
    title: "Vendor Contract Renewal",
    date: "12 Nov 2026",
    category: "Contract",
    status: "Upcoming",
  },
  {
    title: "Insurance Renewal",
    date: "18 Nov 2026",
    category: "Insurance",
    status: "Upcoming",
  },
];

const payments = [
  { name: "GST Payment", amount: "₹25,000", status: "Pending" },
  { name: "Office Rent", amount: "₹18,000", status: "Pending" },
  { name: "Software Subscription", amount: "₹5,500", status: "Paid" },
];

const quickActions = [
  {
    label: "Upload Document",
    description: "Add a business document",
    href: "/documents",
    icon: Upload,
  },
  {
    label: "AI Analysis",
    description: "Explore document intelligence",
    href: "/analysis",
    icon: BrainCircuit,
  },
  {
    label: "View Obligations",
    description: "Manage business obligations",
    href: "/obligations",
    icon: FileText,
  },
  {
    label: "Check Reminders",
    description: "Review scheduled reminders",
    href: "/reminders",
    icon: Bell,
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  indigo: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  gold: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  sky: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("30D");
  const [search, setSearch] = useState("");

  const selectedChart = chartData[period];

  const visibleActivities = useMemo(
    () =>
      activities.filter((activity) =>
        `${activity.name} ${activity.detail}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-12">

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
            <Sparkles size={16} />
            Business Intelligence Workspace
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Welcome back! Here&apos;s an overview of your business activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-[var(--card)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Upload size={17} className="text-blue-600 dark:text-blue-400" />
            Upload Document
          </Link>

          
<Link
  href="/analysis"
  className="inline-flex items-center gap-2 rounded-xl border border-[#142B4A] bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white shadow-md transition-all duration-200 hover:border-[#2563EB] hover:bg-[#2563EB] hover:shadow-lg"
>
  <Sparkles size={17} className="text-white" />
  <span className="text-white">AI Workspace</span>
  <ArrowUpRight size={17} className="text-white" />
</Link>

        </div>
      </motion.section>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/80 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
        <AlertTriangle size={19} className="mt-0.5 shrink-0 text-blue-700 dark:text-blue-400" />
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Dashboard preview
          </p>
          <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
            All figures, charts and activities are illustrative sample data.
            Live business information will appear after backend integration.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">
              Business Overview
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Your business at a glance
            </p>
          </div>
          <span className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300">
            Sample metrics
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={stat.href}
                  className="group block h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {stat.title}
                    </span>
                    <span className={`rounded-xl p-3 ${colorClasses[stat.color]}`}>
                      <Icon size={20} />
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between">
                    <p className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
                      {stat.value}
                    </p>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-400 transition group-hover:text-blue-600"
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                    {stat.positive ? (
                      <TrendingUp size={14} className="text-emerald-600" />
                    ) : (
                      <ArrowDownRight size={14} className="text-amber-600" />
                    )}
                    {stat.change}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Analytics and AI */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Analytics chart */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6 xl:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Document Analytics
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Document uploads and AI analysis activity
              </p>
            </div>

            <div className="flex rounded-xl border border-blue-200 bg-blue-50 p-1 dark:border-slate-700 dark:bg-slate-800">
              {(["7D", "30D", "90D"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                    period === item
                      ? "bg-[#142B4A] text-white shadow-md dark:bg-blue-600"
                      : "text-slate-600 hover:bg-blue-100 hover:text-[#142B4A] dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-xs">
            <span className="flex items-center gap-2 text-[var(--muted-foreground)]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#2563EB]" />
              Documents
            </span>
            <span className="flex items-center gap-2 text-[var(--muted-foreground)]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#818CF8]" />
              AI Analyses
            </span>
          </div>

          <div className="mt-7 flex h-56 items-end justify-around gap-3 border-b border-blue-100 px-1 dark:border-slate-700">
            {selectedChart.map((item) => {
              const maxValue = Math.max(
                ...selectedChart.map((entry) => entry.documents)
              );

              return (
                <div
                  key={item.day}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div
                      title={`${item.documents} documents`}
                      className="w-full max-w-7 rounded-t-md bg-[#2563EB] transition-all duration-500"
                      style={{
                        height: `${(item.documents / maxValue) * 100}%`,
                      }}
                    />
                    <div
                      title={`${item.analyses} analyses`}
                      className="w-full max-w-7 rounded-t-md bg-[#818CF8] transition-all duration-500"
                      style={{
                        height: `${(item.analyses / maxValue) * 100}%`,
                      }}
                    />
                  </div>

                  <span className="pb-2 text-[10px] text-[var(--muted-foreground)] sm:text-xs">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-[10px] text-[var(--muted-foreground)]">
            Illustrative activity data · {period} view
          </p>
        </section>

        {/* AI Assistant */}
        <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#142B4A] via-[#1E3A5F] to-[#3730A3] p-6 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit size={22} />
                <span className="text-sm font-semibold">Duego AI</span>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px]">
                Preview
              </span>
            </div>

            <h2 className="mt-8 text-2xl font-bold leading-tight">
              Smarter business decisions start here.
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100">
              Organize your documents, discover obligations and identify
              important business information using AI.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Extract important document details",
                "Identify upcoming deadlines",
                "Discover payment obligations",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-blue-100">
                  <CheckCircle2 size={17} className="shrink-0 text-sky-300" />
                  {feature}
                </div>
              ))}
            </div>

            <Link
              href="/analysis"
              className="relative z-20 mt-8 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold !text-[#142B4A] shadow-md transition hover:bg-blue-50 hover:shadow-lg"
            >
              <BrainCircuit size={18} />
              <span>Open AI Workspace</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </div>

      {/* Deadlines and payments */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Deadlines */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Upcoming Deadlines
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Important business dates
              </p>
            </div>
            <Link
              href="/deadlines"
              className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-400"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div
                key={deadline.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4 transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                    <CalendarClock size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {deadline.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {deadline.date} · {deadline.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    deadline.status === "Urgent"
                      ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                  }`}
                >
                  {deadline.status}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/deadlines"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 py-3 text-sm font-semibold text-[#142B4A] transition hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-200 dark:hover:bg-slate-700"
          >
            Open Deadline Calendar <ArrowUpRight size={16} />
          </Link>
        </section>

        {/* Financial overview */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Financial Overview
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Sample payment records
              </p>
            </div>
            <Link
              href="/payments"
              className="rounded-lg p-2 text-blue-700 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-800"
              aria-label="View payments"
            >
              <TrendingUp size={20} />
            </Link>
          </div>

          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 p-4 dark:border-slate-700 dark:from-[#172D49] dark:via-[#1E3154] dark:to-slate-900">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Total pending payments
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] dark:text-white">
              ₹48,500
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-300">
              <Clock3 size={14} /> 5 pending payment records
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.name}
                className="flex items-center justify-between gap-3 border-b border-blue-100 pb-3 last:border-0 last:pb-0 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                    <CircleDollarSign size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {payment.name}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {payment.status}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold text-[var(--foreground)]">
                  {payment.amount}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/payments"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 py-3 text-sm font-semibold text-[#142B4A] transition hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-200 dark:hover:bg-slate-700"
          >
            View All Payments <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>

      {/* Recent activity */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Recent Activity
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Recent document and workspace updates
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/50 px-3 dark:border-slate-700 dark:bg-slate-800/60">
              <Search size={16} className="text-blue-700 dark:text-blue-300" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search activity..."
                className="h-10 w-full min-w-0 bg-transparent text-xs text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] sm:w-48"
              />
            </div>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="flex items-center gap-2 rounded-xl border border-blue-200 px-3 py-2.5 text-xs font-medium text-[#142B4A] transition hover:bg-blue-50 dark:border-slate-700 dark:text-blue-200 dark:hover:bg-slate-800"
            >
              <Filter size={15} /> Clear
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {visibleActivities.length > 0 ? (
            visibleActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.name}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/30 p-4 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-3 ${colorClasses[activity.color]}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {activity.name}
                      </p>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                        {activity.detail} · {activity.time}
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-[#142B4A] dark:border-slate-700 dark:bg-slate-900 dark:text-blue-200">
                    {activity.status}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/40 p-8 text-center dark:border-slate-700 dark:bg-slate-800/30">
              <Search size={22} className="mx-auto text-blue-600 dark:text-blue-400" />
              <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
                No matching activity
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Try a different search term.
              </p>
            </div>
          )}
        </div>

        <Link
          href="/documents"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Document Workspace <ChevronRight size={16} />
        </Link>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="font-bold text-[var(--foreground)]">
            Quick Actions
          </h2>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Access your important workspace features
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <Link
                  href={action.href}
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-[var(--card)] p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/60 hover:shadow-md dark:border-slate-700 dark:hover:border-blue-800 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 p-3 text-[#1D4ED8] dark:bg-blue-950/60 dark:text-blue-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {action.label}
                      </p>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-slate-400 transition group-hover:text-blue-600"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <div className="flex flex-col justify-between gap-2 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted-foreground)] sm:flex-row">
        <p>Duego Business Intelligence Workspace</p>
        <p>Dashboard data is currently for demonstration purposes.</p>
      </div>
    </div>
  );
}

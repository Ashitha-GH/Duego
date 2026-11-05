
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Bell,
  BrainCircuit,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Crown,
  Files,
  Filter,
  LockKeyhole,
  Search,
  Sparkles,
  TrendingUp,
  Upload,
  Wallet,
  AlertTriangle,
  FileText,
} from "lucide-react";

import { PlanBadge } from "@/components/subscription/plan-badge";
import { FeatureGate } from "@/components/subscription/feature-gate";
import type { PlanType } from "@/lib/subscription/feature-config";

// --------------------------------------------------
// DASHBOARD SAMPLE DATA
// --------------------------------------------------

const stats = [
  {
    title: "Total Documents",
    value: "128",
    change: "+12 this month",
    positive: true,
    icon: Files,
    href: "/documents",
  },
  {
    title: "AI Analysed",
    value: "96",
    change: "75% analysed",
    positive: true,
    icon: BrainCircuit,
    href: "/analysis",
  },
  {
    title: "Pending Payments",
    value: "₹48,500",
    change: "5 pending records",
    positive: false,
    icon: Wallet,
    href: "/payments",
  },
  {
    title: "Upcoming Deadlines",
    value: "08",
    change: "Next 30 days",
    positive: false,
    icon: CalendarDays,
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
    color: "blue",
  },
  {
    name: "GST Invoice October.pdf",
    detail: "Document uploaded",
    time: "Yesterday",
    status: "Processing",
    icon: FileText,
    color: "indigo",
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
  blue: "bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]",
  indigo: "bg-[#E0E7FF] text-[#4338CA] dark:bg-[#292C60] dark:text-[#A5B4FC]",
  sky: "bg-[#E0F2FE] text-[#0369A1] dark:bg-[#173C5B] dark:text-[#7DD3FC]",
};

// --------------------------------------------------
// DASHBOARD PAGE
// --------------------------------------------------

export default function DashboardPage() {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("30D");
  const [search, setSearch] = useState("");

  // Demo subscription value.
  // Your friend can connect the actual backend plan later.
  const currentPlan: PlanType = "free";

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

      {/* ------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------ */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
            <Sparkles size={16} />
            Business Intelligence Workspace
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] dark:text-white sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Welcome back! Here&apos;s an overview of your business activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-semibold text-[#142B4A] transition hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
          >
            <Upload size={17} className="text-[#2563EB]" />
            Upload Document
          </Link>

          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 rounded-xl border border-[#142B4A] bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white shadow-md transition hover:border-[#2563EB] hover:bg-[#2563EB]"
          >
            <Sparkles size={17} className="text-white" />
            <span className="text-white">AI Workspace</span>
            <ArrowUpRight size={17} className="text-white" />
          </Link>
        </div>
      </motion.section>

      {/* ------------------------------------------ */}
      {/* PREVIEW NOTICE */}
      {/* ------------------------------------------ */}

      <div className="flex items-start gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <AlertTriangle
          size={19}
          className="mt-0.5 shrink-0 text-[#2563EB]"
        />

        <div>
          <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
            Dashboard preview
          </p>

          <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
            All figures, charts and activities are illustrative sample data.
            Live business information will appear after backend integration.
          </p>
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* DUEGO 3.0 SUBSCRIPTION OVERVIEW */}
      {/* ------------------------------------------ */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-[#93C5FD] bg-gradient-to-r from-[#EFF6FF] via-white to-[#DBEAFE] p-5 shadow-sm dark:border-[#263D60] dark:from-[#142B4A] dark:via-[#102440] dark:to-[#1E3A5F] sm:p-6"
      >
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles size={18} className="text-[#2563EB]" />

              <p className="text-sm font-bold tracking-wide text-[#2563EB]">
                DUEGO 3.0 MEMBERSHIP
              </p>

              <PlanBadge plan={currentPlan} />
            </div>

            <h2 className="mt-3 text-2xl font-bold text-[#142B4A] dark:text-white">
              Your Free Workspace
            </h2>

            <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
              Start with essential tools and upgrade when your business needs more.
            </p>

            <p className="mt-3 text-sm font-semibold text-[#142B4A] dark:text-white">
              Current plan: Free · ₹0
            </p>
          </div>

          <Link
            href="/subscription"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white shadow-md transition hover:bg-[#2563EB]"
          >
            <Crown size={17} />
            Explore Plans
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </motion.section>

      {/* ------------------------------------------ */}
      {/* BUSINESS STATISTICS */}
      {/* ------------------------------------------ */}

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              Business Overview
            </h2>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Your business at a glance
            </p>
          </div>

          <span className="rounded-lg border border-[#D7E6F8] bg-[#EFF6FF] px-3 py-1.5 text-xs font-medium text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-[#DBEAFE]">
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
                  className="group block h-full rounded-2xl border border-[#D7E6F8] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#93C5FD] hover:shadow-lg dark:border-[#263D60] dark:bg-[#142B4A] dark:hover:border-[#2563EB]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#58708F] dark:text-[#A9BEDA]">
                      {stat.title}
                    </span>

                    <span className="rounded-xl bg-[#EFF6FF] p-3 text-[#2563EB] dark:bg-[#203D65] dark:text-[#93C5FD]">
                      <Icon size={20} />
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between">
                    <p className="text-3xl font-bold tracking-tight text-[#142B4A] dark:text-white">
                      {stat.value}
                    </p>

                    <ArrowUpRight
                      size={18}
                      className="text-[#58708F] transition group-hover:text-[#2563EB] dark:text-[#A9BEDA]"
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {stat.positive ? (
                      <TrendingUp size={14} className="text-[#16A34A]" />
                    ) : (
                      <ArrowDownRight size={14} className="text-[#D6A84B]" />
                    )}

                    {stat.change}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------ */}
      {/* DOCUMENT ANALYTICS AND AI */}
      {/* ------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* ANALYTICS CHART */}

        <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 shadow-sm dark:border-[#263D60] dark:bg-[#142B4A] sm:p-6 xl:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[#142B4A] dark:text-white">
                Document Analytics
              </h2>

              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Document uploads and AI analysis activity
              </p>
            </div>

            <div className="flex rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-1 dark:border-[#263D60] dark:bg-[#102440]">
              {(["7D", "30D", "90D"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                    period === item
                      ? "bg-[#142B4A] !text-white shadow-md dark:bg-[#2563EB]"
                      : "text-[#58708F] hover:bg-[#DBEAFE] hover:text-[#142B4A] dark:text-[#A9BEDA] dark:hover:bg-[#203D65] dark:hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-xs">
            <span className="flex items-center gap-2 text-[#58708F] dark:text-[#A9BEDA]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#2563EB]" />
              Documents
            </span>

            <span className="flex items-center gap-2 text-[#58708F] dark:text-[#A9BEDA]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#818CF8]" />
              AI Analyses
            </span>
          </div>

          <div className="mt-7 flex h-56 items-end justify-around gap-3 border-b border-[#D7E6F8] px-1 dark:border-[#263D60]">
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

                  <span className="pb-2 text-[10px] text-[#58708F] dark:text-[#A9BEDA] sm:text-xs">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-[10px] text-[#58708F] dark:text-[#A9BEDA]">
            Illustrative activity data · {period} view
          </p>
        </section>

        {/* AI ASSISTANT */}

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

            <p className="mt-3 text-sm leading-6 text-[#DBEAFE]">
              Organize your documents, discover obligations and identify
              important business information using AI.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Extract important document details",
                "Identify upcoming deadlines",
                "Discover payment obligations",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-[#DBEAFE]"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-[#93C5FD]"
                  />
                  {feature}
                </div>
              ))}
            </div>

            <Link
              href="/analysis"
              className="relative z-20 mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold !text-[#142B4A] shadow-md transition hover:bg-[#EFF6FF] hover:shadow-lg"
            >
              <BrainCircuit size={18} />
              Open AI Workspace
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </div>

      {/* ------------------------------------------ */}
      {/* UPCOMING DEADLINES AND FINANCIAL OVERVIEW */}
      {/* ------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* DEADLINES */}

        <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 shadow-sm dark:border-[#263D60] dark:bg-[#142B4A] sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#142B4A] dark:text-white">
                Upcoming Deadlines
              </h2>

              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Important business dates
              </p>
            </div>

            <Link
              href="/deadlines"
              className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#142B4A] dark:hover:text-white"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div
                key={deadline.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF]/60 p-4 transition hover:border-[#93C5FD] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#102440] dark:hover:bg-[#203D65]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#FFFBEB] p-3 text-[#946200] dark:bg-[#47391D] dark:text-[#F2D28A]">
                    <CalendarClock size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                      {deadline.title}
                    </p>

                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      {deadline.date} · {deadline.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    deadline.status === "Urgent"
                      ? "bg-[#FEF2F2] text-[#B91C1C] dark:bg-[#541F2A] dark:text-[#FCA5A5]"
                      : "bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]"
                  }`}
                >
                  {deadline.status}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/deadlines"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] py-3 text-sm font-semibold text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#102440] dark:text-white dark:hover:bg-[#203D65]"
          >
            Open Deadline Calendar
            <ArrowUpRight size={16} />
          </Link>
        </section>

        {/* FINANCIAL OVERVIEW */}

        <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 shadow-sm dark:border-[#263D60] dark:bg-[#142B4A] sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#142B4A] dark:text-white">
                Financial Overview
              </h2>

              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Sample payment records
              </p>
            </div>

            <Link
              href="/payments"
              className="rounded-lg p-2 text-[#2563EB] transition hover:bg-[#EFF6FF] dark:hover:bg-[#203D65]"
              aria-label="View payments"
            >
              <TrendingUp size={20} />
            </Link>
          </div>

          <div className="rounded-xl border border-[#93C5FD] bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#E0E7FF] p-4 dark:border-[#263D60] dark:from-[#172D49] dark:via-[#1E3154] dark:to-[#292C60]">
            <p className="text-xs font-medium text-[#58708F] dark:text-[#DBEAFE]">
              Total pending payments
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] dark:text-white">
              ₹48,500
            </p>

            <p className="mt-2 flex items-center gap-2 text-xs font-medium text-[#946200] dark:text-[#F2D28A]">
              <Clock3 size={14} />
              5 pending payment records
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.name}
                className="flex items-center justify-between gap-3 border-b border-[#D7E6F8] pb-3 last:border-0 last:pb-0 dark:border-[#263D60]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#DBEAFE] p-2 text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]">
                    <CircleDollarSign size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                      {payment.name}
                    </p>

                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      {payment.status}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                  {payment.amount}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/payments"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] py-3 text-sm font-semibold text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#102440] dark:text-white dark:hover:bg-[#203D65]"
          >
            View All Payments
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>

      {/* ------------------------------------------ */}
      {/* DUEGO 3.0 PREMIUM FEATURES */}
      {/* ------------------------------------------ */}

      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={19} className="text-[#D6A84B]" />

            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              Unlock More with Duego
            </h2>
          </div>

          <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
            Explore advanced tools available with upgraded subscription plans.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          {/* PRO FEATURE */}

          <FeatureGate
            featureId="advanced-ai-analysis"
            currentPlan={currentPlan}
          >
            <div className="rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
              <PlanBadge plan="pro" />

              <h3 className="mt-3 font-bold text-[#142B4A] dark:text-white">
                Advanced AI Analysis
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Explore deeper document insights, advanced analysis and risk detection.
              </p>

              <Link
                href="/analysis"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
              >
                Open feature
                <ArrowRight size={16} />
              </Link>
            </div>
          </FeatureGate>

          {/* BUSINESS FEATURE */}

          <FeatureGate
            featureId="business-insights"
            currentPlan={currentPlan}
          >
            <div className="rounded-2xl border border-[#E8C778] bg-[#FFFBEB] p-5 dark:border-[#65512C] dark:bg-[#142B4A]">
              <PlanBadge plan="business" />

              <h3 className="mt-3 font-bold text-[#142B4A] dark:text-white">
                Business Intelligence
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Explore advanced financial and business performance insights.
              </p>

              <Link
                href="/business-payments"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#946200] hover:underline dark:text-[#F2D28A]"
              >
                Open feature
                <ArrowRight size={16} />
              </Link>
            </div>
          </FeatureGate>
        </div>
      </section>

      {/* ------------------------------------------ */}
      {/* RECENT ACTIVITY */}
      {/* ------------------------------------------ */}

      <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 shadow-sm dark:border-[#263D60] dark:bg-[#142B4A] sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-[#142B4A] dark:text-white">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Recent document and workspace updates
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#102440]">
              <Search size={16} className="text-[#2563EB]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search activity..."
                className="h-10 w-full min-w-0 bg-transparent text-xs text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA] sm:w-48"
              />
            </div>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 py-2.5 text-xs font-medium text-[#142B4A] transition hover:bg-[#EFF6FF] dark:border-[#263D60] dark:text-white dark:hover:bg-[#203D65]"
            >
              <Filter size={15} />
              Clear
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
                  className="flex flex-col justify-between gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF]/50 p-4 sm:flex-row sm:items-center dark:border-[#263D60] dark:bg-[#102440]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-3 ${colorClasses[activity.color]}`}>
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                        {activity.name}
                      </p>

                      <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                        {activity.detail} · {activity.time}
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full border border-[#D7E6F8] bg-white px-3 py-1.5 text-xs font-medium text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-[#DBEAFE]">
                    {activity.status}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-[#93C5FD] bg-[#EFF6FF] p-8 text-center dark:border-[#263D60] dark:bg-[#102440]">
              <Search size={22} className="mx-auto text-[#2563EB]" />

              <p className="mt-3 text-sm font-semibold text-[#142B4A] dark:text-white">
                No matching activity
              </p>

              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Try a different search term.
              </p>
            </div>
          )}
        </div>

        <Link
          href="/documents"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline"
        >
          View Document Workspace
          <ChevronRight size={16} />
        </Link>
      </section>

      {/* ------------------------------------------ */}
      {/* QUICK ACTIONS */}
      {/* ------------------------------------------ */}

      <section>
        <div className="mb-4">
          <h2 className="font-bold text-[#142B4A] dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
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
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-[#D7E6F8] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#93C5FD] hover:bg-[#EFF6FF] hover:shadow-md dark:border-[#263D60] dark:bg-[#142B4A] dark:hover:border-[#2563EB] dark:hover:bg-[#203D65]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                        {action.label}
                      </p>

                      <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-[#58708F] transition group-hover:text-[#2563EB] dark:text-[#A9BEDA]"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------ */}

      <div className="flex flex-col justify-between gap-2 border-t border-[#D7E6F8] pt-5 text-xs text-[#58708F] dark:border-[#263D60] dark:text-[#A9BEDA] sm:flex-row">
        <p>Duego 3.0 · Business Intelligence Workspace</p>

        <p>Dashboard information is currently for demonstration purposes.</p>
      </div>
    </div>
  );
}

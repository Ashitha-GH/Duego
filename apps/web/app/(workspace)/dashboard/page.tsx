
"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Files,
  Plus,
  Upload,
  AlertTriangle,
  Wallet,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Documents",
    value: "128",
    change: "+12 this month",
    icon: Files,
    color: "blue",
  },
  {
    title: "AI Analysed",
    value: "96",
    change: "75% of documents",
    icon: BrainCircuit,
    color: "violet",
  },
  {
    title: "Pending Payments",
    value: "₹48,500",
    change: "5 payment obligations",
    icon: Wallet,
    color: "amber",
  },
  {
    title: "Upcoming Deadlines",
    value: "08",
    change: "Next 30 days",
    icon: CalendarDays,
    color: "emerald",
  },
];

const activities = [
  {
    name: "Service Agreement.pdf",
    detail: "AI analysis completed",
    time: "10 minutes ago",
    status: "Analysed",
    icon: BrainCircuit,
  },
  {
    name: "GST Invoice October.pdf",
    detail: "Document uploaded",
    time: "Yesterday",
    status: "Processing",
    icon: FileText,
  },
  {
    name: "Vendor Contract.docx",
    detail: "Deadline extracted",
    time: "2 days ago",
    status: "Completed",
    icon: CheckCircle2,
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

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600",
  violet: "bg-violet-500/10 text-violet-600",
  amber: "bg-amber-500/10 text-amber-600",
  emerald: "bg-emerald-500/10 text-emerald-600",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
      >
        <div>
          <p className="text-sm font-medium text-blue-600">
            Monday, November 2, 2026
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Welcome to Duego 👋
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Here&apos;s what&apos;s happening with your business documents.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)]"
          >
            <Upload size={17} />
            Upload Document
          </Link>
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Sparkles size={17} />
            AI Analysis
          </Link>
        </div>
      </motion.div>

      {/* Demo data notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <AlertTriangle className="mt-0.5 shrink-0 text-blue-600" size={18} />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Preview dashboard:</strong>{" "}
          The figures and activities below are sample data for the interface.
          Your actual account information will appear after backend integration.
        </p>
      </div>

      {/* Statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--foreground)]">
            Business Overview
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">
            Sample figures
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
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {stat.title}
                  </span>
                  <span className={`rounded-xl p-2.5 ${colorClasses[stat.color]}`}>
                    <Icon size={19} />
                  </span>
                </div>
                <p className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                  {stat.change}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main dashboard grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent activity */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Recent Activity
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Latest document updates
              </p>
            </div>
            <Link
              href="/documents"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.name}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
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
                  <span className="w-fit rounded-full bg-[var(--muted)] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI insights */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 p-6 text-white">
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <BrainCircuit size={22} />
              <span className="text-sm font-semibold">Duego AI Assistant</span>
            </div>
            <h2 className="mt-6 text-2xl font-bold">
              Your documents, made smarter.
            </h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              Analyse business documents, identify important information,
              and discover upcoming obligations in one place.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <CheckCircle2 size={16} />
                Extract important details
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <CheckCircle2 size={16} />
                Identify deadlines
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <CheckCircle2 size={16} />
                Highlight payment obligations
              </div>
            </div>
            <Link
              href="/analysis"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-800 transition hover:bg-blue-50"
            >
              Explore AI Analysis <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </div>

      {/* Deadlines and payments */}
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Upcoming Deadlines
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Important dates to remember
              </p>
            </div>
            <Link
              href="/deadlines"
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-500/10"
            >
              <CalendarDays size={19} />
            </Link>
          </div>

          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div
                key={deadline.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600">
                    <Clock3 size={19} />
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
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    deadline.status === "Urgent"
                      ? "bg-red-500/10 text-red-600"
                      : "bg-blue-500/10 text-blue-600"
                  }`}
                >
                  {deadline.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Payment Overview
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Sample payment records
              </p>
            </div>
            <Link
              href="/payments"
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-500/10"
            >
              <TrendingUp size={19} />
            </Link>
          </div>

          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600">
                    <Wallet size={19} />
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
                <span className="text-sm font-bold text-[var(--foreground)]">
                  {payment.amount}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick actions */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h2 className="font-bold text-[var(--foreground)]">Quick Actions</h2>
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">
          Jump directly to a workspace feature
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Upload Document", href: "/documents", icon: Upload },
            { label: "View Obligations", href: "/obligations", icon: FileText },
            { label: "Check Reminders", href: "/reminders", icon: Clock3 },
            { label: "Account Settings", href: "/settings", icon: Plus },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-blue-500/50 hover:bg-blue-500/5"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-blue-600" />
                  {action.label}
                </span>
                <ArrowUpRight size={16} className="text-[var(--muted-foreground)]" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

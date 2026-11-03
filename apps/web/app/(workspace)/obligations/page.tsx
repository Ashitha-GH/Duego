
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Plus,
  CalendarDays,
  Wallet,
  FileCheck,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  MoreHorizontal,
  X,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

type ObligationStatus = "Pending" | "Completed" | "Overdue";
type ObligationPriority = "High" | "Medium" | "Low";

type Obligation = {
  id: number;
  title: string;
  description: string;
  category: string;
  amount: number;
  dueDate: string;
  priority: ObligationPriority;
  status: ObligationStatus;
  source: string;
};

const initialObligations: Obligation[] = [
  {
    id: 1,
    title: "GST Payment",
    description: "Monthly GST payment obligation",
    category: "Tax",
    amount: 25000,
    dueDate: "2026-11-05",
    priority: "High",
    status: "Pending",
    source: "GST Invoice October.pdf",
  },
  {
    id: 2,
    title: "Office Rent",
    description: "Monthly office rental payment",
    category: "Payment",
    amount: 18000,
    dueDate: "2026-11-07",
    priority: "High",
    status: "Pending",
    source: "Rental Agreement.pdf",
  },
  {
    id: 3,
    title: "Vendor Contract Renewal",
    description: "Review contract renewal conditions",
    category: "Contract",
    amount: 0,
    dueDate: "2026-11-12",
    priority: "Medium",
    status: "Pending",
    source: "Vendor Contract.docx",
  },
  {
    id: 4,
    title: "Insurance Renewal",
    description: "Review and renew business insurance",
    category: "Compliance",
    amount: 12000,
    dueDate: "2026-10-28",
    priority: "High",
    status: "Overdue",
    source: "Insurance Policy.pdf",
  },
  {
    id: 5,
    title: "Software Subscription",
    description: "Annual software subscription payment",
    category: "Payment",
    amount: 5500,
    dueDate: "2026-11-18",
    priority: "Low",
    status: "Completed",
    source: "Software Invoice.pdf",
  },
  {
    id: 6,
    title: "Employee Agreement Review",
    description: "Review employee agreement documentation",
    category: "Contract",
    amount: 0,
    dueDate: "2026-11-22",
    priority: "Medium",
    status: "Pending",
    source: "Employee Agreement.pdf",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusStyles: Record<ObligationStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-600",
  Completed: "bg-emerald-500/10 text-emerald-600",
  Overdue: "bg-red-500/10 text-red-600",
};

const priorityStyles: Record<ObligationPriority, string> = {
  High: "text-red-600",
  Medium: "text-amber-600",
  Low: "text-emerald-600",
};

export default function ObligationsPage() {
  const [obligations, setObligations] = useState(initialObligations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedObligation, setSelectedObligation] =
    useState<Obligation | null>(null);
  const [notice, setNotice] = useState("");

  const filteredObligations = useMemo(() => {
    return obligations.filter((item) => {
      const matchesSearch = `${item.title} ${item.description} ${item.source}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [obligations, search, statusFilter, categoryFilter]);

  const pendingCount = obligations.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = obligations.filter(
    (item) => item.status === "Completed"
  ).length;

  const overdueCount = obligations.filter(
    (item) => item.status === "Overdue"
  ).length;

  const pendingAmount = obligations
    .filter((item) => item.status !== "Completed")
    .reduce((total, item) => total + item.amount, 0);

  function markCompleted(id: number) {
    setObligations((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Completed" } : item
      )
    );

    setSelectedObligation(null);
    setNotice("Obligation marked as completed in this preview.");
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Business Responsibility Tracker
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Obligations
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Track payments, contracts, tax duties, and important business
            responsibilities.
          </p>
        </div>

        <button
          onClick={() =>
            setNotice(
              "Manual obligation creation will be added in a future phase."
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Obligation
        </button>
      </div>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <ClipboardList
          size={19}
          className="mt-0.5 shrink-0 text-blue-600"
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Preview mode:</strong>{" "}
          These are demonstration obligations, not records retrieved from
          your backend. Status changes are temporary and will not be saved.
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
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-[var(--foreground)]">
            Obligations Overview
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">
            Sample figures
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Obligations",
              value: obligations.length,
              icon: ClipboardList,
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

      {/* Pending amount */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <Wallet size={18} className="text-blue-600" />
              Outstanding obligation amount
            </div>
            <p className="mt-3 text-3xl font-bold text-[var(--foreground)]">
              {formatCurrency(pendingAmount)}
            </p>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Sum of sample amounts for non-completed obligations.
            </p>
          </div>

          <Link
            href="/payments"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)]"
          >
            View Payments <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* Filters */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              All Obligations
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {filteredObligations.length} obligation(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Search
                size={17}
                className="text-[var(--muted-foreground)]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search obligations..."
                className="h-10 min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Filter
                size={16}
                className="text-[var(--muted-foreground)]"
              />
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
              <option value="Compliance">Compliance</option>
            </select>
          </div>
        </div>

        {/* Obligation list */}
        <div className="divide-y divide-[var(--border)]">
          {filteredObligations.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[var(--muted)]/40 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <FileCheck size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    Source: {item.source}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    {formatDate(item.dueDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--foreground)]">
                    {item.amount > 0 ? formatCurrency(item.amount) : "—"}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span
                    className={`text-xs font-semibold ${priorityStyles[item.priority]}`}
                  >
                    {item.priority} priority
                  </span>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedObligation(item)}
                  aria-label={`View ${item.title}`}
                  className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-blue-600"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}

          {filteredObligations.length === 0 && (
            <div className="px-5 py-12 text-center">
              <ClipboardList
                size={32}
                className="mx-auto text-[var(--muted-foreground)]"
              />
              <p className="mt-3 font-semibold text-[var(--foreground)]">
                No obligations found
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming obligations */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays size={20} className="text-blue-600" />
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Upcoming Responsibilities
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Pending items with upcoming dates.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {obligations
            .filter((item) => item.status === "Pending")
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600">
                    <CalendarDays size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {item.category}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {formatDate(item.dueDate)}
                </span>
              </div>
            ))}
        </div>

        <Link
          href="/deadlines"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Open deadline calendar <ArrowUpRight size={16} />
        </Link>
      </section>

      {/* Detail modal */}
      {selectedObligation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedObligation(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="obligation-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2
                    id="obligation-dialog-title"
                    className="font-bold text-[var(--foreground)]"
                  >
                    Obligation Details
                  </h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Preview record
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedObligation(null)}
                aria-label="Close details"
                className="rounded-lg p-2 hover:bg-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Obligation
                </p>
                <p className="mt-1 font-semibold text-[var(--foreground)]">
                  {selectedObligation.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Description
                </p>
                <p className="mt-1 text-sm text-[var(--foreground)]">
                  {selectedObligation.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Category
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedObligation.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                    {selectedObligation.amount > 0
                      ? formatCurrency(selectedObligation.amount)
                      : "Not applicable"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {formatDate(selectedObligation.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Priority
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${priorityStyles[selectedObligation.priority]}`}
                  >
                    {selectedObligation.priority}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Source document
                </p>
                <p className="mt-1 break-all text-sm text-[var(--foreground)]">
                  {selectedObligation.source}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {selectedObligation.status !== "Completed" && (
                <button
                  onClick={() => markCompleted(selectedObligation.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <CheckCircle2 size={17} />
                  Mark Completed
                </button>
              )}

              <button
                onClick={() => setSelectedObligation(null)}
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

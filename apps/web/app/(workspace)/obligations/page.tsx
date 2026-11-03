
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
  RefreshCw,
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
  Pending:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  Completed:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  Overdue:
    "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

const priorityStyles: Record<ObligationPriority, string> = {
  High: "text-rose-700 dark:text-rose-300",
  Medium: "text-amber-700 dark:text-amber-300",
  Low: "text-emerald-700 dark:text-emerald-300",
};

const panel =
  "rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#0B1730]";

const heading = "text-[#142B4A] dark:text-[#EAF2FF]";
const secondary = "text-[#58708F] dark:text-[#A9BEDA]";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#C7DDF5] bg-white px-4 py-3 text-sm font-semibold !text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#345477] dark:bg-[#17365E] dark:!text-white dark:hover:bg-[#244D7D]";

const inputStyle =
  "h-11 rounded-xl border border-[#C7DDF5] bg-[#F5F9FF] px-3 text-sm font-medium text-[#142B4A] outline-none transition focus:border-blue-500 dark:border-[#345477] dark:bg-[#102749] dark:text-white";

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
      const matchesSearch =
        `${item.title} ${item.description} ${item.source} ${item.category}`
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

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  }

  return (
    <div className="space-y-7 pb-12">
      {/* PAGE HEADER */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <ShieldCheck size={14} />
            Business Responsibility Tracker
          </div>

          <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
            Obligations
          </h1>

          <p className={`mt-2 max-w-2xl text-sm leading-6 ${secondary}`}>
            Track payments, contracts, tax duties, and important business
            responsibilities in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setNotice(
              "Manual obligation creation is planned for a future phase. This preview does not save new records."
            )
          }
          className={primaryButton}
        >
          <Plus size={18} className="text-white" />
          <span className="text-white">Add Obligation</span>
        </button>
      </section>

      {/* PREVIEW NOTICE */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-[#EFF6FF] p-4 dark:border-blue-800 dark:bg-[#102749]">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
          <ClipboardList size={19} />
        </div>

        <div>
          <p className={`text-sm font-bold ${heading}`}>
            Preview Mode
          </p>
          <p className={`mt-1 text-xs leading-6 ${secondary}`}>
            These are demonstration obligations, not records retrieved from
            your backend. Status changes are temporary and will not be saved.
          </p>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-[#142B4A] dark:border-blue-800 dark:bg-[#102749] dark:text-blue-100">
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded-lg p-2 text-blue-700 transition hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-[#17365E]"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className={`font-bold ${heading}`}>
            Obligations Overview
          </h2>
          <span className={`text-xs ${secondary}`}>Sample figures</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Obligations",
              value: obligations.length,
              icon: ClipboardList,
              color:
                "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: Clock3,
              color:
                "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
            },
            {
              label: "Completed",
              value: completedCount,
              icon: CheckCircle2,
              color:
                "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
            },
            {
              label: "Overdue",
              value: overdueCount,
              icon: AlertTriangle,
              color:
                "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className={`${panel} p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${secondary}`}>
                    {item.label}
                  </span>

                  <span className={`rounded-xl p-2.5 ${item.color}`}>
                    <Icon size={20} />
                  </span>
                </div>

                <p className={`mt-4 text-3xl font-bold ${heading}`}>
                  {item.value.toString().padStart(2, "0")}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* OUTSTANDING AMOUNT */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#142B4A] to-[#244D7D] p-6 text-white shadow-md">
        <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-blue-300/10 blur-2xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-100">
              <Wallet size={18} />
              Outstanding Obligation Amount
            </div>

            <p className="mt-3 text-3xl font-bold tracking-tight text-white">
              {formatCurrency(pendingAmount)}
            </p>

            <p className="mt-2 text-xs text-blue-100/80">
              Sum of sample amounts for non-completed obligations.
            </p>
          </div>

          <Link
            href="/payments"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#142B4A] transition hover:bg-blue-100"
          >
            <Wallet size={17} className="text-[#142B4A]" />
            <span className="text-[#142B4A]">View Payments</span>
            <ArrowUpRight size={16} className="text-[#142B4A]" />
          </Link>
        </div>
      </section>

      {/* FILTERS AND OBLIGATION LIST */}
      <section className={`${panel} overflow-hidden shadow-sm`}>
        <div className="border-b border-[#D7E6F8] p-5 dark:border-[#263D60]">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <h2 className={`font-bold ${heading}`}>All Obligations</h2>
              <p className={`mt-1 text-xs ${secondary}`}>
                {filteredObligations.length} obligation(s) displayed
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {/* SEARCH */}
              <div className="flex h-11 items-center gap-2 rounded-xl border border-[#C7DDF5] bg-[#F5F9FF] px-3 focus-within:border-blue-500 dark:border-[#345477] dark:bg-[#102749]">
                <Search size={17} className="shrink-0 text-blue-600" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search obligations..."
                  className="w-full min-w-0 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#7891B0] dark:text-white dark:placeholder:text-[#A9BEDA] sm:w-48"
                />
              </div>

              {/* STATUS FILTER */}
              <div className="flex items-center gap-2 rounded-xl border border-[#C7DDF5] bg-[#F5F9FF] px-3 dark:border-[#345477] dark:bg-[#102749]">
                <Filter size={16} className="text-blue-600" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 bg-transparent text-sm font-semibold text-[#142B4A] outline-none dark:text-white"
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
                className={`${inputStyle} min-w-36`}
              >
                <option value="All">All categories</option>
                <option value="Tax">Tax</option>
                <option value="Payment">Payment</option>
                <option value="Contract">Contract</option>
                <option value="Compliance">Compliance</option>
              </select>

              {/* RESET FILTERS */}
              <button
                type="button"
                onClick={resetFilters}
                className={secondaryButton}
              >
                <RefreshCw size={16} className="text-[#142B4A] dark:text-white" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* OBLIGATION LIST */}
        <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
          {filteredObligations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#F5F9FF] lg:flex-row lg:items-center dark:hover:bg-[#102749]"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                  <FileCheck size={21} />
                </div>

                <div className="min-w-0">
                  <p className={`text-sm font-bold ${heading}`}>
                    {item.title}
                  </p>
                  <p className={`mt-1 text-xs ${secondary}`}>
                    {item.description}
                  </p>
                  <p className={`mt-2 break-all text-xs ${secondary}`}>
                    Source: {item.source}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 lg:justify-end">
                <div>
                  <p className={`text-xs ${secondary}`}>Due date</p>
                  <p className={`mt-1 text-sm font-semibold ${heading}`}>
                    {formatDate(item.dueDate)}
                  </p>
                </div>

                <div>
                  <p className={`text-xs ${secondary}`}>Amount</p>
                  <p className={`mt-1 text-sm font-bold ${heading}`}>
                    {item.amount > 0 ? formatCurrency(item.amount) : "—"}
                  </p>
                </div>

                <div className="min-w-24">
                  <p className={`text-xs font-semibold ${priorityStyles[item.priority]}`}>
                    {item.priority} priority
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedObligation(item)}
                  aria-label={`View ${item.title}`}
                  className="rounded-xl border border-[#C7DDF5] bg-white p-2.5 text-[#142B4A] transition hover:border-blue-400 hover:bg-[#DBEAFE] dark:border-[#345477] dark:bg-[#17365E] dark:text-white dark:hover:bg-[#244D7D]"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </motion.div>
          ))}

          {filteredObligations.length === 0 && (
            <div className="px-5 py-12 text-center">
              <ClipboardList size={34} className="mx-auto text-blue-500" />
              <p className={`mt-3 font-bold ${heading}`}>
                No obligations found
              </p>
              <p className={`mt-1 text-sm ${secondary}`}>
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className={`${secondaryButton} mt-4`}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* UPCOMING RESPONSIBILITIES */}
      <section className={`${panel} p-5 shadow-sm sm:p-6`}>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
              <CalendarDays size={21} />
            </div>

            <div>
              <h2 className={`font-bold ${heading}`}>
                Upcoming Responsibilities
              </h2>
              <p className={`mt-1 text-xs ${secondary}`}>
                Pending items with upcoming dates.
              </p>
            </div>
          </div>

          <Link
            href="/deadlines"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-[#17365E]"
          >
            <span>Open Deadline Calendar</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {obligations
            .filter((item) => item.status === "Pending")
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-[#D7E6F8] bg-[#F5F9FF] p-4 sm:flex-row sm:items-center dark:border-[#263D60] dark:bg-[#102749]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <p className={`text-sm font-bold ${heading}`}>
                      {item.title}
                    </p>
                    <p className={`mt-1 text-xs ${secondary}`}>
                      {item.category}
                    </p>
                  </div>
                </div>

                <span className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  {formatDate(item.dueDate)}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* OBLIGATION DETAILS MODAL */}
      {selectedObligation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07162B]/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedObligation(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="obligation-dialog-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#C7DDF5] bg-white shadow-2xl dark:border-[#345477] dark:bg-[#0B1730]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-3 bg-[#142B4A] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                  <ShieldCheck size={23} className="text-blue-200" />
                </div>

                <div>
                  <h2
                    id="obligation-dialog-title"
                    className="font-bold text-white"
                  >
                    Obligation Details
                  </h2>
                  <p className="mt-1 text-xs text-blue-100">
                    Demonstration record
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedObligation(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-white transition hover:bg-white/15"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* TITLE */}
              <div>
                <p className={`text-xs font-medium ${secondary}`}>
                  Obligation name
                </p>
                <p className={`mt-1 text-lg font-bold ${heading}`}>
                  {selectedObligation.title}
                </p>
                <p className={`mt-1 text-sm ${secondary}`}>
                  {selectedObligation.description}
                </p>
              </div>

              {/* STATUS */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusStyles[selectedObligation.status]}`}
                >
                  {selectedObligation.status}
                </span>

                <span
                  className={`rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200`}
                >
                  {selectedObligation.category}
                </span>

                <span
                  className={`rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200`}
                >
                  {selectedObligation.priority} priority
                </span>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-4 dark:border-[#345477] dark:bg-[#102749]">
                  <Wallet size={19} className="text-blue-600" />
                  <p className={`mt-3 text-xs ${secondary}`}>Amount</p>
                  <p className={`mt-1 text-sm font-bold ${heading}`}>
                    {selectedObligation.amount > 0
                      ? formatCurrency(selectedObligation.amount)
                      : "Not applicable"}
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-[#1A2347]">
                  <CalendarDays size={19} className="text-indigo-600 dark:text-indigo-300" />
                  <p className={`mt-3 text-xs ${secondary}`}>Due date</p>
                  <p className={`mt-1 text-sm font-bold ${heading}`}>
                    {formatDate(selectedObligation.dueDate)}
                  </p>
                </div>
              </div>

              {/* SOURCE */}
              <div className="rounded-xl border border-[#D7E6F8] bg-[#F5F9FF] p-4 dark:border-[#263D60] dark:bg-[#102749]">
                <p className={`text-xs font-semibold ${secondary}`}>
                  Source Document
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <FileCheck size={18} className="shrink-0 text-blue-600" />
                  <p className={`break-all text-sm font-semibold ${heading}`}>
                    {selectedObligation.source}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                {selectedObligation.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => markCompleted(selectedObligation.id)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={17} />
                    <span>Mark Completed</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedObligation(null)}
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

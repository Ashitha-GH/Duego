
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft,
  Receipt,
  Search,
  Filter,
  Eye,
  X,
  Printer,
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Download,
  CreditCard,
  FileText,
} from "lucide-react";

type BillingStatus = "Paid" | "Pending" | "Failed";
type PlanName = "Free" | "Pro" | "Business";

type BillingRecord = {
  id: string;
  invoice: string;
  transactionId: string;
  providerReference?: string;
  plan: PlanName;
  amount: number;
  billingDate: string;
  period: string;
  method: string;
  status: BillingStatus;
};

const initialRecords: BillingRecord[] = [
  {
    id: "1",
    invoice: "DUEGO-INV-2026-003",
    transactionId: "DEMO-TXN-2026-003",
    providerReference: "DEMO-UPI-REF-003",
    plan: "Pro",
    amount: 199,
    billingDate: "2026-10-01",
    period: "October 2026",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "2",
    invoice: "DUEGO-INV-2026-002",
    transactionId: "DEMO-TXN-2026-002",
    providerReference: "DEMO-UPI-REF-002",
    plan: "Pro",
    amount: 199,
    billingDate: "2026-09-01",
    period: "September 2026",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "3",
    invoice: "DUEGO-INV-2026-001",
    transactionId: "DEMO-TXN-2026-001",
    providerReference: "DEMO-UPI-REF-001",
    plan: "Pro",
    amount: 199,
    billingDate: "2026-08-01",
    period: "August 2026",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "4",
    invoice: "DUEGO-INV-2026-004",
    transactionId: "DEMO-TXN-2026-004",
    plan: "Pro",
    amount: 199,
    billingDate: "2026-11-01",
    period: "November 2026",
    method: "UPI",
    status: "Pending",
  },
  {
    id: "5",
    invoice: "DUEGO-INV-2026-005",
    transactionId: "DEMO-TXN-2026-005",
    providerReference: "DEMO-UPI-REF-005",
    plan: "Business",
    amount: 299,
    billingDate: "2026-07-01",
    period: "July 2026",
    method: "UPI",
    status: "Failed",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const dateLabel = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusStyles: Record<BillingStatus, string> = {
  Paid: "bg-[#DCFCE7] text-[#166534]",
  Pending: "bg-[#FEF3C7] text-[#92400E]",
  Failed: "bg-[#FEE2E2] text-[#991B1B]",
};

const planStyles: Record<PlanName, string> = {
  Free: "bg-[#EFF6FF] text-[#1D4ED8]",
  Pro: "bg-[#DBEAFE] text-[#1D4ED8]",
  Business: "bg-[#FEF3C7] text-[#92400E]",
};

export default function BillingHistoryPage() {
  const [records] = useState<BillingRecord[]>(initialRecords);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedRecord, setSelectedRecord] =
    useState<BillingRecord | null>(null);

  const paidRecords = records.filter(
    (record) => record.status === "Paid"
  );

  const pendingRecords = records.filter(
    (record) => record.status === "Pending"
  );

  const failedRecords = records.filter(
    (record) => record.status === "Failed"
  );

  const totalPaid = paidRecords.reduce(
    (sum, record) => sum + record.amount,
    0
  );

  const filteredRecords = records.filter((record) => {
      const searchText = [
        record.invoice,
        record.transactionId,
        record.providerReference ?? "",
        record.plan,
        record.period,
        record.method,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase().trim()
      );

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      const matchesPlan =
        planFilter === "All" ||
        record.plan === planFilter;

      const matchesFrom =
        !dateFrom || record.billingDate >= dateFrom;

      const matchesTo =
        !dateTo || record.billingDate <= dateTo;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPlan &&
        matchesFrom &&
        matchesTo
      );
  });

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setPlanFilter("All");
    setDateFrom("");
    setDateTo("");
  }

  function printInvoice(record: BillingRecord) {
    setSelectedRecord(record);

    // Open the browser print dialog for the dedicated invoice.
    window.setTimeout(() => {
      window.print();
    }, 300);
  }

  return (
    <>
      <div className="space-y-7 pb-10 print:hidden">
        {/* PAGE HEADER */}

        <section className="overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-[#93C5FD]">
                SUBSCRIPTION MANAGEMENT
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight">
                Billing History
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#DBEAFE]">
                Review subscription transactions, payment dates,
                transaction references and invoice records.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]">
              <Receipt size={32} className="text-white" />
            </div>
          </div>
        </section>

        {/* PREVIEW NOTICE */}

        <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-[#2563EB]"
          />

          <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
            <strong>Demo mode:</strong> These illustrative records
            are not actual transactions or tax invoices.
            Real subscription records will be retrieved from
            FastAPI after integration.
          </p>
        </div>

        {/* SUMMARY CARDS */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              Billing Overview
            </h2>

            <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
              Summary of your subscription transactions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Paid",
                value: money(totalPaid),
                detail: `${paidRecords.length} successful transactions`,
                icon: CheckCircle2,
                color: "bg-[#DCFCE7] text-[#166534]",
              },
              {
                label: "Paid Invoices",
                value: String(paidRecords.length),
                detail: "Successfully completed",
                icon: Receipt,
                color: "bg-[#DBEAFE] text-[#1D4ED8]",
              },
              {
                label: "Pending Invoices",
                value: String(pendingRecords.length),
                detail: "Awaiting confirmation",
                icon: Clock3,
                color: "bg-[#FEF3C7] text-[#92400E]",
              },
              {
                label: "Failed Payments",
                value: String(failedRecords.length),
                detail: "Require attention",
                icon: AlertCircle,
                color: "bg-[#FEE2E2] text-[#991B1B]",
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
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#58708F] dark:text-[#A9BEDA]">
                      {item.label}
                    </span>

                    <span className={`rounded-xl p-2.5 ${item.color}`}>
                      <Icon size={20} />
                    </span>
                  </div>

                  <p className="mt-4 break-words text-2xl font-bold text-[#142B4A] dark:text-white">
                    {item.value}
                  </p>

                  <p className="mt-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* TRANSACTION RECORDS */}

        <section className="overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="border-b border-[#D7E6F8] p-5 dark:border-[#263D60]">
            <h2 className="font-bold text-[#142B4A] dark:text-white">
              Subscription Transactions
            </h2>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              {filteredRecords.length} transaction(s) displayed
            </p>
          </div>

          {/* SEARCH */}

          <div className="space-y-4 p-5">
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
              <Search size={18} className="text-[#2563EB]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search invoice, transaction ID or reference..."
                aria-label="Search billing records"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            {/* FILTERS */}

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
                <Filter size={16} className="text-[#2563EB]" />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  aria-label="Filter by payment status"
                  className="h-11 w-full bg-transparent text-sm text-[#142B4A] outline-none dark:text-white"
                >
                  <option value="All">All statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <select
                value={planFilter}
                onChange={(event) => setPlanFilter(event.target.value)}
                aria-label="Filter by subscription plan"
                className="h-11 rounded-xl border border-[#D7E6F8] bg-white px-3 text-sm text-[#142B4A] outline-none dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
              >
                <option value="All">All plans</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Business">Business</option>
              </select>

              <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
                <CalendarDays
                  size={16}
                  className="shrink-0 text-[#2563EB]"
                />

                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  aria-label="Billing date from"
                  className="h-11 min-w-0 w-full bg-transparent text-xs text-[#142B4A] outline-none dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
                <CalendarDays
                  size={16}
                  className="shrink-0 text-[#2563EB]"
                />

                <input
                  type="date"
                  value={dateTo}
                  onChange={(event) => setDateTo(event.target.value)}
                  aria-label="Billing date to"
                  min={dateFrom || undefined}
                  className="h-11 min-w-0 w-full bg-transparent text-xs text-[#142B4A] outline-none dark:text-white"
                />
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm font-semibold text-[#142B4A] hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
              >
                <RotateCcw size={15} />
                Reset filters
              </button>
            </div>
          </div>

          {/* RECORD LIST */}

          <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#EFF6FF] dark:hover:bg-[#203D65] lg:flex-row lg:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                    <Receipt size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="break-all text-sm font-semibold text-[#142B4A] dark:text-white">
                      {record.invoice}
                    </p>

                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      {record.plan} Plan · {record.period}
                    </p>

                    <p className="mt-1 break-all text-[11px] text-[#58708F] dark:text-[#A9BEDA]">
                      Transaction: {record.transactionId}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                  <div>
                    <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      Amount
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#142B4A] dark:text-white">
                      {money(record.amount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      Billing Date
                    </p>

                    <p className="mt-1 text-sm text-[#142B4A] dark:text-white">
                      {dateLabel(record.billingDate)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[record.status]}`}
                  >
                    {record.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedRecord(record)}
                    aria-label={`View invoice ${record.invoice}`}
                    className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#263D60]"
                  >
                    <Eye size={19} />
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredRecords.length === 0 && (
              <div className="px-5 py-12 text-center">
                <Receipt
                  size={34}
                  className="mx-auto text-[#2563EB]"
                />

                <p className="mt-3 font-semibold text-[#142B4A] dark:text-white">
                  No billing records found
                </p>

                <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                  Try changing your search, plan, status or date filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 rounded-xl bg-[#142B4A] px-4 py-2.5 text-sm font-semibold !text-white hover:bg-[#2563EB]"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* BACK TO SUBSCRIPTION */}

        <Link
          href="/subscription"
          className="inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-semibold text-[#142B4A] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
        >
          <ArrowLeft size={17} />
          Back to Subscription
        </Link>
      </div>

      {/* INVOICE DETAILS MODAL */}

      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#142B4A]/75 p-4 print:hidden"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-dialog-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                  <Receipt size={23} />
                </div>

                <div>
                  <h2
                    id="invoice-dialog-title"
                    className="font-bold text-[#142B4A] dark:text-white"
                  >
                    Invoice Details
                  </h2>

                  <p className="mt-1 break-all text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {selectedRecord.invoice}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close invoice details"
                className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
              >
                <X size={18} />
              </button>
            </div>

            {/* AMOUNT SUMMARY */}

            <div className="mt-6 rounded-xl bg-[#EFF6FF] p-5 dark:bg-[#203D65]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#58708F] dark:text-[#A9BEDA]">
                Duego Subscription
              </p>

              <p className="mt-3 text-3xl font-bold text-[#142B4A] dark:text-white">
                {money(selectedRecord.amount)}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedRecord.status]}`}
                >
                  {selectedRecord.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${planStyles[selectedRecord.plan]}`}
                >
                  {selectedRecord.plan} Plan
                </span>
              </div>
            </div>

            {/* DETAILS */}

            <div className="mt-5 space-y-4">
              {[
                ["Invoice Number", selectedRecord.invoice],
                ["Transaction ID", selectedRecord.transactionId],
                [
                  "Provider Reference",
                  selectedRecord.providerReference || "Not available",
                ],
                ["Subscription Plan", `${selectedRecord.plan} Plan`],
                ["Billing Period", selectedRecord.period],
                ["Billing Date", dateLabel(selectedRecord.billingDate)],
                ["Payment Method", selectedRecord.method],
                ["Payment Status", selectedRecord.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col justify-between gap-1 border-b border-[#D7E6F8] pb-3 dark:border-[#263D60] sm:flex-row"
                >
                  <span className="text-sm text-[#58708F] dark:text-[#A9BEDA]">
                    {label}
                  </span>

                  <span className="break-all text-sm font-semibold text-[#142B4A] dark:text-white sm:max-w-[60%] sm:text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* ACTIONS */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => printInvoice(selectedRecord)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3.5 text-sm font-semibold !text-white hover:bg-[#2563EB]"
              >
                <Printer size={17} />
                Print / Save as PDF
              </button>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-5 py-3.5 text-sm font-semibold text-[#142B4A] hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
              >
                Close
              </button>
            </div>

            <p className="mt-3 text-center text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
              Demo invoice preview only. Not a tax invoice or proof of payment.
            </p>
          </div>
        </div>
      )}

      {/* PRINT-ONLY INVOICE */}

      {selectedRecord && (
        <section
          id="invoice-print-area"
          className="mx-auto hidden max-w-3xl bg-white p-10 text-[#142B4A] print:block"
        >
          <div className="border-b-2 border-[#142B4A] pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">DUEGO</h1>
                <p className="mt-1 text-sm text-[#58708F]">
                  Subscription Billing Statement
                </p>
              </div>

              <Receipt size={40} />
            </div>

            <div className="mt-8 rounded-xl border-2 border-[#D6A84B] bg-[#FEF3C7] p-4 text-center">
              <p className="font-bold text-[#92400E]">
                DEMO INVOICE PREVIEW
              </p>
              <p className="mt-1 text-xs text-[#92400E]">
                Not a tax invoice or proof of payment.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Invoice Details</h2>

            <p className="mt-2 text-sm">
              Invoice Number: {selectedRecord.invoice}
            </p>

            <p className="mt-1 text-sm">
              Transaction ID: {selectedRecord.transactionId}
            </p>

            <p className="mt-1 text-sm">
              Billing Date: {dateLabel(selectedRecord.billingDate)}
            </p>
          </div>

          <table className="mt-8 w-full border-collapse text-sm">
            <tbody>
              {[
                ["Subscription Plan", selectedRecord.plan],
                ["Billing Period", selectedRecord.period],
                ["Payment Method", selectedRecord.method],
                ["Provider Reference", selectedRecord.providerReference || "Not available"],
                ["Payment Status", selectedRecord.status],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-[#D7E6F8]">
                  <td className="py-4 font-medium">{label}</td>
                  <td className="py-4 text-right font-semibold">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex items-center justify-between rounded-xl bg-[#EFF6FF] p-5">
            <span className="font-bold">Total Amount</span>
            <span className="text-2xl font-bold">
              {money(selectedRecord.amount)}
            </span>
          </div>

          <p className="mt-10 text-center text-xs text-[#58708F]">
            This document contains demonstration data.
            Official invoices will be supplied by the Duego billing system.
          </p>
        </section>
      )}
    </>
  );
}

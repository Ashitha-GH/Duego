
"use client";

import { useMemo, useState } from "react";
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
  CreditCard,
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

type BillingStatus = "Paid" | "Pending" | "Failed";

type BillingRecord = {
  id: string;
  invoice: string;
  plan: string;
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
    plan: "Pro",
    amount: 199,
    billingDate: "2026-11-01",
    period: "November 2026",
    method: "UPI",
    status: "Pending",
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

export default function BillingHistoryPage() {
  const [records] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] =
    useState<BillingRecord | null>(null);

  const paidRecords = records.filter((record) => record.status === "Paid");
  const pendingRecords = records.filter(
    (record) => record.status === "Pending"
  );
  const totalPaid = paidRecords.reduce(
    (sum, record) => sum + record.amount,
    0
  );

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = [
        record.invoice,
        record.plan,
        record.period,
        record.method,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  function printInvoice(record: BillingRecord) {
    setSelectedRecord(record);

    // Open the browser's print dialog after the invoice details render.
    window.setTimeout(() => {
      window.print();
    }, 300);
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
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
              Review your Duego subscription transactions, payment dates
              and invoice records.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]">
            <Receipt size={32} className="text-white" />
          </div>
        </div>
      </section>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />
        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> These are illustrative subscription
          records, not actual transactions or tax invoices. Real billing
          records will be loaded from the backend after integration.
        </p>
      </div>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Paid",
            value: money(totalPaid),
            detail: `${paidRecords.length} paid records`,
            icon: CheckCircle2,
            color: "bg-[#DCFCE7] text-[#166534]",
          },
          {
            label: "Paid Invoices",
            value: String(paidRecords.length),
            detail: "Successful payments",
            icon: Receipt,
            color: "bg-[#DBEAFE] text-[#1D4ED8]",
          },
          {
            label: "Pending Invoices",
            value: String(pendingRecords.length),
            detail: "Awaiting payment",
            icon: Clock3,
            color: "bg-[#FEF3C7] text-[#92400E]",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#58708F] dark:text-[#A9BEDA]">
                  {item.label}
                </span>
                <span className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#142B4A] dark:text-white">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                {item.detail}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* Records */}
      <section className="overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]">
        <div className="flex flex-col justify-between gap-4 border-b border-[#D7E6F8] p-5 dark:border-[#263D60] lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[#142B4A] dark:text-white">
              Subscription Transactions
            </h2>
            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              {filteredRecords.length} invoice(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
              <Search size={17} className="text-[#2563EB]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search invoices..."
                className="h-10 min-w-0 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
              <Filter size={16} className="text-[#2563EB]" />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 bg-transparent text-sm text-[#142B4A] outline-none dark:text-white"
              >
                <option value="All">All statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#EFF6FF] dark:hover:bg-[#203D65] lg:flex-row lg:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                  <Receipt size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                    {record.invoice}
                  </p>
                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {record.plan} Plan · {record.period}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5">
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
                  onClick={() => setSelectedRecord(record)}
                  aria-label={`View invoice ${record.invoice}`}
                  className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#263D60]"
                >
                  <Eye size={19} />
                </button>
              </div>
            </div>
          ))}

          {filteredRecords.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Receipt size={32} className="mx-auto text-[#2563EB]" />
              <p className="mt-3 font-semibold text-[#142B4A] dark:text-white">
                No billing records found
              </p>
              <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Back link */}
      <Link
        href="/subscription"
        className="inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-semibold text-[#142B4A] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
      >
        <ArrowLeft size={17} />
        Back to Subscription
      </Link>

      {/* Invoice details */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/70 p-4"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-dialog-title"
            className="w-full max-w-lg rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
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
                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {selectedRecord.invoice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                aria-label="Close invoice details"
                className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-[#EFF6FF] p-5 dark:bg-[#203D65]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#58708F] dark:text-[#A9BEDA]">
                Duego Subscription
              </p>
              <p className="mt-3 text-3xl font-bold text-[#142B4A] dark:text-white">
                {money(selectedRecord.amount)}
              </p>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedRecord.status]}`}
              >
                {selectedRecord.status}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {[
                ["Invoice Number", selectedRecord.invoice],
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
                  <span className="text-sm font-semibold text-[#142B4A] dark:text-white sm:text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => printInvoice(selectedRecord)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3.5 text-sm font-semibold !text-white hover:bg-[#2563EB]"
            >
              <Printer size={17} />
              Print / Save as PDF
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
              This is a sample invoice preview, not a tax invoice or proof
              of payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

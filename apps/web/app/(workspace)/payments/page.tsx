
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  CreditCard,
  CalendarDays,
  ArrowUpRight,
  Receipt,
  X,
  Eye,
  Download,
  Plus,
  Building2,
  Banknote,
  ShieldCheck,
} from "lucide-react";

type PaymentStatus = "Paid" | "Pending" | "Overdue";

type Payment = {
  id: string;
  title: string;
  reference: string;
  category: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  method: string;
  status: PaymentStatus;
};

const initialPayments: Payment[] = [
  {
    id: "PAY-1001",
    title: "GST Payment",
    reference: "GST-2026-001",
    category: "Tax",
    amount: 25000,
    dueDate: "2026-11-05",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    id: "PAY-1002",
    title: "Office Rent",
    reference: "RENT-2026-010",
    category: "Business Expense",
    amount: 18000,
    dueDate: "2026-11-07",
    method: "UPI",
    status: "Pending",
  },
  {
    id: "PAY-1003",
    title: "Software Subscription",
    reference: "SUB-2026-004",
    category: "Subscription",
    amount: 5500,
    dueDate: "2026-10-28",
    paidDate: "2026-10-27",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "PAY-1004",
    title: "Insurance Premium",
    reference: "INS-2026-009",
    category: "Insurance",
    amount: 12000,
    dueDate: "2026-10-25",
    method: "Bank Transfer",
    status: "Overdue",
  },
  {
    id: "PAY-1005",
    title: "Vendor Invoice",
    reference: "VEN-2026-015",
    category: "Vendor",
    amount: 15000,
    dueDate: "2026-11-12",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    id: "PAY-1006",
    title: "Internet Bill",
    reference: "NET-2026-011",
    category: "Utilities",
    amount: 1800,
    dueDate: "2026-10-20",
    paidDate: "2026-10-19",
    method: "UPI",
    status: "Paid",
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

const statusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-500/10 text-emerald-600",
  Pending: "bg-amber-500/10 text-amber-600",
  Overdue: "bg-red-500/10 text-red-600",
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
    null
  );
  const [notice, setNotice] = useState("");

  const paidPayments = payments.filter((p) => p.status === "Paid");
  const pendingPayments = payments.filter((p) => p.status === "Pending");
  const overduePayments = payments.filter((p) => p.status === "Overdue");

  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalOutstanding = totalPending + totalOverdue;

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.title,
        payment.reference,
        payment.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || payment.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [payments, search, statusFilter, categoryFilter]);

  function markAsPaid(id: string) {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: "Paid",
              paidDate: new Date().toISOString().slice(0, 10),
            }
          : payment
      )
    );

    setSelectedPayment(null);
    setNotice("Payment marked as paid in this temporary preview.");
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Business Finance Management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Payments
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Monitor payment obligations, transaction records, and payment
            statuses.
          </p>
        </div>

        <button
          onClick={() =>
            setNotice(
              "Adding and recording new payments will be connected to the backend later."
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Payment Record
        </button>
      </div>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-blue-600" />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Preview mode:</strong>{" "}
          All transactions and amounts below are sample records. This page
          does not connect to a bank, collect money, or process payments.
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
            Payment Overview
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">
            Sample figures
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Paid",
              value: money(totalPaid),
              count: `${paidPayments.length} transactions`,
              icon: CheckCircle2,
              color: "bg-emerald-500/10 text-emerald-600",
            },
            {
              label: "Pending Payments",
              value: money(totalPending),
              count: `${pendingPayments.length} transactions`,
              icon: Clock3,
              color: "bg-amber-500/10 text-amber-600",
            },
            {
              label: "Overdue Payments",
              value: money(totalOverdue),
              count: `${overduePayments.length} transactions`,
              icon: AlertTriangle,
              color: "bg-red-500/10 text-red-600",
            },
            {
              label: "Total Outstanding",
              value: money(totalOutstanding),
              count: `${pendingPayments.length + overduePayments.length} unpaid records`,
              icon: Wallet,
              color: "bg-blue-500/10 text-blue-600",
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
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {item.label}
                  </span>
                  <span className={`rounded-xl p-2.5 ${item.color}`}>
                    <Icon size={19} />
                  </span>
                </div>
                <p className="mt-4 break-words text-2xl font-bold text-[var(--foreground)]">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                  {item.count}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Payment status overview */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Payment Status Distribution
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Distribution of sample payment records.
            </p>
          </div>
          <span className="text-sm font-semibold text-[var(--foreground)]">
            {payments.length} records
          </span>
        </div>

        <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-[var(--muted)]">
          {payments.length > 0 && (
            <>
              <div
                className="bg-emerald-500"
                style={{
                  width: `${(paidPayments.length / payments.length) * 100}%`,
                }}
              />
              <div
                className="bg-amber-500"
                style={{
                  width: `${(pendingPayments.length / payments.length) * 100}%`,
                }}
              />
              <div
                className="bg-red-500"
                style={{
                  width: `${(overduePayments.length / payments.length) * 100}%`,
                }}
              />
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          {[
            { label: "Paid", color: "bg-emerald-500", count: paidPayments.length },
            { label: "Pending", color: "bg-amber-500", count: pendingPayments.length },
            { label: "Overdue", color: "bg-red-500", count: overduePayments.length },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <span className="text-xs text-[var(--muted-foreground)]">
                {item.label}: {item.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Payment records */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Payment Records
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {filteredPayments.length} payment(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Search size={17} className="text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search payments..."
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
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
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
              <option value="Business Expense">Business Expense</option>
              <option value="Subscription">Subscription</option>
              <option value="Insurance">Insurance</option>
              <option value="Vendor">Vendor</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[var(--muted)]/40 lg:flex-row lg:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <Receipt size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {payment.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {payment.reference} · {payment.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--foreground)]">
                    {money(payment.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {dateLabel(payment.dueDate)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[payment.status]}`}
                >
                  {payment.status}
                </span>

                <button
                  onClick={() => setSelectedPayment(payment)}
                  aria-label={`View ${payment.title}`}
                  className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-blue-600"
                >
                  <Eye size={19} />
                </button>
              </div>
            </div>
          ))}

          {filteredPayments.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Receipt
                size={32}
                className="mx-auto text-[var(--muted-foreground)]"
              />
              <p className="mt-3 font-semibold text-[var(--foreground)]">
                No payments found
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Payment methods */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="mb-5">
          <h2 className="font-bold text-[var(--foreground)]">
            Payment Methods
          </h2>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Example payment methods used in the sample records.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "UPI",
              description: "Unified Payments Interface",
              icon: Wallet,
            },
            {
              title: "Bank Transfer",
              description: "Direct bank payment",
              icon: Building2,
            },
            {
              title: "Card Payment",
              description: "Debit or credit card",
              icon: CreditCard,
            },
          ].map((method) => {
            const Icon = method.icon;

            return (
              <div
                key={method.title}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-4"
              >
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <Icon size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {method.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {method.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <Receipt size={22} />
                </div>
                <div>
                  <h2
                    id="payment-dialog-title"
                    className="font-bold text-[var(--foreground)]"
                  >
                    Transaction Details
                  </h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Sample transaction record
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                aria-label="Close transaction details"
                className="rounded-lg p-2 hover:bg-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Payment description
                </p>
                <p className="mt-1 font-semibold text-[var(--foreground)]">
                  {selectedPayment.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Reference number
                </p>
                <p className="mt-1 text-sm text-[var(--foreground)]">
                  {selectedPayment.reference}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Amount
                  </p>
                  <p className="mt-1 font-bold text-[var(--foreground)]">
                    {money(selectedPayment.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedPayment.status]}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {dateLabel(selectedPayment.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Payment method
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedPayment.method}
                  </p>
                </div>
              </div>

              {selectedPayment.paidDate && (
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Paid date
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {dateLabel(selectedPayment.paidDate)}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {selectedPayment.status !== "Paid" && (
                <button
                  onClick={() => markAsPaid(selectedPayment.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <CheckCircle2 size={17} />
                  Mark as Paid
                </button>
              )}

              <button
                onClick={() => setSelectedPayment(null)}
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

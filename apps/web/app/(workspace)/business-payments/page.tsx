
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Wallet,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Receipt,
  X,
  Eye,
  Plus,
  Building2,
  ShieldCheck,
  CalendarDays,
  RefreshCw,
  ArrowUpRight,
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
  Paid: "bg-[#DCFCE7] text-[#166534]",
  Pending: "bg-[#FEF3C7] text-[#92400E]",
  Overdue: "bg-[#FEE2E2] text-[#991B1B]",
};

export default function BusinessPaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);
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
    setNotice("Payment status updated in this temporary preview.");
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <section className="overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#93C5FD]">
              FINANCIAL MANAGEMENT
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Business Payments
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Track business expenses, vendor bills, taxes and payment
              responsibilities in one place.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]">
            <Wallet size={32} className="text-white" />
          </div>
        </div>
      </section>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />
        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> These are sample payment records.
          Marking a payment as paid only updates the temporary page state.
          No money is transferred or collected.
        </p>
      </div>

      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-3 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white">
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded-lg p-1 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
            Payment Overview
          </h2>
          <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Summary of your business payment responsibilities.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Paid",
              value: money(totalPaid),
              count: `${paidPayments.length} transactions`,
              icon: CheckCircle2,
              color: "bg-[#DCFCE7] text-[#166534]",
            },
            {
              label: "Pending Payments",
              value: money(totalPending),
              count: `${pendingPayments.length} transactions`,
              icon: Clock3,
              color: "bg-[#FEF3C7] text-[#92400E]",
            },
            {
              label: "Overdue Payments",
              value: money(totalOverdue),
              count: `${overduePayments.length} transactions`,
              icon: AlertTriangle,
              color: "bg-[#FEE2E2] text-[#991B1B]",
            },
            {
              label: "Total Outstanding",
              value: money(totalOutstanding),
              count: `${pendingPayments.length + overduePayments.length} unpaid records`,
              icon: Wallet,
              color: "bg-[#DBEAFE] text-[#1D4ED8]",
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
                  {item.count}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Status distribution */}
      <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-[#142B4A] dark:text-white">
              Payment Status Distribution
            </h2>
            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Current status of sample business payments.
            </p>
          </div>
          <span className="text-sm font-semibold text-[#142B4A] dark:text-white">
            {payments.length} records
          </span>
        </div>

        <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-[#DBEAFE]">
          {payments.length > 0 && (
            <>
              <div
                className="bg-[#16A34A]"
                style={{
                  width: `${(paidPayments.length / payments.length) * 100}%`,
                }}
              />
              <div
                className="bg-[#D6A84B]"
                style={{
                  width: `${(pendingPayments.length / payments.length) * 100}%`,
                }}
              />
              <div
                className="bg-[#DC2626]"
                style={{
                  width: `${(overduePayments.length / payments.length) * 100}%`,
                }}
              />
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          {[
            { label: "Paid", color: "bg-[#16A34A]", count: paidPayments.length },
            { label: "Pending", color: "bg-[#D6A84B]", count: pendingPayments.length },
            { label: "Overdue", color: "bg-[#DC2626]", count: overduePayments.length },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <span className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                {item.label}: {item.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Payment records */}
      <section className="overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]">
        <div className="flex flex-col justify-between gap-4 border-b border-[#D7E6F8] p-5 dark:border-[#263D60] lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[#142B4A] dark:text-white">
              Business Payment Records
            </h2>
            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              {filteredPayments.length} payment(s) displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] px-3 dark:border-[#263D60]">
              <Search size={17} className="text-[#2563EB]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search payments..."
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
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-10 rounded-xl border border-[#D7E6F8] bg-white px-3 text-sm text-[#142B4A] outline-none dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
            >
              <option value="All">All categories</option>
              <option value="Tax">Tax</option>
              <option value="Business Expense">Business Expense</option>
              <option value="Subscription">Subscription</option>
              <option value="Insurance">Insurance</option>
              <option value="Vendor">Vendor</option>
              <option value="Utilities">Utilities</option>
            </select>

            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 text-sm font-semibold text-[#142B4A] hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
            >
              <RefreshCw size={15} />
              Reset
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#EFF6FF] dark:hover:bg-[#203D65] lg:flex-row lg:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                  <Receipt size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                    {payment.title}
                  </p>
                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {payment.reference} · {payment.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#142B4A] dark:text-white">
                    {money(payment.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm text-[#142B4A] dark:text-white">
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
                  className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#263D60]"
                >
                  <Eye size={19} />
                </button>
              </div>
            </div>
          ))}

          {filteredPayments.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Receipt size={32} className="mx-auto text-[#2563EB]" />
              <p className="mt-3 font-semibold text-[#142B4A] dark:text-white">
                No payments found
              </p>
              <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Payment methods */}
      <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
        <h2 className="font-bold text-[#142B4A] dark:text-white">
          Supported Payment Methods
        </h2>
        <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
          Example methods recorded against business expenses.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
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
              title: "Other Methods",
              description: "Additional recorded methods",
              icon: Receipt,
            },
          ].map((method) => {
            const Icon = method.icon;

            return (
              <div
                key={method.title}
                className="flex items-center gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]"
              >
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                  <Icon size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
                    {method.title}
                  </p>
                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {method.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transaction details modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/70 p-4"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                  <Receipt size={22} />
                </div>
                <div>
                  <h2
                    id="payment-dialog-title"
                    className="font-bold text-[#142B4A] dark:text-white"
                  >
                    Transaction Details
                  </h2>
                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Sample business payment record
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                aria-label="Close transaction details"
                className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  Payment description
                </p>
                <p className="mt-1 font-semibold text-[#142B4A] dark:text-white">
                  {selectedPayment.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  Reference number
                </p>
                <p className="mt-1 text-sm text-[#142B4A] dark:text-white">
                  {selectedPayment.reference}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Amount
                  </p>
                  <p className="mt-1 font-bold text-[#142B4A] dark:text-white">
                    {money(selectedPayment.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedPayment.status]}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Due date
                  </p>
                  <p className="mt-1 text-sm text-[#142B4A] dark:text-white">
                    {dateLabel(selectedPayment.dueDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Payment method
                  </p>
                  <p className="mt-1 text-sm text-[#142B4A] dark:text-white">
                    {selectedPayment.method}
                  </p>
                </div>
              </div>

              {selectedPayment.paidDate && (
                <div>
                  <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Paid date
                  </p>
                  <p className="mt-1 text-sm text-[#142B4A] dark:text-white">
                    {dateLabel(selectedPayment.paidDate)}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {selectedPayment.status !== "Paid" && (
                <button
                  onClick={() => markAsPaid(selectedPayment.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-semibold !text-white hover:bg-[#2563EB]"
                >
                  <CheckCircle2 size={17} />
                  Mark as Paid
                </button>
              )}

              <button
                onClick={() => setSelectedPayment(null)}
                className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-4 py-3 text-sm font-semibold text-[#142B4A] hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
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

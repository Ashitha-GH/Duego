
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Crown,
  Wallet,
  ShieldCheck,
  Receipt,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  IndianRupee,
  FileText,
  Sparkles,
  CalendarDays,
  Landmark,
  CircleDollarSign,
  Info,
} from "lucide-react";

import {
  PLAN_DETAILS,
  type PlanType,
} from "@/lib/subscription/feature-config";

const sections = [
  {
    title: "Business Payments",
    subtitle: "Your business expenses",
    description:
      "Organize payments your business needs to make to vendors, suppliers and service providers.",
    href: "/business-payments",
    icon: Building2,
    label: "BUSINESS FINANCE",
    features: [
      "Vendor and supplier payment records",
      "Pending and overdue payment tracking",
      "GST, rent and insurance tracking",
      "UPI payment options and transaction records",
    ],
    action: "Manage Business Payments",
    accent: "blue",
    number: "01",
  },
  {
    title: "Duego Subscription",
    subtitle: "Your Duego membership",
    description:
      "Choose your Duego plan, explore features and manage your subscription and billing history.",
    href: "/subscription",
    icon: Crown,
    label: "DUEGO MEMBERSHIP",
    features: [
      "Free, Pro and Business plans",
      "Monthly subscription pricing",
      "Subscription and billing management",
      "Invoice and payment history",
    ],
    action: "Explore Subscription Plans",
    accent: "gold",
    number: "02",
  },
];

const highlights = [
  {
    icon: Receipt,
    title: "Payment Records",
    description:
      "Keep track of business payment responsibilities and transaction records.",
  },
  {
    icon: CreditCard,
    title: "Subscription Plans",
    description:
      "Explore Duego membership options and manage your subscription.",
  },
  {
    icon: TrendingUp,
    title: "Financial Overview",
    description:
      "Get a clearer picture of your payment responsibilities.",
  },
];

const planOrder: PlanType[] = ["free", "pro", "business"];

export default function PaymentsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-10">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-10">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#818CF8]/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#93C5FD]">
              <IndianRupee size={17} />
              FINANCIAL MANAGEMENT
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Payments Hub
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#DBEAFE]">
              Your central workspace for managing business payment
              obligations and Duego subscription payments.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#93C5FD]/40 bg-[#2563EB]/30 px-4 py-2 text-xs font-semibold text-white">
                Business Payments
              </span>

              <span className="rounded-full border border-[#93C5FD]/40 bg-[#2563EB]/30 px-4 py-2 text-xs font-semibold text-white">
                Duego Subscription
              </span>
            </div>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] shadow-lg md:h-24 md:w-24">
            <Wallet size={42} className="text-white" />
          </div>
        </div>
      </section>

      {/* QUICK DISTINCTION */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="flex items-start gap-4 rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
            <Building2 size={23} />
          </div>

          <div>
            <h3 className="font-bold text-[#142B4A] dark:text-white">
              Money your business pays
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              Payments owed to suppliers, vendors, landlords,
              service providers and other business parties.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="rounded-xl bg-[#FEF3C7] p-3 text-[#92400E]">
            <Crown size={23} />
          </div>

          <div>
            <h3 className="font-bold text-[#142B4A] dark:text-white">
              Money you pay Duego
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              Subscription charges for your selected Duego
              membership plan and its available features.
            </p>
          </div>
        </div>
      </section>

      {/* PAYMENT SECTIONS */}
      <section>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            PAYMENT WORKSPACE
          </p>

          <h2 className="mt-2 text-xl font-bold text-[#142B4A] dark:text-white">
            Choose a Payment Section
          </h2>

          <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Manage these two different payment responsibilities separately.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isBusiness = section.accent === "blue";

            return (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div
                  className={`h-2 ${
                    isBusiness ? "bg-[#2563EB]" : "bg-[#D6A84B]"
                  }`}
                />

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        isBusiness
                          ? "bg-[#EFF6FF] text-[#2563EB] dark:bg-[#203D65]"
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}
                    >
                      <Icon size={28} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                        isBusiness
                          ? "bg-[#DBEAFE] text-[#142B4A]"
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2563EB]">
                      {section.number}
                    </span>
                    <span className="h-px w-8 bg-[#D7E6F8] dark:bg-[#263D60]" />
                    <span className="text-xs font-semibold text-[#58708F] dark:text-[#A9BEDA]">
                      {section.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-[#142B4A] dark:text-white">
                    {section.title}
                  </h3>

                  <p className="mt-3 min-h-14 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                    {section.description}
                  </p>

                  <div className="my-6 h-px bg-[#D7E6F8] dark:bg-[#263D60]" />

                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#58708F] dark:text-[#A9BEDA]">
                    What you can manage
                  </p>

                  <div className="space-y-4">
                    {section.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-[#2563EB]"
                        />

                        <span className="text-sm leading-5 text-[#142B4A] dark:text-[#DBEAFE]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <Link
                      href={section.href}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold !text-white transition ${
                        isBusiness
                          ? "bg-[#142B4A] hover:bg-[#2563EB]"
                          : "bg-[#2563EB] hover:bg-[#142B4A]"
                      }`}
                    >
                      {section.action}
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* SUBSCRIPTION PRICING */}
      <section className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-6 dark:border-[#263D60] dark:bg-[#142B4A] md:p-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <Sparkles size={16} />
              DUEGO MEMBERSHIP
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#142B4A] dark:text-white">
              Subscription Plans
            </h2>

            <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
              Explore the three Duego membership options.
            </p>
          </div>

          <Link
            href="/subscription"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
          >
            View all plans
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {planOrder.map((plan) => {
            const details = PLAN_DETAILS[plan];

            const Icon =
              plan === "business"
                ? Crown
                : plan === "pro"
                  ? Sparkles
                  : FileText;

            return (
              <motion.div
                key={plan}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#203D65]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    {details.name}
                  </p>

                  <span
                    className="rounded-lg p-2"
                    style={{
                      backgroundColor: `${details.color}20`,
                      color: details.color,
                    }}
                  >
                    <Icon size={19} />
                  </span>
                </div>

                <p className="mt-3 text-3xl font-bold text-[#142B4A] dark:text-white">
                  ₹{details.price}
                  <span className="ml-1 text-xs font-medium text-[#58708F] dark:text-[#A9BEDA]">
                    / month
                  </span>
                </p>

                <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                  {plan === "free"
                    ? "Get started with essential Duego features."
                    : plan === "pro"
                      ? "More capabilities for growing businesses."
                      : "Expanded capabilities for businesses."}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FINANCIAL WORKSPACE FEATURES */}
      <section>
        <h2 className="text-xl font-bold text-[#142B4A] dark:text-white">
          Financial Workspace Features
        </h2>

        <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
          Keep your payment management organized in one place.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DBEAFE]">
                  <Icon size={22} className="text-[#2563EB]" />
                </div>

                <h3 className="mt-4 font-bold text-[#142B4A] dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PAYMENT FLOW EXPLANATION */}
      <section className="rounded-2xl border border-[#D7E6F8] bg-white p-6 dark:border-[#263D60] dark:bg-[#142B4A]">
        <div className="flex items-center gap-2">
          <Landmark size={21} className="text-[#2563EB]" />

          <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
            How Payments Work in Duego
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 font-bold text-[#142B4A] dark:text-white">
              <Building2 size={18} className="text-[#2563EB]" />
              Business Payments
            </p>

            <div className="mt-4 space-y-3">
              {[
                "Add a vendor or supplier payment",
                "Enter amount and payment due date",
                "Choose a supported payment method",
                "Complete payment through the provider",
                "Verify the transaction and update its status",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-bold text-[#142B4A]">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold text-[#142B4A] dark:text-white">
              <Crown size={18} className="text-[#D6A84B]" />
              Duego Subscription
            </p>

            <div className="mt-4 space-y-3">
              {[
                "Explore Free, Pro and Business plans",
                "Choose the subscription plan",
                "Proceed to the payment gateway",
                "Complete the subscription payment",
                "Verify payment and activate the plan",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-xs font-bold text-[#92400E]">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT INTEGRATION NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]">
        <ShieldCheck
          className="mt-0.5 shrink-0 text-[#2563EB]"
          size={21}
        />

        <div>
          <p className="text-sm font-bold text-[#142B4A] dark:text-white">
            Payment Integration Notice
          </p>

          <p className="mt-1 text-sm leading-6 text-[#58708F] dark:text-[#DBEAFE]">
            This page is a frontend navigation workspace. Actual
            UPI transactions, payment gateway collection, subscription
            activation and payment verification require backend
            integration. No real transactions are processed here.
          </p>
        </div>
      </div>
    </div>
  );
}

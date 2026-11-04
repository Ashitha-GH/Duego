
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
  Info,
  Sparkles,
} from "lucide-react";

const sections = [
  {
    title: "Business Payments",
    subtitle: "Your business expenses",
    description:
      "Organize payments your business needs to make to vendors, suppliers and service providers.",
    href: "/business-payments",
    icon: Building2,
    label: "Business Finance",
    accent: "business",
    features: [
      "Vendor and supplier payment records",
      "Pending and overdue payments",
      "GST, rent and insurance tracking",
      "UPI payment options and transaction records",
    ],
    action: "Manage Business Payments",
  },
  {
    title: "Duego Subscription",
    subtitle: "Your Duego membership",
    description:
      "Choose your Duego plan, explore features and manage your subscription and billing history.",
    href: "/subscription",
    icon: Crown,
    label: "Duego Plans",
    accent: "subscription",
    features: [
      "Free, Pro and Business plans",
      "Monthly subscription pricing",
      "Subscription and billing management",
      "Invoice and payment history",
    ],
    action: "Explore Subscription Plans",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Get started with Duego.",
  },
  {
    name: "Pro",
    price: "₹199",
    description: "More capabilities for growing businesses.",
  },
  {
    name: "Business",
    price: "₹299",
    description: "Expanded capabilities for businesses.",
  },
];

const highlights = [
  {
    icon: Receipt,
    title: "Payment Records",
    description: "Organize business payment responsibilities.",
  },
  {
    icon: CreditCard,
    title: "Subscription Plans",
    description: "Explore Duego membership options.",
  },
  {
    icon: TrendingUp,
    title: "Financial Overview",
    description: "Keep track of your payment responsibilities.",
  },
];

export default function PaymentsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-10">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-10">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/30 blur-3xl" />

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
              Manage your business payment obligations and Duego
              subscription from one organized financial workspace.
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

      {/* SECTION INTRO */}
      <section>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            PAYMENT WORKSPACE
          </p>

          <h2 className="mt-2 text-xl font-bold text-[#142B4A] dark:text-white">
            Choose a Payment Section
          </h2>

          <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            These two sections manage different types of payments.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div className="h-2 bg-[#2563EB]" />

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] dark:bg-[#203D65]">
                      <Icon size={28} className="text-[#2563EB]" />
                    </div>

                    <span className="rounded-full bg-[#DBEAFE] px-3 py-1.5 text-xs font-bold text-[#142B4A]">
                      {section.label}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#142B4A] dark:text-white">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-xs font-bold text-[#2563EB]">
                    {section.subtitle}
                  </p>

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
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3.5 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
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
              Explore the three planned Duego membership options.
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
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#203D65]"
            >
              <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                {plan.name}
              </p>

              <p className="mt-3 text-3xl font-bold text-[#142B4A] dark:text-white">
                {plan.price}
                <span className="ml-1 text-xs font-medium text-[#58708F] dark:text-[#A9BEDA]">
                  / month
                </span>
              </p>

              <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                {plan.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT FEATURES */}
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

      {/* IMPORTANT PAYMENT DISTINCTION */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#2563EB]" />

            <h3 className="font-bold text-[#142B4A] dark:text-white">
              Business Payment Tracking
            </h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            Business payment records represent amounts your business
            owes. Completing an actual payment requires a supported
            payment method and transaction verification.
          </p>
        </div>

        <div className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-[#2563EB]" />

            <h3 className="font-bold text-[#142B4A] dark:text-white">
              Duego Subscription Payments
            </h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            Subscription payments are amounts users pay Duego for
            their chosen plan. Actual collection and plan activation
            require payment gateway and backend verification.
          </p>
        </div>
      </section>

      {/* PREVIEW NOTICE */}
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
            This page is a frontend workspace. Payment records,
            UPI transactions, subscription collection and billing
            verification will become functional after backend and
            payment gateway integration. No real transactions are
            processed on this page.
          </p>
        </div>
      </div>
    </div>
  );
}


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
} from "lucide-react";

const sections = [
  {
    title: "Business Payments",
    description:
      "Manage vendor payments, business expenses, GST, rent, insurance and other financial obligations.",
    href: "/business-payments",
    icon: Building2,
    features: [
      "Vendor and supplier payment records",
      "Pending and overdue payments",
      "Payment status tracking",
      "Payment history and records",
    ],
    action: "Manage Business Payments",
  },
  {
    title: "Duego Subscription",
    description:
      "Choose a Duego plan, manage your subscription and review your billing information.",
    href: "/subscription",
    icon: Crown,
    features: [
      "Free, Pro and Business plans",
      "Plan comparison",
      "Subscription status",
      "Billing and invoice history",
    ],
    action: "Explore Subscription Plans",
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-8 pb-10">
      <section className="overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#93C5FD]">
              FINANCIAL MANAGEMENT
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Payments Hub
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Manage your business payment obligations and Duego subscription
              from one organized workspace.
            </p>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#2563EB]">
            <Wallet size={38} className="text-white" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#142B4A] dark:text-white">
            Choose a Payment Section
          </h2>
          <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Select what you want to manage.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-sm dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-[#EFF6FF] p-4 dark:bg-[#203D65]">
                    <Icon size={27} className="text-[#2563EB]" />
                  </div>
                  <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#142B4A]">
                    {index === 0 ? "Business Finance" : "Duego Plans"}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#142B4A] dark:text-white">
                  {section.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  {section.description}
                </p>

                <div className="mt-6 space-y-3">
                  {section.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <ShieldCheck
                        size={17}
                        className="shrink-0 text-[#2563EB]"
                      />
                      <span className="text-sm text-[#142B4A] dark:text-[#DBEAFE]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href={section.href}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#2563EB]"
                  >
                    {section.action}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Receipt,
            title: "Payment Records",
            description: "Keep business transactions organized.",
          },
          {
            icon: CreditCard,
            title: "Subscription Plans",
            description: "Choose the right Duego plan.",
          },
          {
            icon: TrendingUp,
            title: "Financial Tracking",
            description: "Monitor payment responsibilities.",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A]"
            >
              <Icon size={23} className="text-[#2563EB]" />
              <h3 className="mt-3 font-semibold text-[#142B4A] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <ShieldCheck className="mt-0.5 shrink-0 text-[#2563EB]" size={20} />
        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> Payment records and subscription
          management will use backend services and a payment gateway after
          integration. No real transactions are processed here.
        </p>
      </div>
    </div>
  );
}

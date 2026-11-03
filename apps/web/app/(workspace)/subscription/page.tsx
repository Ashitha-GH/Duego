
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Check,
  Crown,
  Zap,
  Building2,
  ShieldCheck,
  CreditCard,
  Receipt,
  ArrowLeft,
  Sparkles,
  X,
} from "lucide-react";

type PlanName = "Free" | "Pro" | "Business";

const plans = [
  {
    name: "Free" as PlanName,
    price: 0,
    description: "Get started with essential document management.",
    icon: ShieldCheck,
    features: [
      "Basic document management",
      "Limited AI document analysis",
      "Basic deadline reminders",
      "Document search",
      "Personal workspace",
    ],
  },
  {
    name: "Pro" as PlanName,
    price: 199,
    description: "More intelligence and control for growing businesses.",
    icon: Zap,
    popular: true,
    features: [
      "Everything in Free",
      "Increased AI document analysis",
      "AI risk detection",
      "Advanced deadline reminders",
      "Obligation tracking",
      "Detailed document insights",
    ],
  },
  {
    name: "Business" as PlanName,
    price: 299,
    description: "Advanced tools for teams and business operations.",
    icon: Building2,
    features: [
      "Everything in Pro",
      "Higher AI usage limits",
      "Team collaboration",
      "Advanced analytics",
      "Business reports",
      "Priority support",
    ],
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanName>("Free");
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null);
  const [notice, setNotice] = useState("");

  function choosePlan(plan: PlanName) {
    if (plan === currentPlan) {
      setNotice("You are already viewing this plan.");
      return;
    }

    setSelectedPlan(plan);
  }

  function confirmSelection() {
    if (!selectedPlan) return;

    setNotice(
      `${selectedPlan} plan selected in preview mode. Real subscription activation will be added after payment gateway integration.`
    );

    setSelectedPlan(null);
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <section className="overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#93C5FD]">
              DUEGO MEMBERSHIP
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Subscription Plans
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Choose the right Duego plan for your business. Get the tools
              you need to manage documents, obligations and AI insights.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]">
            <Crown size={32} className="text-white" />
          </div>
        </div>
      </section>

      {/* Current plan */}
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A] sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
              Current Plan
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#142B4A] dark:text-white">
              {currentPlan} Plan
            </h2>
          </div>
        </div>

        <span className="w-fit rounded-full bg-[#DCFCE7] px-4 py-2 text-xs font-bold text-[#166534]">
          Preview Account
        </span>
      </section>

      {/* Notice */}
      {notice && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white">
          <p>{notice}</p>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notice"
            className="shrink-0 rounded-lg p-1 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Plans */}
      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#142B4A] dark:text-white">
            Choose Your Plan
          </h2>
          <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Simple monthly pricing for every stage of your business.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrent = currentPlan === plan.name;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.popular
                    ? "border-[#2563EB] bg-[#EFF6FF] shadow-lg shadow-[#2563EB]/10 dark:bg-[#203D65]"
                    : "border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] px-4 py-1.5 text-xs font-bold text-white">
                    MOST POPULAR
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                    <Icon size={24} />
                  </div>

                  {isCurrent && (
                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534]">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#142B4A] dark:text-white">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-bold text-[#142B4A] dark:text-white">
                    {money(plan.price)}
                  </span>
                  <span className="mb-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                    / month
                  </span>
                </div>

                <div className="my-6 h-px bg-[#D7E6F8] dark:bg-[#263D60]" />

                <p className="mb-4 text-sm font-bold text-[#142B4A] dark:text-white">
                  What's included
                </p>

                <div className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-[#2563EB]"
                      />
                      <span className="text-sm leading-5 text-[#58708F] dark:text-[#DBEAFE]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => choosePlan(plan.name)}
                  disabled={isCurrent}
                  className={`mt-8 flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
                    isCurrent
                      ? "cursor-not-allowed bg-[#DBEAFE] text-[#142B4A]"
                      : "bg-[#142B4A] !text-white hover:bg-[#2563EB]"
                  }`}
                >
                  {isCurrent ? "Current Plan" : `Choose ${plan.name}`}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Billing information */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
          <CreditCard size={24} className="text-[#2563EB]" />
          <h3 className="mt-3 font-bold text-[#142B4A] dark:text-white">
            Billing Management
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            Manage your subscription billing, payment methods and renewal
            preferences.
          </p>
          <p className="mt-3 text-xs font-semibold text-[#2563EB]">
            Coming with backend integration
          </p>
        </div>

        {/* FIXED: Billing History card now navigates to its page */}
        <Link
          href="/billing-history"
          className="block rounded-2xl border border-[#D7E6F8] bg-white p-5 transition hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:hover:bg-[#203D65]"
        >
          <Receipt size={24} className="text-[#2563EB]" />
          <h3 className="mt-3 font-bold text-[#142B4A] dark:text-white">
            Billing History
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            View previous subscription payments, invoices and transaction
            details.
          </p>
          <p className="mt-3 text-xs font-semibold text-[#2563EB]">
            View Billing History →
          </p>
        </Link>
      </section>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />
        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> Plan selection is currently a
          demonstration. No money is collected and no subscription is
          activated. Real billing will require payment gateway and backend
          integration.
        </p>
      </div>

      {/* Back navigation */}
      <Link
        href="/payments"
        className="inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-semibold text-[#142B4A] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
      >
        <ArrowLeft size={17} />
        Back to Payments Hub
      </Link>

      {/* Plan selection confirmation */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/70 p-4"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-confirm-title"
            className="w-full max-w-md rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                <Crown size={24} />
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                aria-label="Close confirmation"
                className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
              >
                <X size={18} />
              </button>
            </div>

            <h2
              id="plan-confirm-title"
              className="mt-5 text-xl font-bold text-[#142B4A] dark:text-white"
            >
              Choose {selectedPlan} Plan?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              You selected the {selectedPlan} plan at{" "}
              <strong className="text-[#142B4A] dark:text-white">
                {money(plans.find((p) => p.name === selectedPlan)!.price)}
                /month
              </strong>
              . This is only a preview selection. No payment will be
              collected.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-4 py-3 text-sm font-semibold text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={confirmSelection}
                className="flex-1 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-semibold !text-white hover:bg-[#2563EB]"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

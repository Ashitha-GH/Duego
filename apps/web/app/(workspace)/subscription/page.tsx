
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
  ArrowRight,
  LockKeyhole,
  CircleCheck,
  Info,
  X,
  CalendarDays,
  Sparkles,
  Star,
} from "lucide-react";

import {
  PLAN_DETAILS,
  PLAN_ORDER,
  FEATURES,
  type PlanType,
} from "@/lib/subscription/feature-config";

const CURRENT_PLAN: PlanType = "free";

const PLAN_ICONS = {
  free: ShieldCheck,
  pro: Zap,
  business: Building2,
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const getPlanFeatures = (plan: PlanType) => {
  const planRank = PLAN_ORDER[plan];

  return FEATURES.filter(
    (feature) => PLAN_ORDER[feature.requiredPlan] <= planRank
  );
};

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [notice, setNotice] = useState("");

  const selectedPlanDetails = selectedPlan
    ? PLAN_DETAILS[selectedPlan]
    : null;

  const currentPlanDetails = PLAN_DETAILS[CURRENT_PLAN];

  function choosePlan(plan: PlanType) {
    setNotice("");

    if (plan === CURRENT_PLAN) {
      setNotice("You are already using the Free preview plan.");
      return;
    }

    setSelectedPlan(plan);
  }

  function confirmSelection() {
    if (!selectedPlan || !selectedPlanDetails) return;

    setNotice(
      `${selectedPlanDetails.name} plan selected in preview mode. Your current plan has not changed. Payment gateway and backend subscription integration are required before activation.`
    );

    setSelectedPlan(null);
  }

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#93C5FD]">
              <Crown size={17} />
              DUEGO MEMBERSHIP
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Subscription Plans
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Choose the right Duego membership for your business.
              Unlock more AI intelligence, business insights and
              productivity features as you grow.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] shadow-lg shadow-[#0B1D36]/30">
            <Crown size={38} className="text-white" />
          </div>
        </div>
      </section>

      {/* CURRENT PLAN */}
      <section className="overflow-hidden rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A]">
        <div className="flex flex-col justify-between gap-5 p-5 md:flex-row md:items-center md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <Sparkles size={26} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Your Current Plan
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#142B4A] dark:text-white">
                {currentPlanDetails.name} Plan
              </h2>

              <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                {money(currentPlanDetails.price)} / month
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-4 py-2 text-xs font-bold text-[#166534]">
              <CircleCheck size={15} />
              Preview Account
            </span>

            <span className="rounded-full bg-[#DBEAFE] px-4 py-2 text-xs font-bold text-[#142B4A]">
              No active payment
            </span>
          </div>
        </div>

        <div className="border-t border-[#D7E6F8] bg-white/70 px-5 py-3 dark:border-[#263D60] dark:bg-[#203D65] md:px-6">
          <p className="text-xs leading-5 text-[#58708F] dark:text-[#DBEAFE]">
            The current plan is demonstration data. Actual membership
            information will be loaded from the account and billing backend
            after integration.
          </p>
        </div>
      </section>

      {/* NOTICE */}
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
        >
          <div className="flex items-start gap-3">
            <Info size={19} className="mt-0.5 shrink-0 text-[#2563EB]" />
            <p className="leading-6">{notice}</p>
          </div>

          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notice"
            className="shrink-0 rounded-lg p-1 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#142B4A]"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}

      {/* PRICING PLANS */}
      <section>
        <div className="mb-7 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#2563EB]">
            Flexible Pricing
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#142B4A] dark:text-white md:text-3xl">
            Choose Your Plan
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            Start with essential tools and upgrade whenever your
            business needs more capabilities.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D7E6F8] bg-white px-4 py-2 text-sm font-semibold text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white">
            <CalendarDays size={16} className="text-[#2563EB]" />
            Monthly Billing
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {(Object.keys(PLAN_ORDER) as PlanType[])
            .sort((a, b) => PLAN_ORDER[a] - PLAN_ORDER[b])
            .map((planKey, index) => {
            const plan = PLAN_DETAILS[planKey];
            const Icon = PLAN_ICONS[planKey];
            const isCurrent = CURRENT_PLAN === planKey;
            const features = getPlanFeatures(planKey);

            return (
              <motion.article
                key={planKey}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  planKey === "pro"
                    ? "border-[#2563EB] bg-[#EFF6FF] shadow-xl shadow-[#2563EB]/10 dark:bg-[#203D65]"
                    : "border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]"
                }`}
              >
                {planKey === "pro" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2563EB] px-5 py-1.5 text-xs font-bold text-white shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                    <Icon size={25} />
                  </div>

                  {isCurrent && (
                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1.5 text-xs font-bold text-[#166534]">
                      CURRENT PLAN
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#142B4A] dark:text-white">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  {planKey === "free" &&
                    "Get started with essential document and deadline management."}

                  {planKey === "pro" &&
                    "Get advanced AI intelligence and better control over your work."}

                  {planKey === "business" &&
                    "Unlock advanced business insights and operational capabilities."}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-[#142B4A] dark:text-white">
                    {money(plan.price)}
                  </span>

                  <span className="mb-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                    / month
                  </span>
                </div>

                <div className="my-6 h-px bg-[#D7E6F8] dark:bg-[#263D60]" />

                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Included Features
                  </p>

                  <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-bold text-[#142B4A]">
                    {features.length} features
                  </span>
                </div>

                <div className="flex-1 space-y-4">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
                        <Check size={13} strokeWidth={3} />
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-[#142B4A] dark:text-[#DBEAFE]">
                          {feature.name}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => choosePlan(planKey)}
                  disabled={isCurrent}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                    isCurrent
                      ? "cursor-not-allowed bg-[#DBEAFE] !text-[#142B4A]"
                      : "bg-[#142B4A] !text-white hover:bg-[#2563EB]"
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <CircleCheck size={17} />
                      Current Plan
                    </>
                  ) : (
                    <>
                      Choose {plan.name}
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </motion.article>
            );
            })}
        </div>
      </section>

      {/* FEATURE ACCESS OVERVIEW */}
      <section className="rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A] md:p-6">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <Star size={20} className="text-[#D6A84B]" />
            <h2 className="text-xl font-bold text-[#142B4A] dark:text-white">
              Feature Access Overview
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            See which membership unlocks each Duego capability.
            Feature access follows the shared subscription configuration.
          </p>
        </div>

        <div className="space-y-3">
          {FEATURES.map((feature) => {
            const requiredPlan = PLAN_DETAILS[feature.requiredPlan];

            return (
              <div
                key={feature.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65] sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-bold text-[#142B4A] dark:text-white">
                    {feature.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    {feature.description}
                  </p>
                </div>

                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-[#142B4A] dark:bg-[#142B4A] dark:text-white">
                  <LockKeyhole size={13} className="text-[#2563EB]" />
                  {requiredPlan.name} Plan
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* BILLING MANAGEMENT */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#142B4A] dark:text-white">
            Billing Management
          </h2>

          <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Access subscription billing information and payment records.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-[#D7E6F8] bg-white p-6 dark:border-[#263D60] dark:bg-[#142B4A]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <CreditCard size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#142B4A] dark:text-white">
              Payment & Renewal
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              Manage subscription payment methods, renewal preferences
              and billing status.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#EFF6FF] p-3 text-xs font-semibold text-[#142B4A] dark:bg-[#203D65] dark:text-[#DBEAFE]">
              <LockKeyhole size={16} className="shrink-0 text-[#2563EB]" />
              Available after backend integration
            </div>
          </div>

          <Link
            href="/billing-history"
            className="group rounded-2xl border border-[#D7E6F8] bg-white p-6 transition hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:hover:bg-[#203D65]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <Receipt size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#142B4A] dark:text-white">
              Billing History
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              View subscription records, invoices, transaction references
              and payment statuses.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#2563EB]">
              View Billing History
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* SECURITY INFORMATION */}
      <section className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A] md:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck size={23} className="mt-0.5 shrink-0 text-[#2563EB]" />

          <div>
            <h3 className="font-bold text-[#142B4A] dark:text-white">
              Secure Subscription Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#DBEAFE]">
              Subscription activation, renewals, cancellations and failed
              payments must be verified by the backend. Duego will not
              activate a paid plan simply because a browser reports
              that a payment was successful.
            </p>
          </div>
        </div>
      </section>

      {/* PREVIEW MODE */}
      <section className="rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#203D65]">
        <div className="flex items-start gap-3">
          <Info size={21} className="mt-0.5 shrink-0 text-[#2563EB]" />

          <div>
            <p className="font-bold text-[#142B4A] dark:text-white">
              Subscription Preview Mode
            </p>

            <p className="mt-1 text-sm leading-6 text-[#58708F] dark:text-[#DBEAFE]">
              Plans and selection are currently demonstrations.
              No payment is collected, no paid subscription is activated,
              and no renewal is scheduled. These actions will become
              functional after backend and payment gateway integration.
            </p>
          </div>
        </div>
      </section>

      {/* BACK TO PAYMENTS */}
      <Link
        href="/payments"
        className="inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-bold text-[#142B4A] transition hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
      >
        <ArrowLeft size={17} />
        Back to Payments Hub
      </Link>

      {/* PLAN CONFIRMATION MODAL */}
      {selectedPlan && selectedPlanDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142B4A]/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPlan(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-confirm-title"
            className="w-full max-w-md rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                <Crown size={25} />
              </div>

              <button
                onClick={() => setSelectedPlan(null)}
                aria-label="Close confirmation"
                className="rounded-lg p-2 text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#203D65]"
              >
                <X size={19} />
              </button>
            </div>

            <h2
              id="plan-confirm-title"
              className="mt-5 text-xl font-bold text-[#142B4A] dark:text-white"
            >
              Choose {selectedPlanDetails.name} Plan?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              You selected the{" "}
              <strong className="text-[#142B4A] dark:text-white">
                {selectedPlanDetails.name}
              </strong>{" "}
              plan at{" "}
              <strong className="text-[#142B4A] dark:text-white">
                {money(selectedPlanDetails.price)} / month
              </strong>
              .
            </p>

            <div className="mt-5 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]">
              <div className="flex items-start gap-3">
                <Info size={19} className="mt-0.5 shrink-0 text-[#2563EB]" />

                <p className="text-xs leading-5 text-[#142B4A] dark:text-[#DBEAFE]">
                  This is a preview selection only. No payment will be
                  collected and your current plan will not change.
                </p>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-4 py-3 text-sm font-bold text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={confirmSelection}
                className="flex-1 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
              >
                Confirm Selection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

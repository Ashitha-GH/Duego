
"use client";

import { motion } from "motion/react";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Crown,
} from "lucide-react";

const freeFeatures = [
  "Limited document storage",
  "Basic document management",
  "Manual deadline tracking",
  "Basic dashboard",
  "Standard support",
];

const premiumFeatures = [
  "Extended document storage",
  "AI-powered document analysis",
  "Automatic deadline extraction",
  "Smart payment obligation tracking",
  "Advanced risk insights",
  "Automated reminders",
  "Complete analytics dashboard",
  "Priority support",
];

const plans = [
  {
    name: "Free",
    description: "For getting started with Duego.",
    price: "₹0",
    period: "forever",
    icon: ShieldCheck,
    features: freeFeatures,
    button: "Get started free",
    href: "/register",
    featured: false,
    label: "START HERE",
  },
  {
    name: "Pro",
    description: "For growing businesses that need more control.",
    price: "₹199",
    period: "month",
    icon: Zap,
    features: premiumFeatures,
    button: "Explore Pro",
    href: "/register",
    featured: true,
    label: "MOST POPULAR",
  },
  {
    name: "Business",
    description: "For businesses choosing the higher-tier plan.",
    price: "₹299",
    period: "month",
    icon: Building2,
    features: premiumFeatures,
    button: "Explore Business",
    href: "/register",
    featured: false,
    label: "BUSINESS PLAN",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-[#D7E6F8] bg-[#EFF6FF] py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#818CF8]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white px-4 py-2 text-sm font-bold text-[#2563EB] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-[#93C5FD]">
            <Sparkles size={16} />
            Simple and flexible plans
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#142B4A] dark:text-white sm:text-4xl md:text-5xl">
            Choose the right plan
            <span className="block text-[#2563EB]">
              for your business.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#58708F] dark:text-[#A9BEDA] md:text-lg">
            Start with the essentials and unlock more powerful document
            intelligence as your business grows.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-semibold text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white">
            <Crown size={18} className="text-[#D6A84B]" />
            Transparent monthly pricing
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-7 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                }}
                className={`relative flex flex-col rounded-3xl border bg-white p-7 shadow-xl shadow-[#142B4A]/5 dark:bg-[#142B4A] md:p-8 ${
                  plan.featured
                    ? "border-2 border-[#2563EB] shadow-[#2563EB]/10 lg:-translate-y-3"
                    : "border-[#D7E6F8] dark:border-[#263D60]"
                }`}
              >
                {/* Plan label */}
                <div className="mb-7 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide ${
                      plan.featured
                        ? "bg-[#2563EB] !text-white"
                        : "bg-[#DBEAFE] text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]"
                    }`}
                  >
                    {plan.label}
                  </span>

                  <div
                    className={`rounded-xl p-3 ${
                      plan.featured
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#DBEAFE] text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-extrabold text-[#142B4A] dark:text-white">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-7 border-b border-[#D7E6F8] pb-7 dark:border-[#263D60]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-[#142B4A] dark:text-white md:text-5xl">
                      {plan.price}
                    </span>

                    <span className="text-sm font-medium text-[#58708F] dark:text-[#A9BEDA]">
                      / {plan.period}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    {plan.name === "Free"
                      ? "No subscription payment required."
                      : "Billed monthly. Payment integration subject to availability."}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={plan.href}
                  className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                    plan.featured
                      ? "bg-[#2563EB] !text-white shadow-lg shadow-[#2563EB]/20 hover:bg-[#1D4ED8]"
                      : "border border-[#BFDBFE] bg-[#EFF6FF] text-[#142B4A] hover:border-[#2563EB] hover:bg-[#DBEAFE] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-white dark:hover:bg-[#263D60]"
                  }`}
                >
                  {plan.button}
                  <ArrowRight size={17} />
                </a>

                {/* Features */}
                <div className="mt-8 flex-1">
                  <p className="mb-5 text-sm font-extrabold text-[#142B4A] dark:text-white">
                    {plan.name === "Free"
                      ? "What's included"
                      : "Included features"}
                  </p>

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                          <Check size={13} strokeWidth={3} />
                        </div>

                        <span className="text-sm leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom information */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#D7E6F8] bg-white p-6 text-center dark:border-[#263D60] dark:bg-[#142B4A]"
        >
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck
              size={20}
              className="text-[#2563EB] dark:text-[#93C5FD]"
            />
            <h3 className="font-bold text-[#142B4A] dark:text-white">
              Simple and secure subscription management
            </h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            Manage your Duego subscription and view your billing history
            from your account dashboard. Actual plan activation and payment
            confirmation require backend integration.
          </p>

          <a
            href="/subscription"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#1D4ED8] dark:text-[#93C5FD]"
          >
            View subscription plans
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <p className="mt-8 text-center text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
          Plan features and storage limits are proposed and should be
          confirmed before launch. Prices shown are the selected monthly
          plan prices.
        </p>
      </div>
    </section>
  );
}

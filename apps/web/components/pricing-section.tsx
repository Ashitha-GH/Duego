
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
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

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const premiumPrice = billing === "monthly" ? "TBD" : "TBD";

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-border bg-surface-secondary py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Simple and flexible plans
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Choose the right plan
            <span className="text-primary"> for your business.</span>
          </h2>

          <p className="mt-5 leading-7 text-muted">
            Start with the essentials and unlock more powerful document
            intelligence as your business grows.
          </p>

          <div className="mt-8 inline-flex rounded-xl border border-border bg-surface p-1.5">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                billing === "monthly"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                billing === "yearly"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs">Save more</span>
            </button>
          </div>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-7 md:grid-cols-2">
          {/* Free plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-surface p-8 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="mt-2 text-sm text-muted">
                  For getting started with Duego.
                </p>
              </div>

              <div className="rounded-xl bg-surface-secondary p-3 text-muted">
                <ShieldCheck size={23} />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">₹0</span>
                <span className="text-sm text-muted">/ forever</span>
              </div>
              <p className="mt-2 text-xs text-muted">
                No subscription required.
              </p>
            </div>

            <a
              href="/register"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-3.5 font-semibold transition-all hover:border-primary hover:bg-primary/5"
            >
              Get started free
              <ArrowRight size={17} />
            </a>

            <div className="mt-9 border-t border-border pt-7">
              <p className="mb-5 text-sm font-bold">What&apos;s included</p>

              <div className="space-y-4">
                {freeFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-success" />
                    <span className="text-sm text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Premium plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative rounded-3xl border-2 border-primary bg-surface p-8 shadow-xl shadow-primary/10"
          >
            <div className="absolute -top-4 left-8 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
              POWERFUL FEATURES
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Premium</h3>
                <p className="mt-2 text-sm text-muted">
                  For businesses that need more control.
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Zap size={23} />
              </div>
            </div>

            <div className="mt-8">
              <motion.div
                key={billing}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-5xl font-bold">{premiumPrice}</span>
                <span className="text-sm text-muted">
                  / {billing === "monthly" ? "month" : "year"}
                </span>
              </motion.div>

              <p className="mt-2 text-xs text-muted">
                Premium pricing will be announced soon.
              </p>
            </div>

            <a
              href="/register"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-primary-hover"
            >
              Explore Premium
              <ArrowRight size={17} />
            </a>

            <div className="mt-9 border-t border-border pt-7">
              <p className="mb-5 text-sm font-bold">Everything in Free, plus</p>

              <div className="space-y-4">
                {premiumFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-9 text-center text-xs text-muted">
          Plan features and limits are proposed for the homepage and must be
          confirmed before launch.
        </p>
      </div>
    </section>
  );
}

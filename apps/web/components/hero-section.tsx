
"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Documents managed", value: "2,480", icon: FileText },
  { label: "Deadlines monitored", value: "186", icon: CalendarDays },
  { label: "Risks identified", value: "24", icon: ShieldAlert },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-blue-400/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pb-32 lg:pt-28">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            AI-powered business intelligence
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl xl:text-7xl">
            Your business documents.
            <span className="mt-2 block text-primary">
              Under control.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            Turn complex business documents into clear insights, track
            important obligations, and stay ahead of every deadline with Duego.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-primary-hover"
            >
              Get started free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-7 py-4 font-semibold transition-all hover:-translate-y-1 hover:border-primary"
            >
              Explore features
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-success" />
              Smart document insights
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-success" />
              Deadline monitoring
            </span>
          </div>
        </motion.div>

        {/* Animated dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />

          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-black/10">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-sm font-bold">Duego Overview</p>
                <p className="mt-1 text-xs text-muted">Interactive product preview</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles size={20} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.15 }}
                  className="rounded-2xl border border-border bg-surface-secondary p-3 sm:p-4"
                >
                  <stat.icon size={18} className="text-primary" />
                  <p className="mt-3 text-xl font-bold sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-muted sm:text-xs">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="px-5 pb-5">
              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Recent document activity</p>
                  <span className="text-xs text-primary">Preview</span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      Vendor Agreement.pdf
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      AI analysis preview
                    </p>
                  </div>
                  <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    Reviewed
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-warning/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-warning">
                    <CalendarDays size={17} />
                    Upcoming obligation
                  </div>
                  <p className="mt-2 text-sm font-medium">
                    Agreement renewal review
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Sample deadline · 15 December 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating reminder */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-12 hidden items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-xl sm:flex md:-right-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Bell size={19} />
            </div>
            <div>
              <p className="text-xs font-bold">Deadline reminder</p>
              <p className="mt-1 text-xs text-muted">Action required soon</p>
            </div>
          </motion.div>

          {/* Floating AI badge */}
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl sm:flex md:-left-8"
          >
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-semibold">AI insights ready</span>
          </motion.div>

          <p className="mt-8 text-center text-xs text-muted">
            Illustrative dashboard · Sample data, not live account information
          </p>
        </motion.div>
      </div>
    </section>
  );
}

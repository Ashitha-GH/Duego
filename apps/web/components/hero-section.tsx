
"use client";

import Link from "next/link";
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
  BrainCircuit,
} from "lucide-react";

const stats = [
  { label: "Documents managed", value: "2,480", icon: FileText },
  { label: "Deadlines monitored", value: "186", icon: CalendarDays },
  { label: "Risks identified", value: "24", icon: ShieldAlert },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-[#0B1930]">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-[#818CF8]/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pb-32 lg:pt-28">

        {/* LEFT HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D7E6F8] bg-[#EFF6FF] px-4 py-2 text-sm font-bold text-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65]">
            <Sparkles size={16} />
            AI-powered business intelligence
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight text-[#142B4A] dark:text-white md:text-6xl xl:text-7xl">
            Your business documents.
            <span className="mt-2 block text-[#2563EB]">
              Under control.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#58708F] dark:text-[#A9BEDA]">
            Turn complex business documents into clear insights, track
            important obligations, and stay ahead of every deadline with Duego.
          </p>

          {/* HERO BUTTONS */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#142B4A] px-7 py-4 font-bold text-white shadow-lg shadow-[#142B4A]/20 transition-all hover:-translate-y-1 hover:bg-[#2563EB]"
            >
              Get Started Free
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-7 py-4 font-bold text-[#142B4A] transition-all hover:-translate-y-1 hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
            >
              Explore Features
              <ArrowUpRight size={18} className="text-[#2563EB]" />
            </a>
          </div>

          {/* BENEFITS */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#58708F] dark:text-[#A9BEDA]">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#2563EB]" />
              Smart document insights
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#2563EB]" />
              Deadline monitoring
            </span>
          </div>
        </motion.div>

        {/* RIGHT DASHBOARD PREVIEW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-[#2563EB]/10 blur-2xl" />

          <div className="overflow-hidden rounded-3xl border border-[#D7E6F8] bg-white shadow-2xl shadow-[#142B4A]/10 dark:border-[#263D60] dark:bg-[#142B4A]">

            {/* DASHBOARD HEADER */}
            <div className="flex items-center justify-between border-b border-[#D7E6F8] px-6 py-5 dark:border-[#263D60]">
              <div>
                <p className="text-sm font-extrabold text-[#142B4A] dark:text-white">
                  Duego Overview
                </p>

                <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  Illustrative dashboard preview
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] dark:bg-[#203D65]">
                <Sparkles size={20} />
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-3 gap-3 p-5">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + index * 0.15 }}
                    className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-3 dark:border-[#263D60] dark:bg-[#203D65] sm:p-4"
                  >
                    <Icon size={18} className="text-[#2563EB]" />

                    <p className="mt-3 text-xl font-extrabold text-[#142B4A] dark:text-white sm:text-2xl">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-[#58708F] dark:text-[#A9BEDA] sm:text-xs">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* DOCUMENT ACTIVITY */}
            <div className="px-5 pb-5">
              <div className="rounded-2xl border border-[#D7E6F8] p-5 dark:border-[#263D60]">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-[#142B4A] dark:text-white">
                    Recent Document Activity
                  </p>

                  <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#2563EB] dark:bg-[#203D65]">
                    Sample
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] dark:bg-[#203D65]">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#142B4A] dark:text-white">
                      Vendor Agreement.pdf
                    </p>

                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      AI analysis preview
                    </p>
                  </div>

                  <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534]">
                    Reviewed
                  </span>
                </div>

                {/* UPCOMING OBLIGATION */}
                <div className="mt-5 rounded-xl border border-[#D6A84B]/30 bg-[#D6A84B]/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#8A641F] dark:text-[#F5D58A]">
                    <CalendarDays size={17} />
                    Upcoming Obligation
                  </div>

                  <p className="mt-2 text-sm font-bold text-[#142B4A] dark:text-white">
                    Agreement renewal review
                  </p>

                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Sample deadline · 15 December 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING REMINDER */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-12 hidden items-center gap-3 rounded-2xl border border-[#D7E6F8] bg-white p-4 shadow-xl sm:flex md:-right-8 dark:border-[#263D60] dark:bg-[#142B4A]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6A84B]/15 text-[#A87918] dark:text-[#F5D58A]">
              <Bell size={19} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#142B4A] dark:text-white">
                Deadline Reminder
              </p>

              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Action required soon
              </p>
            </div>
          </motion.div>

          {/* FLOATING AI BADGE */}
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-2xl border border-[#D7E6F8] bg-white px-4 py-3 shadow-xl sm:flex md:-left-8 dark:border-[#263D60] dark:bg-[#142B4A]"
          >
            <BrainCircuit size={18} className="text-[#2563EB]" />

            <span className="text-sm font-bold text-[#142B4A] dark:text-white">
              AI Insights Ready
            </span>
          </motion.div>

          <p className="mt-8 text-center text-xs text-[#58708F] dark:text-[#A9BEDA]">
            Illustrative dashboard · Sample data, not live account information
          </p>
        </motion.div>
      </div>
    </section>
  );
}

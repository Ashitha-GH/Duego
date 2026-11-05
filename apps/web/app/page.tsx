
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import HeroSection from "@/components/hero-section";
import DeadlineSection from "@/components/deadline-section";
import PricingSection from "@/components/pricing-section";

import {
  FileText,
  BrainCircuit,
  CalendarCheck,
  BellRing,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Building2,
  Wallet,
  Crown,
  AlertTriangle,
  Clock3,
  ScanSearch,
  Activity,
  FileCheck,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Document Management",
    description:
      "Keep your business documents organized and accessible in one workspace.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Analysis",
    description:
      "Identify important information, obligations, risks and key details with AI.",
  },
  {
    icon: CalendarCheck,
    title: "Deadline Intelligence",
    description:
      "Turn dates and commitments hidden in documents into actionable tasks.",
  },
  {
    icon: BellRing,
    title: "Intelligent Reminders",
    description:
      "Stay informed about upcoming deadlines and important business actions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Organize",
    description:
      "Keep your business documents together in your Duego workspace.",
  },
  {
    number: "02",
    title: "Analyse",
    description:
      "AI helps identify important information, risks and obligations.",
  },
  {
    number: "03",
    title: "Review",
    description:
      "Review extracted information and understand your responsibilities.",
  },
  {
    number: "04",
    title: "Stay Ahead",
    description:
      "Monitor deadlines, reminders and important business activities.",
  },
];

const highlights = [
  "Organize business documents",
  "Identify important obligations",
  "Track upcoming deadlines",
  "Manage reminders and payments",
];

const analysisItems = [
  {
    label: "Key information",
    detail: "Important terms and details",
    icon: ScanSearch,
    color: "text-[#2563EB]",
    background: "bg-[#DBEAFE]",
  },
  {
    label: "Risk detection",
    detail: "Potential issues highlighted",
    icon: AlertTriangle,
    color: "text-[#B7791F]",
    background: "bg-[#FEF3C7]",
  },
  {
    label: "Obligations",
    detail: "Responsibilities identified",
    icon: FileCheck,
    color: "text-[#2563EB]",
    background: "bg-[#DBEAFE]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#142B4A] dark:bg-[#0B1930] dark:text-white">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-[#D7E6F8] bg-white/95 backdrop-blur-xl dark:border-[#263D60] dark:bg-[#0B1930]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#142B4A] text-lg font-extrabold text-white shadow-lg dark:bg-[#2563EB]">
              D
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-[#142B4A] dark:text-white">
              Duego
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#58708F] lg:flex">
            <a href="#features" className="transition hover:text-[#2563EB]">
              Features
            </a>
            <a href="#ai-intelligence" className="transition hover:text-[#2563EB]">
              AI Intelligence
            </a>
            <a href="#deadlines" className="transition hover:text-[#2563EB]">
              Deadlines
            </a>
            <a href="#how-it-works" className="transition hover:text-[#2563EB]">
              How It Works
            </a>
            <a href="#pricing" className="transition hover:text-[#2563EB]">
              Pricing
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-[#142B4A] transition hover:bg-[#EFF6FF] dark:text-white dark:hover:bg-[#203D65] sm:inline-flex"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-[#142B4A] px-4 py-2.5 text-sm font-bold !text-white shadow-md transition hover:bg-[#2563EB]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <HeroSection />

      {/* FEATURES */}
      <section
        id="features"
        className="scroll-mt-24 border-t border-[#D7E6F8] bg-[#EFF6FF] py-20 dark:border-[#263D60] dark:bg-[#10213B] md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E6F8] bg-white px-4 py-2 text-sm font-bold text-[#2563EB] dark:border-[#263D60] dark:bg-[#142B4A]">
              <Sparkles size={16} />
              Everything in One Workspace
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#142B4A] dark:text-white md:text-5xl">
              One Platform.
              <span className="block text-[#2563EB]">
                Complete Clarity.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#58708F] dark:text-[#A9BEDA]">
              Duego brings document intelligence, business obligations,
              deadlines and reminders together in one connected experience.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.55,
                  }}
                  whileHover={{ y: -9, scale: 1.02 }}
                  className="group rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-sm transition duration-300 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10 dark:border-[#263D60] dark:bg-[#142B4A]"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.12 }}
                    className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white"
                  >
                    <Icon size={24} />
                  </motion.div>

                  <h3 className="mt-6 text-base font-extrabold text-[#142B4A] dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                    <span>Explore capability</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ANIMATED AI INTELLIGENCE SHOWCASE */}
      <section
        id="ai-intelligence"
        className="relative scroll-mt-24 overflow-hidden border-t border-[#D7E6F8] bg-white py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-28"
      >
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#818CF8]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E6F8] bg-[#EFF6FF] px-4 py-2 text-sm font-bold text-[#2563EB] dark:border-[#263D60] dark:bg-[#142B4A]">
              <BrainCircuit size={17} />
              AI DOCUMENT INTELLIGENCE
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight text-[#142B4A] dark:text-white md:text-5xl">
              Your Documents.
              <span className="block text-[#2563EB]">
                More Intelligent.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#58708F] dark:text-[#A9BEDA]">
              Business documents contain important information that
              is easy to overlook. Duego helps turn that information
              into useful insights, obligations and important dates.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Identify important document information",
                "Highlight potential risks and obligations",
                "Recognize dates and business responsibilities",
                "Keep important information organized",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB] dark:bg-[#203D65]">
                    <CheckCircle2 size={17} />
                  </div>

                  <span className="text-sm font-semibold text-[#142B4A] dark:text-[#DBEAFE]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/register"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-6 py-3.5 text-sm font-bold !text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#2563EB]"
            >
              Explore Duego
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* RIGHT ANIMATED VISUAL */}
          <div className="relative mx-auto w-full max-w-xl">

            {/* BACKGROUND DECORATION */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#93C5FD]/60"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 75,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DBEAFE] dark:border-[#263D60]"
            />

            {/* MAIN ANALYSIS PANEL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10 rounded-3xl border border-[#D7E6F8] bg-white p-5 shadow-2xl shadow-[#2563EB]/10 dark:border-[#35547B] dark:bg-[#142B4A] sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                    <BrainCircuit size={23} />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#142B4A] dark:text-white">
                      AI Intelligence
                    </h3>
                    <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      Document insights preview
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#DCFCE7] px-3 py-1.5 text-xs font-bold text-[#166534]">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#16A34A]" />
                  Preview
                </span>
              </div>

              {/* DOCUMENT PREVIEW */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-7 rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#35547B] dark:bg-[#203D65]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-sm dark:bg-[#142B4A]">
                    <FileText size={25} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#142B4A] dark:text-white">
                      Business_Agreement.pdf
                    </p>
                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      Example document preview
                    </p>
                  </div>

                  <FileCheck size={21} className="text-[#2563EB]" />
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="h-2 w-full rounded-full bg-[#DBEAFE] dark:bg-[#35547B]" />
                  <div className="h-2 w-5/6 rounded-full bg-[#DBEAFE] dark:bg-[#35547B]" />
                  <div className="h-2 w-4/6 rounded-full bg-[#DBEAFE] dark:bg-[#35547B]" />
                  <div className="h-2 w-3/4 rounded-full bg-[#DBEAFE] dark:bg-[#35547B]" />
                </div>
              </motion.div>

              {/* ANALYSIS PROGRESS */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                  Intelligence overview
                </p>
                <Sparkles size={17} className="text-[#D6A84B]" />
              </div>

              <div className="mt-4 space-y-3">
                {analysisItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + index * 0.15 }}
                      className="flex items-center gap-3 rounded-xl border border-[#D7E6F8] bg-white p-3 dark:border-[#35547B] dark:bg-[#102440]"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.background} ${item.color}`}>
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                          {item.detail}
                        </p>
                      </div>

                      <CheckCircle2 size={18} className="shrink-0 text-[#2563EB]" />
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#EFF6FF] p-3 text-xs font-semibold text-[#2563EB] dark:bg-[#203D65] dark:text-[#DBEAFE]">
                <Activity size={16} />
                Example of Duego&apos;s document intelligence experience
              </div>
            </motion.div>

            {/* FLOATING DEADLINE CARD */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-5 top-16 z-20 hidden w-48 rounded-2xl border border-[#D7E6F8] bg-white p-4 shadow-xl dark:border-[#35547B] dark:bg-[#203D65] sm:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#2563EB]">
                  <Clock3 size={19} />
                </div>
                <span className="text-xs font-bold text-[#142B4A] dark:text-white">
                  Deadline alert
                </span>
              </div>

              <p className="mt-3 text-sm font-extrabold text-[#142B4A] dark:text-white">
                Important date
              </p>
              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Stay ahead of responsibilities
              </p>
            </motion.div>

            {/* FLOATING RISK CARD */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -1.5, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-5 bottom-14 z-20 hidden w-48 rounded-2xl border border-[#D7E6F8] bg-white p-4 shadow-xl dark:border-[#35547B] dark:bg-[#203D65] sm:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#B7791F]">
                  <AlertTriangle size={19} />
                </div>
                <span className="text-xs font-bold text-[#142B4A] dark:text-white">
                  Risk awareness
                </span>
              </div>

              <p className="mt-3 text-sm font-extrabold text-[#142B4A] dark:text-white">
                Review important terms
              </p>
              <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Identify potential concerns
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DEADLINES */}
      <section id="deadlines" className="scroll-mt-24">
        <DeadlineSection />
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-[#D7E6F8] bg-white py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DBEAFE] px-4 py-2 text-sm font-bold text-[#2563EB] dark:bg-[#203D65]">
              <ShieldCheck size={16} />
              A Simple Workflow
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#142B4A] dark:text-white md:text-5xl">
              From Documents to
              <span className="block text-[#2563EB]">
                Decisions.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-[#58708F] dark:text-[#A9BEDA]">
              Four simple stages to help keep your important business
              information organized and actionable.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                whileHover={{ y: -7 }}
                className="relative rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-6 dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold tracking-tight text-[#2563EB]">
                    {step.number}
                  </span>

                  {index !== steps.length - 1 && (
                    <ArrowRight size={21} className="hidden text-[#2563EB] lg:block" />
                  )}
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-[#142B4A] dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS MANAGEMENT */}
      <section className="border-t border-[#D7E6F8] bg-[#EFF6FF] py-20 dark:border-[#263D60] dark:bg-[#10213B]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2563EB] dark:bg-[#142B4A]">
              <Building2 size={16} />
              Business Workspace
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#142B4A] dark:text-white md:text-4xl">
              More than document storage.
              <span className="block text-[#2563EB]">
                A smarter way to manage business responsibilities.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-[#58708F] dark:text-[#A9BEDA]">
              Duego connects document information with obligations,
              deadlines, reminders and payment records to help you
              organize your business activities.
            </p>

            <div className="mt-7 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={19} className="shrink-0 text-[#2563EB]" />
                  <span className="text-sm font-semibold text-[#142B4A] dark:text-[#DBEAFE]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-6 py-3.5 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-[#142B4A] p-6 text-white shadow-lg sm:translate-y-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
                <FileText size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold">Documents</h3>
              <p className="mt-2 text-sm leading-6 text-[#DBEAFE]">
                Organize important business files and information.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-[#D7E6F8] bg-white p-6 dark:border-[#263D60] dark:bg-[#142B4A]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                <CalendarCheck size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#142B4A] dark:text-white">
                Deadlines
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Monitor important dates and responsibilities.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-[#D7E6F8] bg-white p-6 dark:border-[#263D60] dark:bg-[#142B4A]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                <Wallet size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#142B4A] dark:text-white">
                Payments
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Track business payment responsibilities.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-[#2563EB] p-6 text-white shadow-lg sm:translate-y-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#142B4A]">
                <Crown size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold">AI Insights</h3>
              <p className="mt-2 text-sm leading-6 text-[#DBEAFE]">
                Understand important information through AI analysis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-24">
        <PricingSection />
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="border-t border-[#D7E6F8] bg-white px-6 py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#142B4A] px-6 py-16 text-center text-white shadow-2xl sm:px-12 md:py-20">
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]"
          >
            <Sparkles size={28} className="text-white" />
          </motion.div>

          <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Make Every Business Document Count.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#DBEAFE] md:text-base">
            Bring your documents, obligations and important deadlines
            together with Duego.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#142B4A",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-extrabold !text-[#142B4A] transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              Get Started with Duego
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-[#93C5FD] px-7 py-4 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
            >
              Already a Member? Log In
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D7E6F8] bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#10213B]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-10 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-[#142B4A] dark:text-white"
            >
              Duego
            </Link>

            <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
              Smarter business document management.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-semibold text-[#58708F] dark:text-[#A9BEDA]">
            <a href="#features" className="transition hover:text-[#2563EB]">
              Features
            </a>
            <a href="#ai-intelligence" className="transition hover:text-[#2563EB]">
              AI Intelligence
            </a>
            <a href="#deadlines" className="transition hover:text-[#2563EB]">
              Deadlines
            </a>
            <a href="#pricing" className="transition hover:text-[#2563EB]">
              Pricing
            </a>
            <Link href="/login" className="transition hover:text-[#2563EB]">
              Login
            </Link>
          </div>

          <p className="text-sm text-[#58708F] dark:text-[#A9BEDA]">
            © 2026 Duego. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

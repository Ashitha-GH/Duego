
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import HeroSection from "@/components/hero-section";
import DocumentWorkspace from "@/components/document-workspace";
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
      "Extract important information, obligations, risks and key details from documents.",
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
    title: "Upload",
    description: "Add your business documents to your Duego workspace.",
  },
  {
    number: "02",
    title: "Analyse",
    description: "AI helps identify important information and obligations.",
  },
  {
    number: "03",
    title: "Review",
    description: "Check and confirm the information extracted from documents.",
  },
  {
    number: "04",
    title: "Stay Ahead",
    description: "Monitor deadlines and manage your upcoming responsibilities.",
  },
];

const highlights = [
  "Organize business documents",
  "Identify important obligations",
  "Track upcoming deadlines",
  "Manage reminders and payments",
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
            <a href="#features" className="transition hover:text-[#2563EB]">Features</a>
            <a href="#upload" className="transition hover:text-[#2563EB]">AI Analysis</a>
            <a href="#deadlines" className="transition hover:text-[#2563EB]">Deadlines</a>
            <a href="#how-it-works" className="transition hover:text-[#2563EB]">How It Works</a>
            <a href="#pricing" className="transition hover:text-[#2563EB]">Pricing</a>
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
        className="border-t border-[#D7E6F8] bg-[#EFF6FF] py-20 dark:border-[#263D60] dark:bg-[#10213B] md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
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
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  className="group rounded-2xl border border-[#D7E6F8] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10 dark:border-[#263D60] dark:bg-[#142B4A]"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 text-base font-extrabold text-[#142B4A] dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCUMENT WORKSPACE */}
      <section id="upload" className="scroll-mt-24">
        <DocumentWorkspace />
      </section>

      {/* DEADLINES */}
      <section id="deadlines" className="scroll-mt-24">
        <DeadlineSection />
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-t border-[#D7E6F8] bg-white py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-24"
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
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
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
            <div className="rounded-2xl bg-[#142B4A] p-6 text-white shadow-lg sm:translate-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
                <FileText size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold">Documents</h3>
              <p className="mt-2 text-sm leading-6 text-[#DBEAFE]">
                Organize important business files and information.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D7E6F8] bg-white p-6 dark:border-[#263D60] dark:bg-[#142B4A]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                <CalendarCheck size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#142B4A] dark:text-white">
                Deadlines
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Monitor important dates and responsibilities.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D7E6F8] bg-white p-6 dark:border-[#263D60] dark:bg-[#142B4A]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                <Wallet size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#142B4A] dark:text-white">
                Payments
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Track business payment responsibilities.
              </p>
            </div>

            <div className="rounded-2xl bg-[#2563EB] p-6 text-white shadow-lg sm:translate-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#142B4A]">
                <Crown size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold">AI Insights</h3>
              <p className="mt-2 text-sm leading-6 text-[#DBEAFE]">
                Understand important information through AI analysis.
              </p>
            </div>
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

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]">
            <Sparkles size={28} className="text-white" />
          </div>

          <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Make Every Business Document Count.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#DBEAFE] md:text-base">
            Bring your documents, obligations and important deadlines
            together with Duego.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

            {/* GET STARTED — FORCED NAVY TEXT */}
            <Link
              href="/register"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#142B4A",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-extrabold !text-[#142B4A] transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                style={{ color: "#142B4A" }}
                className="!text-[#142B4A]"
              >
                Get Started with Duego
              </span>

              <ArrowRight
                size={18}
                style={{ color: "#142B4A" }}
                className="!text-[#142B4A]"
              />
            </Link>

            {/* LOGIN — WHITE TEXT ON NAVY */}
            <Link
              href="/login"
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "1px solid #93C5FD",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center rounded-xl px-7 py-4 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
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
            <a href="#features" className="transition hover:text-[#2563EB]">Features</a>
            <a href="#upload" className="transition hover:text-[#2563EB]">AI Analysis</a>
            <a href="#deadlines" className="transition hover:text-[#2563EB]">Deadlines</a>
            <a href="#pricing" className="transition hover:text-[#2563EB]">Pricing</a>
            <Link href="/login" className="transition hover:text-[#2563EB]">Login</Link>
          </div>

          <p className="text-sm text-[#58708F] dark:text-[#A9BEDA]">
            © 2026 Duego. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

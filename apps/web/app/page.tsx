
import Link from "next/link";
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
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart document management",
    description:
      "Keep your business documents organised and accessible in one place.",
  },
  {
    icon: BrainCircuit,
    title: "AI-powered analysis",
    description:
      "Extract important information, obligations, risks, and key details.",
  },
  {
    icon: CalendarCheck,
    title: "Deadline intelligence",
    description:
      "Turn dates and commitments hidden in documents into actionable tasks.",
  },
  {
    icon: BellRing,
    title: "Intelligent reminders",
    description:
      "Stay informed about upcoming deadlines and important business actions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload",
    description: "Add your business documents to Duego.",
  },
  {
    number: "02",
    title: "Analyse",
    description: "AI helps identify important information and obligations.",
  },
  {
    number: "03",
    title: "Review",
    description: "Check and confirm the extracted information.",
  },
  {
    number: "04",
    title: "Stay ahead",
    description: "Monitor deadlines and manage upcoming actions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
              D
            </div>
            <span className="text-2xl font-bold tracking-tight">Duego</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
            <a href="#features" className="transition-colors hover:text-primary">
              Features
            </a>
            <a href="#upload" className="transition-colors hover:text-primary">
              AI Analysis
            </a>
            <a href="#deadlines" className="transition-colors hover:text-primary">
              Deadlines
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-primary">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-primary">
              Pricing
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface-secondary sm:inline-flex"
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section
        id="features"
        className="border-t border-border bg-surface py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Everything in one workspace
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
              One platform.
              <span className="text-primary"> Complete clarity.</span>
            </h2>

            <p className="mt-5 leading-7 text-muted">
              Duego brings document intelligence, business obligations,
              deadlines, and reminders together in one connected experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 font-bold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Document upload and AI analysis */}
      <DocumentWorkspace />

      {/* Deadline calendar and reminders */}
      <DeadlineSection />

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-border bg-surface py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <ShieldCheck size={16} />
              A simple workflow
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
              From documents to
              <span className="text-primary"> decisions.</span>
            </h2>

            <p className="mt-5 leading-7 text-muted">
              Four simple stages to help keep your important business
              information organised and actionable.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-5xl font-bold tracking-tight text-primary/20">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <div className="absolute right-0 top-7 hidden -translate-y-1/2 text-primary/30 lg:block">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Final call to action */}
      <section className="border-t border-border bg-background px-6 py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-7 py-16 text-center text-primary-foreground shadow-2xl shadow-primary/20 sm:px-12">
          <Sparkles size={32} className="mx-auto opacity-90" />

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Make every business document count.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-85">
            Bring your documents, obligations, and important deadlines
            together with Duego.
          </p>

<Link
  href="/register"
  className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-blue-700 transition-all hover:-translate-y-1 hover:shadow-xl"
>
  <span className="text-blue-700">Get started with Duego</span>
  <ArrowRight size={18} className="text-blue-700" />
</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-10 md:flex-row md:items-center">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Duego</span>
            </Link>
            <p className="mt-2 text-sm text-muted">
              Smarter business document management.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#upload" className="hover:text-primary">AI Analysis</a>
            <a href="#deadlines" className="hover:text-primary">Deadlines</a>
            <a href="#pricing" className="hover:text-primary">Pricing</a>
          </div>

          <p className="text-sm text-muted">
            © 2026 Duego. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

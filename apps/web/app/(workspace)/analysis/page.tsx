
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  BrainCircuit,
  FileText,
  Sparkles,
  CalendarDays,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  ArrowUpRight,
  Search,
  ChevronDown,
  Download,
  Lightbulb,
  Target,
  ClipboardList,
} from "lucide-react";

const sampleDocuments = [
  "Service Agreement.pdf",
  "GST Invoice October.pdf",
  "Vendor Contract.docx",
];

const findings = [
  {
    title: "Agreement duration",
    description:
      "The agreement has a defined service period with renewal conditions.",
    type: "Contract",
    icon: FileText,
  },
  {
    title: "Payment obligation",
    description:
      "A sample payment obligation of ₹25,000 is identified for review.",
    type: "Payment",
    icon: Wallet,
  },
  {
    title: "Renewal condition",
    description:
      "The agreement contains a renewal clause that should be reviewed before expiry.",
    type: "Important",
    icon: CalendarDays,
  },
];

const extractedDetails = [
  ["Document type", "Service Agreement"],
  ["Document category", "Business Contract"],
  ["Parties involved", "Company and Service Provider"],
  ["Payment terms", "As specified in the agreement"],
  ["Agreement period", "As specified in the agreement"],
  ["Renewal clause", "Present in sample analysis"],
];

const deadlines = [
  {
    title: "Agreement renewal review",
    date: "12 November 2026",
    description: "Review the renewal conditions before the agreement period ends.",
  },
  {
    title: "Payment follow-up",
    date: "15 November 2026",
    description: "Check the payment obligation and confirm its status.",
  },
];

const tabs = ["Overview", "Extracted Details", "Obligations", "Risks"];

export default function AnalysisPage() {
  const [selectedDocument, setSelectedDocument] = useState(sampleDocuments[0]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  const filteredFindings = findings.filter((finding) =>
    `${finding.title} ${finding.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Intelligent Document Management
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
          AI Document Analysis
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Understand your business documents with AI-powered insights.
        </p>
      </div>

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <Sparkles className="mt-0.5 shrink-0 text-blue-600" size={19} />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">UI preview:</strong>{" "}
          The analysis below is illustrative sample content. Gemini analysis
          results will appear here after backend integration.
        </p>
      </div>

      {/* Document selector */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Select a document
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Choose a document to preview its analysis.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <select
                value={selectedDocument}
                onChange={(event) => setSelectedDocument(event.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--card)] py-2 pl-4 pr-10 text-sm text-[var(--foreground)] outline-none sm:min-w-64"
              >
                {sampleDocuments.map((document) => (
                  <option key={document} value={document}>
                    {document}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-3 text-[var(--muted-foreground)]"
              />
            </div>

            <Link
              href="/documents"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FileText size={17} />
              Documents
            </Link>
          </div>
        </div>
      </section>

      {/* Analysis result header */}
      <motion.section
        key={selectedDocument}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]"
      >
        <div className="flex flex-col justify-between gap-5 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600">
              <BrainCircuit size={25} />
            </div>
            <div>
              <h2 className="font-bold text-[var(--foreground)]">
                Analysis Report
              </h2>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {selectedDocument}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 size={14} />
              Sample report
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              Preview only
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)] px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-6">
          {activeTab === "Overview" && (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={19} className="text-blue-600" />
                  <h3 className="font-bold text-[var(--foreground)]">
                    AI Summary
                  </h3>
                </div>
                <p className="rounded-xl bg-[var(--muted)] p-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  This illustrative report represents a business service
                  agreement. It highlights agreement conditions, payment
                  terms, renewal requirements, and responsibilities of the
                  parties involved. Users should review the original document
                  before making business or legal decisions.
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="mb-4 font-bold text-[var(--foreground)]">
                  Key Findings
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {findings.map((finding) => {
                    const Icon = finding.icon;

                    return (
                      <div
                        key={finding.title}
                        className="rounded-xl border border-[var(--border)] p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="rounded-lg bg-blue-500/10 p-2 text-blue-600">
                            <Icon size={19} />
                          </span>
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {finding.type}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[var(--foreground)]">
                          {finding.title}
                        </h4>
                        <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground)]">
                          {finding.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Report metrics */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <ClipboardList size={17} />
                    Extracted information
                  </div>
                  <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                    6 items
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Illustrative report details
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <CalendarDays size={17} />
                    Identified action dates
                  </div>
                  <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                    2 dates
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Sample dates for demonstration
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Extracted Details" && (
            <div>
              <h3 className="mb-4 font-bold text-[var(--foreground)]">
                Extracted Document Information
              </h3>
              <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
                {extractedDetails.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 p-4 sm:grid-cols-2"
                  >
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                These are demonstration values, not information extracted from
                the selected file.
              </p>
            </div>
          )}

          {activeTab === "Obligations" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[var(--foreground)]">
                  Identified Obligations
                </h3>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Example responsibilities and payment items.
                </p>
              </div>

              {[
                {
                  title: "Payment obligation",
                  amount: "₹25,000",
                  description: "Sample amount requiring verification.",
                },
                {
                  title: "Agreement renewal",
                  amount: "Review required",
                  description: "Check the agreement's renewal conditions.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[var(--foreground)]">
                    {item.amount}
                  </span>
                </div>
              ))}

              <Link
                href="/obligations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all obligations <ArrowUpRight size={16} />
              </Link>
            </div>
          )}

          {activeTab === "Risks" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <ShieldAlert className="shrink-0 text-amber-600" size={23} />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    Review recommended
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                    The following are example review points, not actual risks
                    detected in your document.
                  </p>
                </div>
              </div>

              {[
                "Confirm payment terms and due dates.",
                "Review renewal and termination clauses.",
                "Verify the responsibilities of both parties.",
              ].map((risk) => (
                <div
                  key={risk}
                  className="flex items-start gap-3 rounded-xl border border-[var(--border)] p-4"
                >
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />
                  <p className="text-sm text-[var(--foreground)]">{risk}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Upcoming action dates */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays size={20} className="text-blue-600" />
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Important Dates & Actions
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Example dates from a demonstration report.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <div
              key={deadline.title}
              className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center"
            >
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <Clock3 size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {deadline.title}
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {deadline.description}
                </p>
              </div>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {deadline.date}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/deadlines"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Open deadline calendar <ArrowUpRight size={16} />
        </Link>
      </section>

      {/* Search findings */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              Find an Insight
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Search the example findings shown in this preview.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
            <Search size={17} className="text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search findings..."
              className="h-10 min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredFindings.length > 0 ? (
            filteredFindings.map((finding) => (
              <div
                key={finding.title}
                className="flex items-start gap-3 rounded-xl bg-[var(--muted)] p-4"
              >
                <Lightbulb
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {finding.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                    {finding.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-[var(--muted-foreground)]">
              No matching findings.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

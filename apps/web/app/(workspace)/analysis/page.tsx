
"use client";

import { useMemo, useState } from "react";
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
  Lightbulb,
  ClipboardList,
  Target,
  FileCheck2,
  CircleAlert,
  Layers3,
  RefreshCw,
} from "lucide-react";

const documents = [
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
    color: "blue",
  },
  {
    title: "Payment obligation",
    description:
      "A sample payment obligation of ₹25,000 is identified for review.",
    type: "Payment",
    icon: Wallet,
    color: "indigo",
  },
  {
    title: "Renewal condition",
    description:
      "The agreement contains a renewal clause that should be reviewed before expiry.",
    type: "Important",
    icon: CalendarDays,
    color: "gold",
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

const obligations = [
  {
    title: "Payment obligation",
    amount: "₹25,000",
    description: "Sample amount requiring verification.",
    category: "Payment",
  },
  {
    title: "Agreement renewal",
    amount: "Review required",
    description: "Check the agreement's renewal conditions.",
    category: "Contract",
  },
];

const risks = [
  {
    title: "Payment terms verification",
    description: "Confirm payment terms and due dates.",
    level: "Review",
  },
  {
    title: "Renewal and termination",
    description: "Review renewal and termination clauses.",
    level: "Important",
  },
  {
    title: "Party responsibilities",
    description: "Verify the responsibilities of both parties.",
    level: "Review",
  },
];

const deadlines = [
  {
    title: "Agreement renewal review",
    date: "12 November 2026",
    description:
      "Review the renewal conditions before the agreement period ends.",
  },
  {
    title: "Payment follow-up",
    date: "15 November 2026",
    description: "Check the payment obligation and confirm its status.",
  },
];

const tabs = [
  { name: "Overview", icon: Layers3 },
  { name: "Extracted Details", icon: ClipboardList },
  { name: "Obligations", icon: Wallet },
  { name: "Risks", icon: ShieldAlert },
];

const panel =
  "rounded-2xl border border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#0B1730]";

const heading = "text-[#142B4A] dark:text-[#EAF2FF]";
const secondary = "text-[#58708F] dark:text-[#A9BEDA]";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]";

const blueButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6]";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#C7DDF5] bg-white px-5 py-3 text-sm font-semibold !text-[#142B4A] transition hover:border-blue-400 hover:bg-[#DBEAFE] dark:border-[#345477] dark:bg-[#17365E] dark:!text-white dark:hover:bg-[#244D7D]";

export default function AnalysisPage() {
  const [selectedDocument, setSelectedDocument] = useState(documents[0]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  const filteredFindings = useMemo(
    () =>
      findings.filter((finding) =>
        `${finding.title} ${finding.description} ${finding.type}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const activeDocumentIndex = documents.indexOf(selectedDocument) + 1;

  return (
    <div className="space-y-7 pb-12">
      {/* PAGE HEADER */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <Sparkles size={14} />
            Duego Intelligence
          </div>

          <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
            AI Document Analysis
          </h1>

          <p className={`mt-2 max-w-2xl text-sm leading-6 ${secondary}`}>
            Turn business documents into meaningful insights, obligations,
            important dates, and risk indicators.
          </p>
        </div>

        <Link href="/documents" className={primaryButton}>
          <FileText size={17} className="text-white" />
          <span className="text-white">Manage Documents</span>
          <ArrowUpRight size={16} className="text-white" />
        </Link>
      </section>

      {/* SAMPLE DATA NOTICE */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-[#EFF6FF] p-4 dark:border-blue-800 dark:bg-[#102749]">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          <Sparkles size={19} />
        </div>

        <div>
          <p className={`text-sm font-bold ${heading}`}>
            Demonstration Analysis
          </p>
          <p className={`mt-1 text-xs leading-6 ${secondary}`}>
            The information on this page is illustrative sample content.
            Actual document extraction, Gemini AI analysis, and risk detection
            will be connected through the backend later.
          </p>
        </div>
      </div>

      {/* TOP METRICS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Documents in preview",
            value: "03",
            note: "Sample documents",
            icon: FileText,
            color: "blue",
          },
          {
            label: "Extracted details",
            value: "06",
            note: "Illustrative information",
            icon: ClipboardList,
            color: "indigo",
          },
          {
            label: "Identified obligations",
            value: "02",
            note: "Sample obligations",
            icon: Target,
            color: "violet",
          },
          {
            label: "Action dates",
            value: "02",
            note: "Demonstration dates",
            icon: CalendarDays,
            color: "gold",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          const colors: Record<string, string> = {
            blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
            indigo:
              "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200",
            violet:
              "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-200",
            gold: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
          };

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className={`${panel} p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-medium ${secondary}`}>
                  {item.label}
                </p>
                <div className={`rounded-xl p-2.5 ${colors[item.color]}`}>
                  <Icon size={19} />
                </div>
              </div>

              <p className={`mt-4 text-3xl font-bold tracking-tight ${heading}`}>
                {item.value}
              </p>
              <p className={`mt-1 text-xs ${secondary}`}>{item.note}</p>
            </motion.div>
          );
        })}
      </section>

      {/* DOCUMENT SELECTOR */}
      <section className={`${panel} overflow-hidden shadow-sm`}>
        <div className="border-b border-[#D7E6F8] px-5 py-4 dark:border-[#263D60]">
          <h2 className={`font-bold ${heading}`}>Select Document</h2>
          <p className={`mt-1 text-xs ${secondary}`}>
            Choose a document to view its analysis report.
          </p>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
              <FileText size={23} />
            </div>

            <div className="min-w-0">
              <p className={`text-xs ${secondary}`}>Selected document</p>
              <p className={`mt-1 truncate text-sm font-bold ${heading}`}>
                {selectedDocument}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <select
                value={selectedDocument}
                onChange={(event) => setSelectedDocument(event.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-[#C7DDF5] bg-white py-2 pl-4 pr-10 text-sm font-medium text-[#142B4A] outline-none transition focus:border-blue-500 dark:border-[#345477] dark:bg-[#102749] dark:text-white sm:min-w-64"
              >
                {documents.map((document) => (
                  <option key={document} value={document}>
                    {document}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3.5 text-blue-600"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab("Overview");
                setSearch("");
              }}
              className={secondaryButton}
            >
              <RefreshCw size={16} className="text-[#142B4A] dark:text-white" />
              <span>Reset View</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN ANALYSIS REPORT */}
      <motion.section
        key={selectedDocument}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${panel} overflow-hidden shadow-sm`}
      >
        {/* REPORT HEADER */}
        <div className="relative overflow-hidden bg-[#142B4A] p-6 text-white sm:p-7">
          <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-blue-400/10 blur-2xl" />
          <div className="absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-indigo-400/10 blur-2xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
                <BrainCircuit size={29} className="text-blue-200" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-blue-200">
                  Intelligence Report
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Document Analysis
                </h2>
                <p className="mt-1 max-w-sm truncate text-xs text-blue-100/75">
                  {selectedDocument}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/15 px-3 py-2 text-xs font-semibold text-emerald-200">
                <CheckCircle2 size={14} />
                Sample report
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80">
                Document {activeDocumentIndex} of {documents.length}
              </span>
            </div>
          </div>
        </div>

        {/* ANALYSIS TABS */}
        <div className="border-b border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#102749]">
          <div className="flex gap-2 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "border-[#142B4A] bg-[#142B4A] !text-white shadow-md dark:border-blue-400 dark:bg-blue-600 dark:!text-white"
                      : "border-[#C7DDF5] bg-white !text-[#142B4A] hover:border-blue-400 hover:bg-[#DBEAFE] dark:border-[#345477] dark:bg-[#17365E] dark:!text-white dark:hover:bg-[#244D7D]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="p-5 sm:p-7">
          {activeTab === "Overview" && (
            <div className="space-y-7">
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                    <Sparkles size={19} />
                  </div>

                  <div>
                    <h3 className={`font-bold ${heading}`}>AI Summary</h3>
                    <p className={`text-xs ${secondary}`}>
                      High-level document understanding
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-[#EFF6FF] p-5 dark:border-blue-900 dark:bg-[#102749]">
                  <p className={`text-sm leading-7 ${heading}`}>
                    This illustrative report represents a business service
                    agreement. It highlights agreement conditions, payment
                    terms, renewal requirements, and responsibilities of the
                    parties involved. Users should review the original
                    document before making business or legal decisions.
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-blue-200 pt-3 text-xs text-blue-700 dark:border-blue-900 dark:text-blue-300">
                    <Lightbulb size={15} />
                    Example summary for interface demonstration
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-4">
                  <h3 className={`font-bold ${heading}`}>Key Findings</h3>
                  <p className={`mt-1 text-xs ${secondary}`}>
                    Important information represented in the sample report.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {findings.map((finding) => {
                    const Icon = finding.icon;

                    const colorClasses: Record<string, string> = {
                      blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
                      indigo:
                        "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-900",
                      gold: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900",
                    };

                    return (
                      <div
                        key={finding.title}
                        className="rounded-2xl border border-[#D7E6F8] bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-[#263D60] dark:bg-[#102749] dark:hover:border-blue-700"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className={`rounded-xl border p-3 ${colorClasses[finding.color]}`}>
                            <Icon size={21} />
                          </div>

                          <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[10px] font-semibold text-[#345477] dark:bg-[#17365E] dark:text-blue-200">
                            {finding.type}
                          </span>
                        </div>

                        <h4 className={`text-sm font-bold ${heading}`}>
                          {finding.title}
                        </h4>
                        <p className={`mt-2 text-xs leading-6 ${secondary}`}>
                          {finding.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("Extracted Details")}
                  className="flex items-center justify-between rounded-2xl border border-[#D7E6F8] bg-[#F5F9FF] p-5 text-left transition hover:border-blue-300 hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#102749] dark:hover:bg-[#17365E]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                      <ClipboardList size={21} />
                    </div>

                    <div>
                      <p className={`text-sm font-bold ${heading}`}>
                        Extracted Information
                      </p>
                      <p className={`mt-1 text-xs ${secondary}`}>
                        6 illustrative details
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-blue-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("Risks")}
                  className="flex items-center justify-between rounded-2xl border border-[#EAD9AE] bg-[#FFFBF0] p-5 text-left transition hover:border-amber-400 hover:bg-[#FFF6DF] dark:border-[#69532D] dark:bg-[#302817] dark:hover:bg-[#40351D]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                      <ShieldAlert size={21} />
                    </div>

                    <div>
                      <p className={`text-sm font-bold ${heading}`}>
                        Risk Review
                      </p>
                      <p className={`mt-1 text-xs ${secondary}`}>
                        3 example review points
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-amber-600" />
                </button>
              </section>
            </div>
          )}

          {/* EXTRACTED DETAILS */}
          {activeTab === "Extracted Details" && (
            <section>
              <div className="mb-5">
                <h3 className={`text-lg font-bold ${heading}`}>
                  Extracted Document Information
                </h3>
                <p className={`mt-1 text-xs ${secondary}`}>
                  Structured information represented in this sample report.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {extractedDetails.map(([label, value], index) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#D7E6F8] bg-[#F5F9FF] p-4 dark:border-[#263D60] dark:bg-[#102749]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={`text-xs font-medium ${secondary}`}>
                        {label}
                      </p>
                    </div>

                    <p className={`mt-3 text-sm font-semibold ${heading}`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-[#302817]">
                <CircleAlert
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <p className={`text-xs leading-6 ${secondary}`}>
                  These are demonstration values, not information extracted
                  from the selected file.
                </p>
              </div>
            </section>
          )}

          {/* OBLIGATIONS */}
          {activeTab === "Obligations" && (
            <section>
              <div className="mb-5">
                <h3 className={`text-lg font-bold ${heading}`}>
                  Identified Obligations
                </h3>
                <p className={`mt-1 text-xs ${secondary}`}>
                  Example responsibilities and payment items.
                </p>
              </div>

              <div className="space-y-3">
                {obligations.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D7E6F8] bg-white p-5 sm:flex-row sm:items-center dark:border-[#263D60] dark:bg-[#102749]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                        {item.category === "Payment" ? (
                          <Wallet size={21} />
                        ) : (
                          <FileCheck2 size={21} />
                        )}
                      </div>

                      <div>
                        <h4 className={`text-sm font-bold ${heading}`}>
                          {item.title}
                        </h4>
                        <p className={`mt-1 text-xs leading-6 ${secondary}`}>
                          {item.description}
                        </p>
                        <span className="mt-2 inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <p className={`text-sm font-bold ${heading}`}>
                      {item.amount}
                    </p>
                  </div>
                ))}
              </div>

              <Link href="/obligations" className={`${primaryButton} mt-5`}>
                <span className="text-white">View All Obligations</span>
                <ArrowUpRight size={16} className="text-white" />
              </Link>
            </section>
          )}

          {/* RISKS */}
          {activeTab === "Risks" && (
            <section>
              <div className="mb-5">
                <h3 className={`text-lg font-bold ${heading}`}>
                  Risk & Review Indicators
                </h3>
                <p className={`mt-1 text-xs ${secondary}`}>
                  Example points that a business user may want to review.
                </p>
              </div>

              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-[#302817]">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                  <ShieldAlert size={23} />
                </div>

                <div>
                  <h4 className={`font-bold ${heading}`}>
                    Review recommended
                  </h4>
                  <p className={`mt-1 text-xs leading-6 ${secondary}`}>
                    These are example review points, not actual risks detected
                    in your document.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {risks.map((risk) => (
                  <div
                    key={risk.title}
                    className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-white p-4 dark:border-[#263D60] dark:bg-[#102749]"
                  >
                    <div className="rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                      <AlertTriangle size={18} />
                    </div>

                    <div className="flex-1">
                      <p className={`text-sm font-bold ${heading}`}>
                        {risk.title}
                      </p>
                      <p className={`mt-1 text-xs leading-6 ${secondary}`}>
                        {risk.description}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                      {risk.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.section>

      {/* IMPORTANT DATES */}
      <section className={`${panel} p-5 shadow-sm sm:p-6`}>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2 className={`font-bold ${heading}`}>
                Important Dates & Actions
              </h2>
              <p className={`mt-1 text-xs ${secondary}`}>
                Example dates from the demonstration report.
              </p>
            </div>
          </div>

          <Link
            href="/deadlines"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-[#17365E]"
          >
            <span>Open Deadline Calendar</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {deadlines.map((deadline, index) => (
            <div
              key={deadline.title}
              className="flex flex-col gap-3 rounded-xl border border-[#D7E6F8] bg-[#F5F9FF] p-4 sm:flex-row sm:items-center dark:border-[#263D60] dark:bg-[#102749]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                {index === 0 ? <Clock3 size={20} /> : <Wallet size={20} />}
              </div>

              <div className="flex-1">
                <p className={`text-sm font-bold ${heading}`}>
                  {deadline.title}
                </p>
                <p className={`mt-1 text-xs leading-5 ${secondary}`}>
                  {deadline.description}
                </p>
              </div>

              <span className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                {deadline.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH FINDINGS */}
      <section className={`${panel} p-5 shadow-sm sm:p-6`}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className={`font-bold ${heading}`}>
              Search Analysis Insights
            </h2>
            <p className={`mt-1 text-xs ${secondary}`}>
              Find a particular item in the sample findings.
            </p>
          </div>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-[#C7DDF5] bg-[#F5F9FF] px-3 focus-within:border-blue-500 dark:border-[#345477] dark:bg-[#102749]">
            <Search size={17} className="shrink-0 text-blue-600" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search findings..."
              className="w-full min-w-0 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#7891B0] dark:text-[#EAF2FF] dark:placeholder:text-[#A9BEDA] sm:w-56"
            />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filteredFindings.length > 0 ? (
            filteredFindings.map((finding) => (
              <div
                key={finding.title}
                className="flex items-start gap-3 rounded-xl border border-blue-100 bg-[#F5F9FF] p-4 dark:border-[#263D60] dark:bg-[#102749]"
              >
                <div className="rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                  <Lightbulb size={18} />
                </div>

                <div>
                  <p className={`text-sm font-bold ${heading}`}>
                    {finding.title}
                  </p>
                  <p className={`mt-1 text-xs leading-6 ${secondary}`}>
                    {finding.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-blue-100 bg-[#F5F9FF] py-8 text-center dark:border-[#263D60] dark:bg-[#102749]">
              <Search size={25} className="mx-auto text-blue-500" />
              <p className={`mt-3 text-sm font-semibold ${heading}`}>
                No matching insights
              </p>
              <p className={`mt-1 text-xs ${secondary}`}>
                Try another search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM AI PANEL */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#142B4A] to-[#244D7D] p-6 text-white sm:p-7">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-blue-300/10 blur-2xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
              <BrainCircuit size={27} className="text-blue-200" />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Your documents, understood better.
              </h2>
              <p className="mt-2 max-w-lg text-xs leading-6 text-blue-100/80">
                Upload and organize your business documents to prepare them
                for AI-powered analysis and structured insights.
              </p>
            </div>
          </div>

          <Link
            href="/documents"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#142B4A] transition hover:bg-blue-100"
          >
            <FileText size={17} className="text-[#142B4A]" />
            <span className="text-[#142B4A]">Go to Documents</span>
            <ArrowUpRight size={16} className="text-[#142B4A]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

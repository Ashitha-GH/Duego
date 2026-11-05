
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import {
  AlertCircle,
  ArrowDownWideNarrow,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  FileText,
  Files,
  Filter,
  FolderOpen,
  HardDrive,
  LockKeyhole,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
  Crown,
} from "lucide-react";

import { PlanBadge } from "@/components/subscription/plan-badge";
import { FeatureGate } from "@/components/subscription/feature-gate";
import type { PlanType } from "@/lib/subscription/feature-config";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type DocumentStatus = "Analysed" | "Processing" | "Pending";

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  status: DocumentStatus;
  category: string;
};

type SortOption = "newest" | "oldest" | "name" | "largest";

// --------------------------------------------------
// SAMPLE DOCUMENTS
// --------------------------------------------------

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    name: "Service Agreement.pdf",
    type: "PDF",
    size: "2.4 MB",
    date: "02 Nov 2026",
    status: "Analysed",
    category: "Contracts",
  },
  {
    id: 2,
    name: "GST Invoice October.pdf",
    type: "PDF",
    size: "1.2 MB",
    date: "01 Nov 2026",
    status: "Processing",
    category: "Invoices",
  },
  {
    id: 3,
    name: "Vendor Contract.docx",
    type: "DOCX",
    size: "840 KB",
    date: "30 Oct 2026",
    status: "Analysed",
    category: "Contracts",
  },
  {
    id: 4,
    name: "Insurance Policy.pdf",
    type: "PDF",
    size: "3.1 MB",
    date: "28 Oct 2026",
    status: "Pending",
    category: "Insurance",
  },
  {
    id: 5,
    name: "Employee Agreement.pdf",
    type: "PDF",
    size: "950 KB",
    date: "25 Oct 2026",
    status: "Analysed",
    category: "HR",
  },
];

// --------------------------------------------------
// STYLES AND HELPERS
// --------------------------------------------------

const statusStyles: Record<DocumentStatus, string> = {
  Analysed:
    "border-[#86EFAC] bg-[#F0FDF4] text-[#166534] dark:border-[#285C43] dark:bg-[#153B2B] dark:text-[#86EFAC]",
  Processing:
    "border-[#93C5FD] bg-[#EFF6FF] text-[#1D4ED8] dark:border-[#263D60] dark:bg-[#203D65] dark:text-[#93C5FD]",
  Pending:
    "border-[#E8C778] bg-[#FFFBEB] text-[#946200] dark:border-[#65512C] dark:bg-[#40351E] dark:text-[#F2D28A]",
};

function getFileSizeInBytes(size: string) {
  const value = Number.parseFloat(size);

  if (!Number.isFinite(value)) return 0;

  return size.includes("MB")
    ? value * 1024 * 1024
    : value * 1024;
}

function getDateValue(date: string) {
  const [day, month, year] = date.split(" ");
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3,
    May: 4, Jun: 5, Jul: 6, Aug: 7,
    Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  return new Date(
    Number(year),
    months[month] ?? 0,
    Number(day)
  ).getTime();
}

// --------------------------------------------------
// DOCUMENTS PAGE
// --------------------------------------------------

export default function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [notice, setNotice] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentItem | null>(null);

  // Demo subscription plan.
  // Backend subscription integration will replace this value later.
  const currentPlan: PlanType = "free";

  // ------------------------------------------------
  // DOCUMENT COUNTS
  // ------------------------------------------------

  const analysedCount = documents.filter(
    (document) => document.status === "Analysed"
  ).length;

  const processingCount = documents.filter(
    (document) => document.status === "Processing"
  ).length;

  const pendingCount = documents.filter(
    (document) => document.status === "Pending"
  ).length;

  // ------------------------------------------------
  // SEARCH, FILTER AND SORT
  // ------------------------------------------------

  const filteredDocuments = useMemo(() => {
    const result = documents.filter((document) => {
      const searchText =
        `${document.name} ${document.category} ${document.type}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || document.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        document.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return getDateValue(a.date) - getDateValue(b.date);

        case "name":
          return a.name.localeCompare(b.name);

        case "largest":
          return getFileSizeInBytes(b.size) -
            getFileSizeInBytes(a.size);

        case "newest":
        default:
          return getDateValue(b.date) - getDateValue(a.date);
      }
    });
  }, [documents, search, statusFilter, categoryFilter, sortBy]);

  // ------------------------------------------------
  // FILE UPLOAD PREVIEW
  // ------------------------------------------------

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    const selectedFiles = Array.from(files);

    const acceptedFiles = selectedFiles.filter((file) => {
      const fileName = file.name.toLowerCase();

      return (
        fileName.endsWith(".pdf") ||
        fileName.endsWith(".docx")
      );
    });

    const rejectedCount =
      selectedFiles.length - acceptedFiles.length;

    if (acceptedFiles.length === 0) {
      setNotice(
        "Unsupported file type. Please select PDF or DOCX files."
      );
      return;
    }

    const oversizedFiles = acceptedFiles.filter(
      (file) => file.size > 20 * 1024 * 1024
    );

    const validFiles = acceptedFiles.filter(
      (file) => file.size <= 20 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      setNotice(
        "Files must be 20 MB or smaller. No files were added."
      );
      return;
    }

    const newDocuments: DocumentItem[] = validFiles.map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.name.toLowerCase().endsWith(".pdf")
          ? "PDF"
          : "DOCX",
        size:
          file.size >= 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.max(1, Math.round(file.size / 1024))} KB`,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Pending",
        category: "Other",
      })
    );

    setDocuments((current) => [
      ...newDocuments,
      ...current,
    ]);

    setNotice(
      `${newDocuments.length} file(s) added to the local preview.` +
      (rejectedCount > 0
        ? ` ${rejectedCount} unsupported file(s) skipped.`
        : "") +
      (oversizedFiles.length > 0
        ? ` ${oversizedFiles.length} oversized file(s) skipped.`
        : "") +
      " Server upload is not connected yet."
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // ------------------------------------------------
  // DELETE DOCUMENT
  // ------------------------------------------------

  function deleteDocument(id: number) {
    setDocuments((current) =>
      current.filter((document) => document.id !== id)
    );

    setSelectedDocument(null);
    setNotice("Document removed from this browser preview.");
  }

  // ------------------------------------------------
  // CLEAR FILTERS
  // ------------------------------------------------

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortBy("newest");
  }

  // ------------------------------------------------
  // SUMMARY CARDS
  // ------------------------------------------------

  const summaryCards = [
    {
      label: "Total Documents",
      value: documents.length,
      description: "Available records",
      icon: Files,
      style:
        "bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#203D65] dark:text-[#93C5FD]",
    },
    {
      label: "Analysed",
      value: analysedCount,
      description: "Analysis completed",
      icon: FileCheck2,
      style:
        "bg-[#E0E7FF] text-[#4338CA] dark:bg-[#292C60] dark:text-[#A5B4FC]",
    },
    {
      label: "Processing",
      value: processingCount,
      description: "Currently processing",
      icon: BrainCircuit,
      style:
        "bg-[#E0F2FE] text-[#0369A1] dark:bg-[#173C5B] dark:text-[#7DD3FC]",
    },
    {
      label: "Pending",
      value: pendingCount,
      description: "Awaiting action",
      icon: Clock3,
      style:
        "bg-[#FFFBEB] text-[#946200] dark:bg-[#40351E] dark:text-[#F2D28A]",
    },
  ];

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-12">

      {/* PAGE HEADER */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
            <FolderOpen size={17} />
            Business Workspace
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] dark:text-white sm:text-4xl">
            Documents
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            Manage, organize and analyse your business documents
            from one centralized workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/analysis"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D7E6F8] bg-white px-4 py-3 text-sm font-semibold text-[#142B4A] transition hover:border-[#93C5FD] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:hover:bg-[#203D65]"
          >
            <BrainCircuit size={17} className="text-[#2563EB]" />
            AI Analysis
          </Link>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#142B4A] bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white shadow-md transition hover:border-[#2563EB] hover:bg-[#2563EB]"
          >
            <UploadCloud size={18} />
            <span>Upload Documents</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </motion.section>

      {/* PREVIEW NOTICE */}

      <div className="flex items-start gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <AlertCircle
          size={19}
          className="mt-0.5 shrink-0 text-[#2563EB]"
        />

        <div>
          <p className="text-sm font-semibold text-[#142B4A] dark:text-white">
            Frontend preview mode
          </p>

          <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
            These records are sample data. Selected files are added
            to temporary page state only. Server upload, persistent
            storage and live AI analysis will be connected later.
          </p>
        </div>
      </div>

      {/* FEEDBACK MESSAGE */}

      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
        >
          <div className="flex items-start gap-2">
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-[#2563EB]"
            />
            <span>{notice}</span>
          </div>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded-lg p-1 transition hover:bg-[#DBEAFE] dark:hover:bg-[#203D65]"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {/* SUBSCRIPTION PLAN OVERVIEW */}

      <section className="relative overflow-hidden rounded-2xl border border-[#93C5FD] bg-gradient-to-r from-[#EFF6FF] via-white to-[#DBEAFE] p-5 dark:border-[#263D60] dark:from-[#142B4A] dark:via-[#102440] dark:to-[#1E3A5F] sm:p-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#2563EB]/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles size={18} className="text-[#2563EB]" />
              <span className="text-sm font-bold text-[#2563EB]">
                DOCUMENT WORKSPACE 3.0
              </span>
              <PlanBadge plan={currentPlan} />
            </div>

            <h2 className="mt-3 text-xl font-bold text-[#142B4A] dark:text-white">
              Manage your documents smarter
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
              Your current plan includes essential document management.
              Explore advanced AI tools and business reporting with
              upgraded plans.
            </p>
          </div>

          <Link
            href="/subscription"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
          >
            <Crown size={17} />
            Explore Plans
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* DOCUMENT STATISTICS */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
            Document Overview
          </h2>

          <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
            A quick summary of your document workspace
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="rounded-2xl border border-[#D7E6F8] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#93C5FD] hover:shadow-md dark:border-[#263D60] dark:bg-[#142B4A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#58708F] dark:text-[#A9BEDA]">
                    {item.label}
                  </span>

                  <span className={`rounded-xl p-3 ${item.style}`}>
                    <Icon size={20} />
                  </span>
                </div>

                <p className="mt-5 text-3xl font-bold text-[#142B4A] dark:text-white">
                  {item.value}
                </p>

                <p className="mt-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* UPLOAD AREA */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
            Upload Documents
          </h2>

          <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
            Add PDF and DOCX files to your document workspace
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();

            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node
              )
            ) {
              setIsDragging(false);
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          className={`group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-10 text-center transition-all duration-200 ${
            isDragging
              ? "border-[#2563EB] bg-[#DBEAFE] dark:bg-[#203D65]"
              : "border-[#93C5FD] bg-gradient-to-br from-[#EFF6FF] via-white to-[#E0E7FF] hover:border-[#2563EB] dark:border-[#263D60] dark:from-[#142B4A] dark:via-[#102440] dark:to-[#1E3154]"
          }`}
        >
          <span className="rounded-2xl bg-[#142B4A] p-4 text-white shadow-lg transition group-hover:scale-105">
            <UploadCloud size={28} />
          </span>

          <span className="mt-5 text-base font-bold text-[#142B4A] dark:text-white">
            {isDragging
              ? "Drop your documents here"
              : "Drag and drop your files here"}
          </span>

          <span className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
            Or click to browse files from your device
          </span>

          <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#D7E6F8] bg-white px-3 py-2 text-xs font-semibold text-[#142B4A] dark:border-[#263D60] dark:bg-[#102440] dark:text-white">
            <FileText size={15} />
            PDF and DOCX · Maximum 20 MB per file
          </span>
        </button>
      </section>

      {/* DOCUMENT LIST */}

      <section className="overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-sm dark:border-[#263D60] dark:bg-[#142B4A]">

        <div className="flex flex-col justify-between gap-4 border-b border-[#D7E6F8] p-5 lg:flex-row lg:items-center dark:border-[#263D60]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
                All Documents
              </h2>

              <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#142B4A] dark:bg-[#203D65] dark:text-white">
                {filteredDocuments.length}
              </span>
            </div>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Search, filter and manage your business files
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 dark:border-[#263D60] dark:bg-[#102440] sm:min-w-[220px]">
              <Search size={17} className="shrink-0 text-[#2563EB]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search documents..."
                aria-label="Search documents"
                className="h-10 w-full min-w-0 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
              className="h-10 rounded-xl border border-[#D7E6F8] bg-white px-3 text-sm text-[#142B4A] outline-none focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#102440] dark:text-white"
            >
              <option value="All">All statuses</option>
              <option value="Analysed">Analysed</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter by category"
              className="h-10 rounded-xl border border-[#D7E6F8] bg-white px-3 text-sm text-[#142B4A] outline-none focus:border-[#2563EB] dark:border-[#263D60] dark:bg-[#102440] dark:text-white"
            >
              <option value="All">All categories</option>
              <option value="Contracts">Contracts</option>
              <option value="Invoices">Invoices</option>
              <option value="Insurance">Insurance</option>
              <option value="HR">HR</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* SORTING TOOLBAR */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E6F8] bg-[#EFF6FF]/70 px-5 py-3 dark:border-[#263D60] dark:bg-[#102440]">
          <div className="flex items-center gap-2 text-xs font-medium text-[#58708F] dark:text-[#A9BEDA]">
            <SlidersHorizontal size={15} />
            Showing {filteredDocuments.length} of {documents.length} documents
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ArrowDownWideNarrow
              size={15}
              className="text-[#2563EB]"
            />

            <span className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              aria-label="Sort documents"
              className="rounded-lg border border-[#D7E6F8] bg-white px-2 py-1.5 text-xs font-semibold text-[#142B4A] outline-none dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
              <option value="largest">Largest first</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition hover:bg-[#DBEAFE] dark:hover:bg-[#203D65]"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* DOCUMENT ROWS */}

        <div className="divide-y divide-[#D7E6F8] dark:divide-[#263D60]">
          {filteredDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.035 }}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[#EFF6FF]/70 sm:flex-row sm:items-center dark:hover:bg-[#102440]"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] text-[#1D4ED8] dark:border-[#263D60] dark:bg-[#203D65] dark:text-[#93C5FD]">
                  <FileText size={23} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#142B4A] dark:text-white">
                    {document.name}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    <span>{document.type}</span>
                    <span>•</span>
                    <span>{document.size}</span>
                    <span>•</span>
                    <span>{document.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span className="rounded-lg border border-[#D7E6F8] bg-[#EFF6FF] px-3 py-1.5 text-xs font-medium text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white">
                  {document.category}
                </span>

                <span
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusStyles[document.status]}`}
                >
                  {document.status}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedDocument(document)}
                  aria-label={`View ${document.name}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#D7E6F8] bg-white px-3 py-2 text-xs font-semibold text-[#142B4A] transition hover:border-[#93C5FD] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#102440] dark:text-white dark:hover:bg-[#203D65]"
                >
                  <Eye size={15} />
                  Details
                </button>
              </div>
            </motion.div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB] dark:bg-[#203D65]">
                <Search size={25} />
              </div>

              <h3 className="mt-4 font-bold text-[#142B4A] dark:text-white">
                No documents found
              </h3>

              <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                Try another search term or change your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-[#142B4A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* DUEGO 3.0 PREMIUM DOCUMENT FEATURES */}

      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={19} className="text-[#D6A84B]" />

            <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">
              Advanced Document Tools
            </h2>
          </div>

          <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
            Explore the additional tools available with Pro and Business plans.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          {/* ADVANCED AI ANALYSIS - PRO */}

          <FeatureGate
            featureId="advanced-ai-analysis"
            currentPlan={currentPlan}
          >
            <div className="rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
              <PlanBadge plan="pro" />

              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#203D65]">
                  <BrainCircuit size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-[#142B4A] dark:text-white">
                    Advanced AI Analysis
                  </h3>

                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Deeper document intelligence
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Explore advanced document insights and detailed AI findings.
              </p>

              <Link
                href="/analysis"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
              >
                Open AI Analysis <ArrowRight size={16} />
              </Link>
            </div>
          </FeatureGate>

          {/* RISK DETECTION - PRO */}

          <FeatureGate
            featureId="risk-detection"
            currentPlan={currentPlan}
          >
            <div className="rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#142B4A]">
              <PlanBadge plan="pro" />

              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#203D65]">
                  <ShieldAlert size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-[#142B4A] dark:text-white">
                    Advanced Risk Detection
                  </h3>

                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Identify important document risks
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Review potential risks and important issues found in documents.
              </p>

              <Link
                href="/analysis"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
              >
                Explore risk analysis <ArrowRight size={16} />
              </Link>
            </div>
          </FeatureGate>

          {/* BUSINESS REPORTS - BUSINESS */}

          <FeatureGate
            featureId="business-reports"
            currentPlan={currentPlan}
          >
            <div className="rounded-2xl border border-[#E8C778] bg-[#FFFBEB] p-5 dark:border-[#65512C] dark:bg-[#142B4A]">
              <PlanBadge plan="business" />

              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl bg-[#FDECC3] p-3 text-[#946200] dark:bg-[#40351E] dark:text-[#F2D28A]">
                  <Files size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-[#142B4A] dark:text-white">
                    Business Document Reports
                  </h3>

                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Enhanced business reporting
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                Access enhanced business reporting and document summaries.
              </p>

              <Link
                href="/analysis"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#946200] hover:underline dark:text-[#F2D28A]"
              >
                Explore business reports <ArrowRight size={16} />
              </Link>
            </div>
          </FeatureGate>
        </div>
      </section>

      {/* AI WORKSPACE PROMOTION */}

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#142B4A] via-[#1E3A5F] to-[#3730A3] p-6 text-white shadow-lg sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-blue-300/15 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#DBEAFE]">
              <Sparkles size={18} />
              Duego AI Workspace
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              Turn your documents into business insights.
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#DBEAFE]">
              Organize documents, review extracted information and explore
              the AI workspace.
            </p>
          </div>

          <Link
            href="/analysis"
            className="relative z-20 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold !text-[#142B4A] shadow-md transition hover:bg-[#EFF6FF]"
          >
            <BrainCircuit size={18} />
            Open AI Workspace
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* DOCUMENT DETAILS MODAL */}

      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0B1930]/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDocument(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-dialog-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#D7E6F8] bg-white shadow-2xl dark:border-[#263D60] dark:bg-[#142B4A]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#142B4A] via-[#1E3A5F] to-[#263F70] p-6 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-300/15 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                    <FileText size={25} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#DBEAFE]">
                      Document Workspace
                    </p>

                    <h2
                      id="document-dialog-title"
                      className="mt-1 text-xl font-bold"
                    >
                      Document Details
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDocument(null)}
                  aria-label="Close details"
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="relative mt-6 rounded-xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-medium text-[#DBEAFE]">
                  SELECTED DOCUMENT
                </p>

                <p className="mt-2 break-all text-base font-bold leading-6">
                  {selectedDocument.name}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold">
                    {selectedDocument.type}
                  </span>

                  <span
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                      selectedDocument.status === "Analysed"
                        ? "border-emerald-300/30 bg-emerald-400/20 text-emerald-100"
                        : selectedDocument.status === "Processing"
                          ? "border-blue-200/30 bg-blue-300/20 text-blue-100"
                          : "border-amber-200/30 bg-amber-300/20 text-amber-100"
                    }`}
                  >
                    {selectedDocument.status}
                  </span>
                </div>
              </div>
            </div>

            {/* FILE INFORMATION */}

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#142B4A] dark:text-white">
                  File Information
                </h3>

                <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  Details and properties of this document
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#102440]">
                  <div className="flex items-center gap-2 text-[#2563EB]">
                    <FileText size={17} />
                    <span className="text-xs font-semibold">File Type</span>
                  </div>

                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.type}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#102440]">
                  <div className="flex items-center gap-2 text-[#2563EB]">
                    <HardDrive size={17} />
                    <span className="text-xs font-semibold">File Size</span>
                  </div>

                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.size}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#102440]">
                  <div className="flex items-center gap-2 text-[#2563EB]">
                    <FolderOpen size={17} />
                    <span className="text-xs font-semibold">Category</span>
                  </div>

                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.category}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#102440]">
                  <div className="flex items-center gap-2 text-[#2563EB]">
                    <CalendarDays size={17} />
                    <span className="text-xs font-semibold">Upload Date</span>
                  </div>

                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.date}
                  </p>
                </div>
              </div>

              {/* STATUS */}

              <div className="mt-5 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#102440]">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#142B4A] p-2.5 text-white">
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#58708F] dark:text-[#A9BEDA]">
                      Current Document Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#142B4A] dark:text-white">
                      {selectedDocument.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* PREVIEW INFORMATION */}

              <div className="mt-5 flex gap-3 rounded-xl border border-[#E8C778] bg-[#FFFBEB] p-4 dark:border-[#65512C] dark:bg-[#40351E]">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-[#946200] dark:text-[#F2D28A]"
                />

                <p className="text-xs leading-5 text-[#946200] dark:text-[#F2D28A]">
                  This is a frontend preview record. Actual file preview,
                  downloading and server-side analysis will be enabled
                  during backend integration.
                </p>
              </div>

              {/* ACTIONS */}

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/analysis"
                  onClick={() => setSelectedDocument(null)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2563EB]"
                >
                  <BrainCircuit size={18} />
                  AI Analysis
                  <ArrowUpRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={() => deleteDocument(selectedDocument.id)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-white px-4 py-3 text-sm font-bold text-[#B91C1C] transition hover:bg-[#FEF2F2] dark:border-[#74333D] dark:bg-[#142B4A] dark:text-[#FCA5A5] dark:hover:bg-[#541F2A]"
                >
                  <Trash2 size={17} />
                  Remove Document
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

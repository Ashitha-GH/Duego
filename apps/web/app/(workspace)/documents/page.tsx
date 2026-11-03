
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AlertCircle,
  ArrowDownWideNarrow,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  FilePlus2,
  FileText,
  Files,
  Filter,
  FolderOpen,
  HardDrive,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

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

const statusStyles: Record<DocumentStatus, string> = {
  Analysed:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  Processing:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300",
  Pending:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
};

function getFileSizeInBytes(size: string) {
  const value = Number.parseFloat(size);
  if (!Number.isFinite(value)) return 0;

  return size.includes("MB")
    ? value * 1024 * 1024
    : value * 1024;
}

function getDateValue(date: string) {
  return new Date(date).getTime() || 0;
}

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

  const analysedCount = documents.filter(
    (document) => document.status === "Analysed"
  ).length;

  const processingCount = documents.filter(
    (document) => document.status === "Processing"
  ).length;

  const pendingCount = documents.filter(
    (document) => document.status === "Pending"
  ).length;

  const filteredDocuments = useMemo(() => {
    const result = documents.filter((document) => {
      const searchText =
        `${document.name} ${document.category} ${document.type}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || document.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || document.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return getDateValue(a.date) - getDateValue(b.date);
        case "name":
          return a.name.localeCompare(b.name);
        case "largest":
          return getFileSizeInBytes(b.size) - getFileSizeInBytes(a.size);
        case "newest":
        default:
          return getDateValue(b.date) - getDateValue(a.date);
      }
    });
  }, [documents, search, statusFilter, categoryFilter, sortBy]);

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

    const rejectedCount = selectedFiles.length - acceptedFiles.length;

    if (acceptedFiles.length === 0) {
      setNotice("Unsupported file type. Please select PDF or DOCX files.");
      return;
    }

    const newDocuments: DocumentItem[] = acceptedFiles.map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX",
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

    setDocuments((current) => [...newDocuments, ...current]);

    const message =
      `${newDocuments.length} file(s) added to the preview.` +
      (rejectedCount > 0
        ? ` ${rejectedCount} unsupported file(s) were skipped.`
        : "") +
      " Backend upload is not connected yet.";

    setNotice(message);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function deleteDocument(id: number) {
    setDocuments((current) =>
      current.filter((document) => document.id !== id)
    );

    setSelectedDocument(null);
    setNotice("Document removed from this browser preview.");
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortBy("newest");
  }

  const summaryCards = [
    {
      label: "Total Documents",
      value: documents.length,
      description: "Available records",
      icon: Files,
      style: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    },
    {
      label: "Analysed",
      value: analysedCount,
      description: "Analysis completed",
      icon: FileCheck2,
      style:
        "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    },
    {
      label: "Processing",
      value: processingCount,
      description: "Currently processing",
      icon: BrainCircuit,
      style:
        "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
    },
    {
      label: "Pending",
      value: pendingCount,
      description: "Awaiting action",
      icon: Clock3,
      style:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-12">

      {/* Page header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
            <FolderOpen size={17} />
            Business Workspace
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Documents
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted-foreground)]">
            Manage, organize and analyse your business documents from one
            centralized workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/analysis"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-[var(--card)] px-4 py-3 text-sm font-semibold text-[#142B4A] transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-200 dark:hover:bg-slate-800"
          >
            <BrainCircuit size={17} />
            AI Analysis
          </Link>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#142B4A] bg-[#142B4A] px-5 py-3 text-sm font-semibold !text-white shadow-md transition hover:border-[#2563EB] hover:bg-[#2563EB]"
          >
            <UploadCloud size={18} />
            <span className="text-white">Upload Documents</span>
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

      {/* Preview notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
        <AlertCircle
          size={19}
          className="mt-0.5 shrink-0 text-blue-700 dark:text-blue-400"
        />
        <div>
          <p className="text-sm font-semibold text-[#142B4A] dark:text-blue-200">
            Frontend preview mode
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            These records are sample data. Selected files are added to this
            page&apos;s temporary browser state only. Server upload,
            persistent storage and live AI analysis will be connected in
            the backend integration phase.
          </p>
        </div>
      </div>

      {/* Feedback message */}
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-[#142B4A] dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200"
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
          </div>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded-lg p-1 transition hover:bg-blue-100 dark:hover:bg-blue-900"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {/* Statistics */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[var(--foreground)]">
            Document Overview
          </h2>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
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
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:hover:border-blue-800"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">
                    {item.label}
                  </span>

                  <span className={`rounded-xl p-3 ${item.style}`}>
                    <Icon size={20} />
                  </span>
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                  {item.value}
                </p>

                <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Upload area */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[var(--foreground)]">
            Upload Documents
          </h2>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
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
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
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
              ? "border-blue-600 bg-blue-100/80 dark:border-blue-400 dark:bg-blue-950/60"
              : "border-blue-300 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/70 hover:border-blue-500 hover:from-blue-100/70 hover:to-indigo-100/70 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 dark:hover:border-blue-700"
          }`}
        >
          <span className="rounded-2xl bg-[#142B4A] p-4 text-white shadow-lg transition group-hover:scale-105">
            <UploadCloud size={28} />
          </span>

          <span className="mt-5 text-base font-bold text-[#142B4A] dark:text-white">
            {isDragging ? "Drop your documents here" : "Drag and drop your files here"}
          </span>

          <span className="mt-2 text-sm text-[var(--muted-foreground)]">
            or click to browse files from your device
          </span>

          <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-800 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-300">
            <FileText size={15} />
            PDF and DOCX supported
          </span>
        </button>
      </section>

      {/* Document management */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">

        {/* List header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                All Documents
              </h2>
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-[#142B4A] dark:bg-blue-950/60 dark:text-blue-300">
                {filteredDocuments.length}
              </span>
            </div>

            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Search, filter and manage your business files
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 sm:min-w-[220px]">
              <Search
                size={17}
                className="shrink-0 text-blue-700 dark:text-blue-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search documents..."
                aria-label="Search documents"
                className="h-10 w-full min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-blue-500"
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
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-blue-500"
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

        {/* Sorting toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-blue-50/40 px-5 py-3 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
            <SlidersHorizontal size={15} />
            Showing {filteredDocuments.length} of {documents.length} documents
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ArrowDownWideNarrow
              size={15}
              className="text-blue-700 dark:text-blue-400"
            />
            <span className="text-xs text-[var(--muted-foreground)]">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              aria-label="Sort documents"
              className="rounded-lg border border-blue-200 bg-white px-2 py-1.5 text-xs font-semibold text-[#142B4A] outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-blue-200"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
              <option value="largest">Largest first</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-slate-800"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Document list */}
        <div className="divide-y divide-[var(--border)]">
          {filteredDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.035 }}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-blue-50/50 sm:flex-row sm:items-center dark:hover:bg-slate-800/40"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1D4ED8] dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300">
                  <FileText size={23} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[var(--foreground)]">
                    {document.name}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--muted-foreground)]">
                    <span>{document.type}</span>
                    <span>•</span>
                    <span>{document.size}</span>
                    <span>•</span>
                    <span>{document.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-[#142B4A] dark:border-slate-700 dark:bg-slate-800 dark:text-blue-200">
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
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-[#142B4A] transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-200 dark:hover:bg-slate-800"
                >
                  <Eye size={15} />
                  Details
                </button>
              </div>
            </motion.div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-300">
                <Search size={25} />
              </div>

              <h3 className="mt-4 font-bold text-[var(--foreground)]">
                No documents found
              </h3>

              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
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

      {/* AI workspace promotion */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#142B4A] via-[#1E3A5F] to-[#3730A3] p-6 text-white shadow-lg sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-blue-300/15 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
              <Sparkles size={18} />
              Duego AI Workspace
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              Turn your documents into business insights.
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Explore document analysis, extracted details, obligations
              and important business information.
            </p>
          </div>

          <Link
            href="/analysis"
            className="relative z-20 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold !text-[#142B4A] shadow-md transition hover:bg-blue-50"
          >
            <BrainCircuit size={18} className="text-[#142B4A]" />
            <span className="text-[#142B4A]">Open AI Workspace</span>
            <ArrowUpRight size={17} className="text-[#142B4A]" />
          </Link>
        </div>
      </section>

    
      {/* Premium Document Details Modal */}
      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDocument(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-dialog-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Navy Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#142B4A] via-[#1E3A5F] to-[#263F70] p-6 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-300/15 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                    <FileText size={25} className="text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      Document Workspace
                    </p>
                    <h2
                      id="document-dialog-title"
                      className="mt-1 text-xl font-bold text-white"
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
                <p className="text-xs font-medium text-blue-200">
                  SELECTED DOCUMENT
                </p>
                <p className="mt-2 break-all text-base font-bold leading-6 text-white">
                  {selectedDocument.name}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
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

            {/* Information Section */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#142B4A] dark:text-white">
                  File Information
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Details and properties of this document
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* File Type */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <FileText size={17} />
                    <span className="text-xs font-semibold">
                      File Type
                    </span>
                  </div>
                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.type}
                  </p>
                </div>

                {/* File Size */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                    <HardDrive size={17} />
                    <span className="text-xs font-semibold">
                      File Size
                    </span>
                  </div>
                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.size}
                  </p>
                </div>

                {/* Category */}
                <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300">
                    <FolderOpen size={17} />
                    <span className="text-xs font-semibold">
                      Category
                    </span>
                  </div>
                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.category}
                  </p>
                </div>

                {/* Upload Date */}
                <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <Clock3 size={17} />
                    <span className="text-xs font-semibold">
                      Upload Date
                    </span>
                  </div>
                  <p className="mt-3 text-base font-bold text-[#142B4A] dark:text-white">
                    {selectedDocument.date}
                  </p>
                </div>
              </div>

              {/* Status Information */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#142B4A] p-2.5 text-white">
                    <CheckCircle2 size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Current Document Status
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#142B4A] dark:text-white">
                      {selectedDocument.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Notice */}
              <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/70 dark:bg-amber-950/30">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300"
                />
                <p className="text-xs leading-5 text-amber-900 dark:text-amber-200">
                  This is a frontend preview record. Actual file preview,
                  downloading and server-side analysis will be enabled
                  during backend integration.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/analysis"
                  onClick={() => setSelectedDocument(null)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2563EB]"
                >
                  <BrainCircuit size={18} className="text-white" />
                  <span className="text-white">AI Analysis</span>
                  <ArrowUpRight size={16} className="text-white" />
                </Link>

                <button
                  type="button"
                  onClick={() => deleteDocument(selectedDocument.id)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:bg-slate-900 dark:text-red-300 dark:hover:bg-red-950/40"
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

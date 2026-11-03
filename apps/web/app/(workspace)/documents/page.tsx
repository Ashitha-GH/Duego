
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Upload,
  Search,
  FileText,
  FileCheck,
  Clock3,
  AlertCircle,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Filter,
  X,
  FilePlus2,
  BrainCircuit,
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
  Analysed: "bg-emerald-500/10 text-emerald-600",
  Processing: "bg-blue-500/10 text-blue-600",
  Pending: "bg-amber-500/10 text-amber-600",
};

export default function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentItem | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch = document.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || document.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || document.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [documents, search, statusFilter, categoryFilter]);

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    const acceptedFiles = Array.from(files).filter((file) => {
      const validType =
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      return (
        validType ||
        file.name.toLowerCase().endsWith(".pdf") ||
        file.name.toLowerCase().endsWith(".docx")
      );
    });

    if (acceptedFiles.length === 0) {
      setNotice("Please select PDF or DOCX files.");
      return;
    }

    const newDocuments: DocumentItem[] = acceptedFiles.map((file, index) => ({
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
    }));

    setDocuments((current) => [...newDocuments, ...current]);
    setNotice(
      `${newDocuments.length} file(s) added to this preview. Server upload is not connected yet.`
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function deleteDocument(id: number) {
    setDocuments((current) => current.filter((item) => item.id !== id));
    setSelectedDocument(null);
    setNotice("Document removed from this preview.");
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Business Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Documents
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Manage, organize, and analyse your business documents.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Upload size={18} />
          Upload Documents
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <AlertCircle size={19} className="mt-0.5 shrink-0 text-blue-600" />
        <p className="text-sm text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Preview mode:</strong>{" "}
          These records are sample data. Selecting files adds them to this
          browser page only; files are not uploaded to the backend yet.
        </p>
      </div>

      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--foreground)]">
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded-lg p-1 hover:bg-[var(--muted)]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Documents",
            value: documents.length,
            icon: FileText,
            color: "text-blue-600 bg-blue-500/10",
          },
          {
            label: "Analysed",
            value: documents.filter((d) => d.status === "Analysed").length,
            icon: FileCheck,
            color: "text-emerald-600 bg-emerald-500/10",
          },
          {
            label: "Processing",
            value: documents.filter((d) => d.status === "Processing").length,
            icon: BrainCircuit,
            color: "text-violet-600 bg-violet-500/10",
          },
          {
            label: "Pending",
            value: documents.filter((d) => d.status === "Pending").length,
            icon: Clock3,
            color: "text-amber-600 bg-amber-500/10",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted-foreground)]">
                  {item.label}
                </span>
                <span className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold text-[var(--foreground)]">
                {item.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Upload area */}
      <button
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
        className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500/30 bg-blue-500/5 px-5 py-9 text-center transition hover:border-blue-500/60 hover:bg-blue-500/10"
      >
        <span className="rounded-2xl bg-blue-500/10 p-4 text-blue-600">
          <FilePlus2 size={28} />
        </span>
        <span className="mt-4 font-semibold text-[var(--foreground)]">
          Drop your documents here
        </span>
        <span className="mt-2 text-sm text-[var(--muted-foreground)]">
          or click to browse · PDF and DOCX supported
        </span>
      </button>

      {/* Document list */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-[var(--foreground)]">
              All Documents
            </h2>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {filteredDocuments.length} document(s) shown
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Search size={17} className="text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search documents..."
                className="h-10 min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
              <Filter size={16} className="text-[var(--muted-foreground)]" />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 bg-transparent text-sm text-[var(--foreground)] outline-none"
              >
                <option value="All">All statuses</option>
                <option value="Analysed">Analysed</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
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

        <div className="divide-y divide-[var(--border)]">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              className="flex flex-col justify-between gap-4 p-5 transition hover:bg-[var(--muted)]/40 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <FileText size={22} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                    {document.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {document.type} · {document.size} · {document.date}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs text-[var(--foreground)]">
                  {document.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[document.status]}`}
                >
                  {document.status}
                </span>
                <button
                  onClick={() => setSelectedDocument(document)}
                  aria-label={`View ${document.name}`}
                  className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-blue-600"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="px-5 py-12 text-center">
              <FileText
                size={32}
                className="mx-auto text-[var(--muted-foreground)]"
              />
              <p className="mt-3 font-semibold text-[var(--foreground)]">
                No documents found
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Try another search or change your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Document detail panel */}
      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                  <FileText size={22} />
                </div>
                <div>
                  <h2
                    id="document-dialog-title"
                    className="font-bold text-[var(--foreground)]"
                  >
                    Document Details
                  </h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Preview record
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                aria-label="Close details"
                className="rounded-lg p-2 hover:bg-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  File name
                </p>
                <p className="mt-1 break-all text-sm font-semibold text-[var(--foreground)]">
                  {selectedDocument.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    File type
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedDocument.type}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    File size
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedDocument.size}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Category
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedDocument.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Status
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">
                    {selectedDocument.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/analysis"
                onClick={() => setSelectedDocument(null)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <BrainCircuit size={17} />
                AI Analysis
              </Link>
              <button
                onClick={() => deleteDocument(selectedDocument.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/10"
              >
                <Trash2 size={17} />
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

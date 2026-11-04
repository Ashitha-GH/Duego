
"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Upload,
  FileText,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  X,
  BrainCircuit,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

const analysisStages = [
  "Document reading",
  "Information extraction",
  "Risk identification",
];

export default function DocumentWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;

    const isValidType = /\.(pdf|docx)$/i.test(selectedFile.name);
    const maxSize = 20 * 1024 * 1024;

    if (!isValidType) {
      setError("Please select a PDF or DOCX document.");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must not exceed 20 MB.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setProgress(100);
  }

  function reset() {
    setFile(null);
    setProgress(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <section
      id="upload"
      className="border-t border-[#D7E6F8] bg-[#EFF6FF] py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white px-4 py-2 text-sm font-bold text-[#2563EB] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-[#93C5FD]">
            <Sparkles size={16} />
            Smart document intelligence
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#142B4A] dark:text-white sm:text-4xl md:text-5xl">
            Your documents have
            <span className="block text-[#2563EB]">
              more to tell.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#58708F] dark:text-[#A9BEDA] md:text-lg">
            Upload a business document and discover how Duego transforms
            complex information into organised insights, risks and
            actionable obligations.
          </p>
        </motion.div>

        {/* Main workspace */}
        <div className="mt-14 grid items-start gap-7 lg:grid-cols-2">
          {/* Upload card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#D7E6F8] bg-white p-6 shadow-xl shadow-[#142B4A]/5 dark:border-[#263D60] dark:bg-[#142B4A] md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#142B4A] dark:text-white">
                  Upload document
                </h3>
                <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                  Add a document to your workspace
                </p>
              </div>

              <div className="rounded-2xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                <Upload size={23} />
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(event) =>
                selectFile(event.target.files?.[0])
              }
            />

            {/* Drop zone */}
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragging(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                selectFile(event.dataTransfer.files?.[0]);
              }}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              className={`mt-8 flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                dragging
                  ? "border-[#2563EB] bg-[#DBEAFE] dark:bg-[#1E3A5F]"
                  : "border-[#93C5FD] bg-[#F8FBFF] hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#35547B] dark:bg-[#102440] dark:hover:bg-[#1A3455]"
              }`}
            >
              <div className="rounded-2xl bg-[#DBEAFE] p-5 text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                <Upload size={32} />
              </div>

              <p className="mt-5 text-base font-bold text-[#142B4A] dark:text-white">
                Drop your document here
              </p>

              <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                or click to browse your files
              </p>

              <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold !text-white shadow-lg shadow-[#2563EB]/20 transition hover:bg-[#1D4ED8]">
                <FileText size={17} />
                Choose file
              </span>

              <p className="mt-4 text-xs font-medium text-[#58708F] dark:text-[#A9BEDA]">
                PDF or DOCX · Maximum 20 MB
              </p>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-3 text-sm font-semibold text-[#B91C1C] dark:border-[#7F1D1D] dark:bg-[#451A1A] dark:text-[#FCA5A5]">
                {error}
              </div>
            )}

            {/* Selected file */}
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 dark:border-[#35547B] dark:bg-[#102440]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-3 text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                    <FileText size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#142B4A] dark:text-white">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Remove selected file"
                    className="rounded-lg p-2 text-[#142B4A] transition hover:bg-white hover:text-[#DC2626] dark:text-white dark:hover:bg-[#1E3A5F]"
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#BFDBFE] dark:bg-[#263D60]">
                  <motion.div
                    className="h-full rounded-full bg-[#2563EB]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                    File selected · Demo only
                  </span>
                  <span className="font-bold text-[#142B4A] dark:text-white">
                    {progress}%
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#166534] dark:text-[#86EFAC]">
                  <CheckCircle2 size={15} />
                  File selected successfully
                </p>
              </motion.div>
            )}

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#EFF6FF] p-4 dark:bg-[#102440]">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-[#2563EB] dark:text-[#93C5FD]"
              />
              <p className="text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                This is a frontend preview. Your selected file stays in the
                browser and is not uploaded to a server or processed by AI.
              </p>
            </div>
          </motion.div>

          {/* AI preview card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-[#D7E6F8] bg-white p-6 shadow-xl shadow-[#142B4A]/5 dark:border-[#263D60] dark:bg-[#142B4A] md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#142B4A] dark:text-white">
                  AI analysis preview
                </h3>
                <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                  See what Duego can identify
                </p>
              </div>

              <div className="rounded-2xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                <BrainCircuit size={24} />
              </div>
            </div>

            {/* Analysis stages */}
            <div className="mt-8 rounded-2xl border border-[#D7E6F8] bg-[#F8FBFF] p-5 dark:border-[#263D60] dark:bg-[#102440]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#142B4A] dark:text-white">
                  Analysis stages
                </span>
                <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                  Example
                </span>
              </div>

              {analysisStages.map((stage, index) => (
                <div
                  key={stage}
                  className="mt-5 flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                    <CheckCircle2 size={18} />
                  </div>

                  <span className="flex-1 text-sm font-semibold text-[#142B4A] dark:text-white">
                    {stage}
                  </span>

                  <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">
                    {index + 1}/3
                  </span>
                </div>
              ))}
            </div>

            {/* Risk indicator */}
            <div className="mt-5 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-5 dark:border-[#785B27] dark:bg-[#382B18]">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  size={19}
                  className="text-[#B7791F]"
                />
                <span className="font-bold text-[#142B4A] dark:text-white">
                  Risk indicator
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm text-[#58708F] dark:text-[#E8D5A8]">
                  Example risk level
                </span>
                <span className="rounded-full bg-[#FDE68A] px-3 py-1 text-xs font-bold text-[#78350F]">
                  Medium
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#E8D5A8]">
                A sample agreement contains a renewal condition that may
                require review before its deadline.
              </p>
            </div>

            {/* Deadline */}
            <div className="mt-5 rounded-2xl border border-[#D7E6F8] p-5 dark:border-[#263D60]">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={19}
                  className="text-[#2563EB] dark:text-[#93C5FD]"
                />
                <span className="font-bold text-[#142B4A] dark:text-white">
                  Extracted deadline
                </span>
              </div>

              <p className="mt-4 text-sm font-bold text-[#142B4A] dark:text-white">
                Agreement renewal review
              </p>

              <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                Example date · 15 December 2026
              </p>
            </div>

            {/* AI summary */}
            <div className="mt-5 rounded-2xl bg-[#EFF6FF] p-5 dark:bg-[#102440]">
              <div className="flex items-center gap-2 font-bold text-[#2563EB] dark:text-[#93C5FD]">
                <FileCheck2 size={19} />
                AI summary preview
              </div>

              <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                This sample agreement outlines vendor responsibilities,
                renewal conditions and important review dates. Confirm all
                extracted details before taking action.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              <LockKeyhole size={15} />
              Illustrative information, not actual AI results
            </div>
          </motion.div>
        </div>

        {/* Bottom message */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#142B4A] dark:text-white">
            <ShieldCheck size={18} className="text-[#2563EB]" />
            Organise documents. Understand obligations. Stay prepared.
          </div>

          <a
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-6 py-3 text-sm font-bold !text-white transition hover:bg-[#1E3A5F]"
          >
            Get started with Duego
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}


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
} from "lucide-react";

export default function DocumentWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;

    const valid =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf") ||
      selectedFile.name.toLowerCase().endsWith(".docx");

    if (!valid) {
      setError("Please select a PDF or DOCX document.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setProgress(0);
    setUploading(true);

    let current = 0;

    const interval = setInterval(() => {
      current = Math.min(current + 10, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setUploading(false);
      }
    }, 120);
  }

  function reset() {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <section
      id="upload"
      className="border-t border-border bg-surface-secondary py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Smart document intelligence
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Your documents have
            <span className="text-primary"> more to tell.</span>
          </h2>

          <p className="mt-5 leading-7 text-muted">
            Upload a business document and explore how Duego turns complex
            information into organised insights and actionable obligations.
          </p>
        </motion.div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
          {/* Document upload */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Upload document</h3>
                <p className="mt-1 text-sm text-muted">
                  Add a PDF or DOCX file
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Upload size={22} />
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf"
              className="hidden"
              onChange={(event) =>
                selectFile(event.target.files?.[0])
              }
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                selectFile(event.dataTransfer.files?.[0]);
              }}
              className={`mt-8 flex min-h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                dragging
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface-secondary hover:border-primary hover:bg-primary/5"
              }`}
            >
              <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                <Upload size={30} />
              </div>

              <p className="mt-5 font-semibold">
                Drop your document here or browse
              </p>

              <p className="mt-2 text-sm text-muted">
                PDF and DOCX supported
              </p>

              <span className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
                Choose file
              </span>
            </button>

            {error && (
              <p className="mt-4 text-sm font-medium text-danger">
                {error}
              </p>
            )}

            {file && (
              <div className="mt-5 rounded-2xl border border-border bg-surface-secondary p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <FileText size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Remove selected file"
                    className="rounded-lg p-2 text-muted hover:bg-background hover:text-danger"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-xs">
                  <span className="text-muted">
                    {uploading
                      ? "Simulating upload..."
                      : "Demo upload complete"}
                  </span>

                  <span className="font-semibold text-primary">
                    {progress}%
                  </span>
                </div>

                {!uploading && (
                  <p className="mt-3 flex items-center gap-2 text-xs font-medium text-success">
                    <CheckCircle2 size={15} />
                    Demo file selected successfully
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <ShieldCheck size={16} />
              This is a local UI demo. Files are not sent to a server.
            </div>
          </motion.div>

          {/* AI analysis preview */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  AI analysis preview
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Example of extracted document insights
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Sparkles size={22} />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl bg-surface-secondary p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    Analysis stages
                  </span>
                  <span className="text-xs text-success">Example</span>
                </div>

                {[
                  "Document reading",
                  "Information extraction",
                  "Risk identification",
                ].map((stage) => (
                  <div
                    key={stage}
                    className="mt-5 flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
                      <CheckCircle2 size={17} />
                    </div>

                    <span className="flex-1 text-sm font-medium">
                      {stage}
                    </span>

                    <span className="text-xs text-success">
                      Complete
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-warning" />
                  <span className="font-semibold">Risk indicator</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted">
                    Example risk level
                  </span>

                  <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                    Medium
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted">
                  A sample agreement contains a renewal condition that may
                  require review before its deadline.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-primary" />
                  <span className="font-semibold">
                    Extracted deadline
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium">
                  Agreement renewal review
                </p>

                <p className="mt-1 text-sm text-muted">
                  Example date · 15 December 2026
                </p>
              </div>

              <div className="rounded-2xl bg-primary/5 p-5">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <FileCheck2 size={18} />
                  AI summary preview
                </div>

                <p className="mt-3 text-sm leading-6 text-muted">
                  This sample agreement outlines vendor responsibilities,
                  renewal conditions, and important review dates. Confirm all
                  extracted details before taking action.
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-muted">
              Illustrative analysis only · Not generated from the uploaded file
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

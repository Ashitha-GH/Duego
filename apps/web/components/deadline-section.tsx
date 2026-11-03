
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  Bell,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  CircleCheck,
} from "lucide-react";

const deadlines = [
  {
    id: 1,
    day: 5,
    month: "NOV",
    title: "Tax document submission",
    document: "Financial Report.pdf",
    type: "Overdue",
    color: "danger",
  },
  {
    id: 2,
    day: 9,
    month: "NOV",
    title: "Vendor agreement review",
    document: "Vendor Agreement.pdf",
    type: "Upcoming",
    color: "warning",
  },
  {
    id: 3,
    day: 15,
    month: "NOV",
    title: "Insurance renewal",
    document: "Insurance Policy.pdf",
    type: "Upcoming",
    color: "primary",
  },
  {
    id: 4,
    day: 22,
    month: "NOV",
    title: "Payment obligation",
    document: "Service Contract.pdf",
    type: "Scheduled",
    color: "success",
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DeadlineSection() {
  const [selectedDay, setSelectedDay] = useState(9);
  const [monthOffset, setMonthOffset] = useState(0);

  const selectedDeadline = deadlines.find(
    (deadline) => deadline.day === selectedDay
  );

  const monthDate = new Date(2026, 10 + monthOffset, 1);
  const monthName = monthDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = (monthDate.getDay() + 6) % 7;
  const totalDays = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate();

  const visibleDeadlines =
    monthOffset === 0
      ? deadlines
      : [];

  return (
    <section
      id="deadlines"
      className="border-t border-border bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <CalendarDays size={16} />
            Stay ahead of every deadline
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Never let an important date
            <span className="text-primary"> slip away.</span>
          </h2>

          <p className="mt-5 leading-7 text-muted">
            Bring obligations, renewals, and payment reminders together
            in one organised calendar.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Deadline calendar</h3>
                <p className="mt-1 text-sm text-muted">
                  Select a date to view its activity
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => setMonthOffset((value) => value - 1)}
                  className="rounded-lg border border-border p-2 hover:bg-surface-secondary"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setMonthOffset((value) => value + 1)}
                  className="rounded-lg border border-border p-2 hover:bg-surface-secondary"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <h4 className="text-lg font-bold">{monthName}</h4>
              <span className="text-xs text-muted">Demo calendar</span>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-semibold text-muted"
                >
                  {day}
                </div>
              ))}

              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}

              {Array.from({ length: totalDays }, (_, index) => {
                const day = index + 1;
                const deadline = visibleDeadlines.find(
                  (item) => item.day === day
                );
                const active = selectedDay === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-all ${
                      active
                        ? "bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20"
                        : "hover:bg-surface-secondary"
                    }`}
                  >
                    {day}
                    {deadline && (
                      <span
                        className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                          active
                            ? "bg-white"
                            : deadline.color === "danger"
                              ? "bg-danger"
                              : deadline.color === "warning"
                                ? "bg-warning"
                                : deadline.color === "success"
                                  ? "bg-success"
                                  : "bg-primary"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-5 border-t border-border pt-5">
              {[
                ["Overdue", "bg-danger"],
                ["Upcoming", "bg-warning"],
                ["Scheduled", "bg-success"],
              ].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2 text-xs text-muted">
                  <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Deadline details */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Reminder centre</h3>
                <p className="mt-1 text-sm text-muted">
                  Sample business obligations
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Bell size={21} />
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <AnimatePresence mode="wait">
                {selectedDeadline ? (
                  <motion.div
                    key={selectedDeadline.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-primary/20 bg-primary/5 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold">
                        Selected deadline
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {selectedDeadline.type}
                      </span>
                    </div>
                    <h4 className="mt-4 text-lg font-bold">
                      {selectedDeadline.title}
                    </h4>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <FileText size={15} />
                      {selectedDeadline.document}
                    </p>
                    <p className="mt-4 text-sm font-semibold">
                      {selectedDeadline.day} November 2026
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-dashed border-border p-6 text-center"
                  >
                    <CircleCheck size={26} className="mx-auto text-success" />
                    <p className="mt-3 font-semibold">No demo deadline</p>
                    <p className="mt-1 text-sm text-muted">
                      No sample obligation is scheduled for this date.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-danger/10 p-2 text-danger">
                  <AlertTriangle size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Overdue alerts</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Highlight obligations that have passed their due dates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-warning/10 p-2 text-warning">
                  <Clock3 size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Advance reminders</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Plan ahead before important business actions are due.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-success/10 p-2 text-success">
                  <CheckCircle2 size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Action tracking</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Keep important obligations organised and visible.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 border-t border-border pt-4 text-center text-xs text-muted">
              Illustrative calendar · Sample dates, not live reminders
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

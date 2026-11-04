
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
  CalendarCheck,
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

  const monthDate = new Date(2026, 10 + monthOffset, 1);

  const monthName = monthDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const monthCode = monthDate
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();

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

  const selectedDeadline = visibleDeadlines.find(
    (deadline) => deadline.day === selectedDay
  );

  function changeMonth(offset: number) {
    setMonthOffset((current) => current + offset);
    setSelectedDay(0);
  }

  function goToToday() {
    setMonthOffset(0);
    setSelectedDay(9);
  }

  return (
    <section
      id="deadlines"
      className="border-t border-[#D7E6F8] bg-white py-20 dark:border-[#263D60] dark:bg-[#0B1930] md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-2 text-sm font-bold text-[#2563EB] dark:border-[#263D60] dark:bg-[#142B4A] dark:text-[#93C5FD]">
            <CalendarDays size={16} />
            Stay ahead of every deadline
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#142B4A] dark:text-white sm:text-4xl md:text-5xl">
            Never let an important date
            <span className="block text-[#2563EB]">
              slip away.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#58708F] dark:text-[#A9BEDA] md:text-lg">
            Bring obligations, renewals and payment reminders together
            in one organised calendar.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="mt-14 grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#D7E6F8] bg-[#F8FBFF] p-6 shadow-xl shadow-[#142B4A]/5 dark:border-[#263D60] dark:bg-[#142B4A] md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-[#DBEAFE] p-2.5 text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                    <CalendarCheck size={21} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#142B4A] dark:text-white">
                    Deadline calendar
                  </h3>
                </div>

                <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                  Select a date to view its activity
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-lg border border-[#BFDBFE] bg-white px-3 py-2 text-xs font-bold text-[#2563EB] transition hover:bg-[#DBEAFE] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-[#93C5FD]"
                >
                  Demo month
                </button>

                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => changeMonth(-1)}
                  className="rounded-xl border border-[#D7E6F8] bg-white p-2.5 text-[#142B4A] transition hover:border-[#2563EB] hover:bg-[#DBEAFE] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-white dark:hover:bg-[#263D60]"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => changeMonth(1)}
                  className="rounded-xl border border-[#D7E6F8] bg-white p-2.5 text-[#142B4A] transition hover:border-[#2563EB] hover:bg-[#DBEAFE] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-white dark:hover:bg-[#263D60]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Month heading */}
            <div className="mt-9 flex items-center justify-between border-b border-[#D7E6F8] pb-5 dark:border-[#263D60]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#93C5FD]">
                  Calendar overview
                </p>
                <h4 className="mt-1 text-2xl font-extrabold text-[#142B4A] dark:text-white">
                  {monthName}
                </h4>
              </div>

              <span className="rounded-full bg-[#DBEAFE] px-3 py-1.5 text-xs font-bold text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                Demo calendar
              </span>
            </div>

            {/* Calendar grid */}
            <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-bold text-[#58708F] dark:text-[#A9BEDA]"
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

                const dotColor =
                  deadline?.color === "danger"
                    ? "bg-[#DC2626]"
                    : deadline?.color === "warning"
                      ? "bg-[#D6A84B]"
                      : deadline?.color === "success"
                        ? "bg-[#16A34A]"
                        : "bg-[#2563EB]";

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    aria-label={`${monthName} ${day}${deadline ? `, ${deadline.title}` : ""}`}
                    aria-pressed={active}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-[#142B4A] !text-white shadow-lg shadow-[#142B4A]/20 dark:bg-[#2563EB]"
                        : "text-[#142B4A] hover:bg-[#DBEAFE] dark:text-white dark:hover:bg-[#1E3A5F]"
                    }`}
                  >
                    {day}

                    {deadline && (
                      <span
                        className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                          active ? "bg-white" : dotColor
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#D7E6F8] pt-5 dark:border-[#263D60]">
              {[
                {
                  label: "Overdue",
                  color: "bg-[#DC2626]",
                },
                {
                  label: "Upcoming",
                  color: "bg-[#D6A84B]",
                },
                {
                  label: "Scheduled",
                  color: "bg-[#16A34A]",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs font-semibold text-[#58708F] dark:text-[#A9BEDA]"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reminder centre */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-[#D7E6F8] bg-white p-6 shadow-xl shadow-[#142B4A]/5 dark:border-[#263D60] dark:bg-[#142B4A] md:p-8"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-extrabold text-[#142B4A] dark:text-white">
                  Reminder centre
                </h3>

                <p className="mt-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                  Sample business obligations
                </p>
              </div>

              <div className="rounded-2xl bg-[#DBEAFE] p-3 text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD]">
                <Bell size={22} />
              </div>
            </div>

            {/* Selected date details */}
            <div className="mt-7">
              <AnimatePresence mode="wait">
                {selectedDeadline ? (
                  <motion.div
                    key={selectedDeadline.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 dark:border-[#35547B] dark:bg-[#102440]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm font-bold text-[#142B4A] dark:text-white">
                        Selected deadline
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          selectedDeadline.type === "Overdue"
                            ? "bg-[#FEE2E2] text-[#B91C1C]"
                            : selectedDeadline.type === "Upcoming"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#DCFCE7] text-[#166534]"
                        }`}
                      >
                        {selectedDeadline.type}
                      </span>
                    </div>

                    <h4 className="mt-5 text-lg font-extrabold text-[#142B4A] dark:text-white">
                      {selectedDeadline.title}
                    </h4>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                      <FileText size={16} />
                      <span className="break-all">
                        {selectedDeadline.document}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-[#BFDBFE] pt-4 text-sm font-bold text-[#2563EB] dark:border-[#35547B] dark:text-[#93C5FD]">
                      <CalendarDays size={17} />
                      {selectedDeadline.day} {monthName}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border-2 border-dashed border-[#BFDBFE] bg-[#F8FBFF] p-8 text-center dark:border-[#35547B] dark:bg-[#102440]"
                  >
                    <CircleCheck
                      size={30}
                      className="mx-auto text-[#2563EB] dark:text-[#93C5FD]"
                    />

                    <p className="mt-4 font-bold text-[#142B4A] dark:text-white">
                      No demo deadline
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                      No sample obligation is scheduled for this date.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reminder features */}
            <div className="mt-7 space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#FEE2E2] p-2.5 text-[#DC2626]">
                  <AlertTriangle size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Overdue alerts
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    Highlight obligations that have passed their due dates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#FEF3C7] p-2.5 text-[#A16207]">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Advance reminders
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    Plan ahead before important business actions are due.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#DCFCE7] p-2.5 text-[#15803D]">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Action tracking
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    Keep important obligations organised and visible.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-[#D7E6F8] pt-5 text-center dark:border-[#263D60]">
              <p className="text-xs text-[#58708F] dark:text-[#A9BEDA]">
                Illustrative calendar · Sample dates, not live reminders
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

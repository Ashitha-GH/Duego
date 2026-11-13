
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] text-[#142B4A] shadow-sm transition-all duration-200 hover:border-[#2563EB] hover:bg-[#DBEAFE] hover:text-[#2563EB] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-[#FDE68A] dark:hover:border-[#93C5FD] dark:hover:bg-[#263D60]"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

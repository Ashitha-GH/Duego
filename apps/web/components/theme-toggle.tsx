
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <button
        type="button"
        disabled
        aria-label="Loading theme"
        title="Loading theme"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] text-[#142B4A] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-white"
      >
        <Sun size={18} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] text-[#142B4A] shadow-sm transition-all duration-200 hover:border-[#2563EB] hover:bg-[#DBEAFE] hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-[#FDE68A] dark:hover:border-[#93C5FD] dark:hover:bg-[#263D60] dark:focus-visible:ring-offset-[#0B1930]"
    >
      {isDark ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
}

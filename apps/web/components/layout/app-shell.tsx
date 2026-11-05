
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";

import {
  LayoutDashboard,
  Files,
  BrainCircuit,
  CreditCard,
  CalendarDays,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileCheck,
  Sparkles,
  Building2,
  Receipt,
  Crown,
  Home,
} from "lucide-react";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Documents", href: "/documents", icon: Files },
      { label: "AI Analysis", href: "/analysis", icon: BrainCircuit },
    ],
  },
  {
    title: "BUSINESS MANAGEMENT",
    items: [
      { label: "Obligations", href: "/obligations", icon: FileCheck },
      { label: "Payments", href: "/payments", icon: CreditCard },
      { label: "Deadlines", href: "/deadlines", icon: CalendarDays },
      { label: "Reminders", href: "/reminders", icon: Bell },
    ],
  },
  {
    title: "BILLING & PLANS",
    items: [
      { label: "Subscription", href: "/subscription", icon: Crown },
      { label: "Billing History", href: "/billing-history", icon: Receipt },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/documents": "Documents",
  "/analysis": "AI Analysis",
  "/obligations": "Obligations",
  "/payments": "Payments",
  "/business-payments": "Business Payments",
  "/subscription": "Subscription Plans",
  "/billing-history": "Billing History",
  "/deadlines": "Deadlines",
  "/reminders": "Reminders",
  "/settings": "Settings",
};

type SidebarProps = {
  collapsed: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
};

function SidebarContent({
  collapsed,
  onNavigate,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* BRAND */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#263D60] px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-xl font-extrabold text-white shadow-lg shadow-[#2563EB]/25"
          >
            D
          </motion.div>

          {!collapsed && (
            <div className="min-w-0">
              <span className="block text-xl font-extrabold tracking-tight text-white">
                Duego
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.18em] text-[#93C5FD]">
                BUSINESS WORKSPACE
              </span>
            </div>
          )}
        </Link>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-xl p-2 text-[#BFDBFE] transition hover:bg-[#1E3A5F] hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto px-3 py-7">
        {navigation.map((group) => (
          <div key={group.title} className="mb-8">
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-extrabold tracking-[0.18em] text-[#93C5FD]">
                {group.title}
              </p>
            )}

            <div className="space-y-1.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    whileHover={{ x: collapsed ? 0 : 4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                        active
                          ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20"
                          : "text-[#BFDBFE] hover:bg-[#1E3A5F] hover:text-white"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-navigation-indicator"
                          className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#D6A84B]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={active ? 2.5 : 2}
                        className="relative z-10 shrink-0"
                      />

                      {!collapsed && (
                        <span className="relative z-10">{item.label}</span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* PREFERENCES */}
        <div className="border-t border-[#263D60] pt-5">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-extrabold tracking-[0.18em] text-[#93C5FD]">
              PREFERENCES
            </p>
          )}

          <motion.div whileHover={{ x: collapsed ? 0 : 4 }}>
            <Link
              href="/settings"
              onClick={onNavigate}
              title={collapsed ? "Settings" : undefined}
              aria-current={isActive("/settings") ? "page" : undefined}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${
                isActive("/settings")
                  ? "bg-[#2563EB] text-white"
                  : "text-[#BFDBFE] hover:bg-[#1E3A5F] hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {isActive("/settings") && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#D6A84B]" />
              )}

              <Settings size={19} className="shrink-0" />
              {!collapsed && "Settings"}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="shrink-0 border-t border-[#263D60] p-4">
        <Link
          href="/login"
          onClick={onNavigate}
          title={collapsed ? "Sign out" : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#BFDBFE] transition hover:bg-[#451A1A] hover:text-[#FCA5A5] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={19} className="shrink-0" />
          {!collapsed && "Sign out"}
        </Link>
      </div>
    </>
  );
}

export default function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  const currentPage =
    pageTitles[pathname] ??
    Object.entries(pageTitles).find(
      ([path]) => path !== "/" && pathname.startsWith(`${path}/`)
    )?.[1] ??
    "Business Workspace";

  return (
    <div className="flex min-h-screen bg-[#F8FBFF] text-[#142B4A] dark:bg-[#0B1930] dark:text-white">

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-[#263D60] bg-[#142B4A] transition-[width] duration-300 lg:flex ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent collapsed={collapsed} />

        {/* COLLAPSE BUTTON */}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-[#BFDBFE] bg-white text-[#142B4A] shadow-md transition hover:bg-[#DBEAFE] lg:flex"
        >
          {collapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>
      </aside>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close navigation overlay"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-[#081426]/75 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 32,
              }}
              className="absolute inset-y-0 left-0 flex w-[min(18rem,85vw)] flex-col border-r border-[#263D60] bg-[#142B4A] shadow-2xl"
            >
              <SidebarContent
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN APPLICATION */}
      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-[#D7E6F8] bg-white/95 px-4 backdrop-blur-xl dark:border-[#263D60] dark:bg-[#102440]/95 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-2.5 text-[#142B4A] transition hover:bg-[#DBEAFE] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Building2
                  size={17}
                  className="shrink-0 text-[#2563EB] dark:text-[#93C5FD]"
                />

                <p className="truncate text-sm font-extrabold text-[#142B4A] dark:text-white sm:text-base">
                  {currentPage}
                </p>
              </div>

              <p className="mt-1 hidden text-xs text-[#58708F] dark:text-[#A9BEDA] sm:block">
                Manage your business with Duego
              </p>
            </div>
          </div>

          {/* HEADER ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/reminders"
              aria-label="View notifications"
              title="Notifications"
              className="relative rounded-xl border border-[#D7E6F8] bg-[#F8FBFF] p-2.5 text-[#142B4A] transition hover:border-[#2563EB] hover:bg-[#DBEAFE] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:text-white dark:hover:bg-[#263D60]"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#D6A84B] dark:border-[#1E3A5F]" />
            </Link>

            <ThemeToggle />

            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-white p-1.5 transition hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#35547B] dark:bg-[#1E3A5F] dark:hover:bg-[#263D60] sm:px-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-sm font-extrabold text-white">
                U
              </div>

              <span className="hidden text-sm font-bold text-[#142B4A] dark:text-white sm:block">
                My Account
              </span>
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-[#D7E6F8] bg-white px-5 py-5 text-center dark:border-[#263D60] dark:bg-[#102440]">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
            <Sparkles size={14} className="text-[#D6A84B]" />
            <span>
              © 2026 Duego · Business Document Intelligence
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

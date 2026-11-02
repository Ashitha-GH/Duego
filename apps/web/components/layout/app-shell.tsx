
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
];

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

  return (
    <>
      <div className="flex h-20 items-center justify-between border-b border-border px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
            D
          </div>

          {!collapsed && (
            <span className="text-xl font-bold tracking-tight">Duego</span>
          )}
        </Link>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-muted hover:bg-surface-secondary lg:hidden"
          >
            <X size={19} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        {navigation.map((group) => (
          <div key={group.title} className="mb-8">
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-muted">
                {group.title}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/15"
                        : "text-muted hover:bg-surface-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon size={19} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="border-t border-border pt-5">
          <Link
            href="/settings"
            onClick={onNavigate}
            title={collapsed ? "Settings" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
              pathname === "/settings"
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:bg-surface-secondary hover:text-foreground"
            }`}
          >
            <Settings size={19} className="shrink-0" />
            {!collapsed && "Settings"}
          </Link>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <Link
          href="/login"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-danger/10 hover:text-danger"
        >
          <LogOut size={19} />
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

  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border bg-surface transition-[width] duration-300 lg:flex ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent collapsed={collapsed} />

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm hover:text-primary lg:flex"
        >
          {collapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-border bg-surface shadow-2xl">
            <SidebarContent
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
              onClose={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main application */}
      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="rounded-xl border border-border p-2.5 text-muted hover:bg-surface-secondary lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-sm font-bold">Business Workspace</p>
              <p className="hidden text-xs text-muted sm:block">
                Manage your business with Duego
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/reminders"
              aria-label="View notifications"
              className="rounded-xl border border-border p-2.5 text-muted hover:bg-surface-secondary hover:text-primary"
            >
              <Bell size={19} />
            </Link>

            <ThemeToggle />

            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-xl border border-border p-2 hover:bg-surface-secondary sm:px-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                U
              </div>

              <span className="hidden text-sm font-semibold sm:block">
                My Account
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">
          {children}
        </main>

        <footer className="border-t border-border px-6 py-5 text-center text-xs text-muted">
          © 2026 Duego · Business Document Intelligence
        </footer>
      </div>
    </div>
  );
}

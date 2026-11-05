
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import {
  User,
  Building2,
  Bell,
  BellRing,
  ShieldCheck,
  CreditCard,
  Save,
  Mail,
  Phone,
  MapPin,
  Lock,
  CheckCircle2,
  Moon,
  Sun,
  Globe,
  X,
  Sparkles,
  Receipt,
  ArrowRight,
  Info,
  Crown,
  Settings2,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Zap,
} from "lucide-react";

import {
  PLAN_DETAILS,
  type PlanType,
} from "@/lib/subscription/feature-config";

type SettingsTab =
  | "profile"
  | "business"
  | "notifications"
  | "security"
  | "subscription";

const tabs: {
  id: SettingsTab;
  label: string;
  description: string;
  icon: typeof User;
}[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal account information",
    icon: User,
  },
  {
    id: "business",
    label: "Business Profile",
    description: "Your business details",
    icon: Building2,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Notification preferences",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    description: "Password and protection",
    icon: ShieldCheck,
  },
  {
    id: "subscription",
    label: "Subscription",
    description: "Plan and billing details",
    icon: CreditCard,
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function SettingsPage() {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");

  const [profile, setProfile] = useState({
    name: "Demo User",
    email: "user@example.com",
    phone: "",
    role: "Business Owner",
  });

  const [business, setBusiness] = useState({
    name: "My Business",
    type: "Private Limited",
    email: "",
    phone: "",
    address: "",
    website: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    deadlines: true,
    payments: true,
    documentAnalysis: true,
    reminders: true,
    marketing: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const { theme, setTheme } = useTheme();

  // DEMO SUBSCRIPTION
  // Later replace this with the logged-in user's backend subscription.
  const currentPlan: PlanType = "free";
  const currentPlanDetails = PLAN_DETAILS[currentPlan];

  function showSavedNotice(message: string) {
    setSaved(true);
    setNotice(message);

    window.setTimeout(() => setSaved(false), 2500);
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    showSavedNotice(
      "Settings updated in this temporary preview. Changes have not been saved to your account."
    );
  }

  function updateNotification(
    key: keyof typeof notifications
  ) {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function updateProfile(
    key: keyof typeof profile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateBusiness(
    key: keyof typeof business,
    value: string
  ) {
    setBusiness((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updatePassword(
    key: keyof typeof passwords,
    value: string
  ) {
    setPasswords((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwords.next.length < 8) {
      setNotice("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setNotice("New password and confirmation do not match.");
      return;
    }

    setNotice(
      "Password validation completed in preview mode. Your actual account password has not been changed."
    );

    setPasswords({
      current: "",
      next: "",
      confirm: "",
    });
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-[#142B4A] p-7 text-white md:p-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="relative flex items-center justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#93C5FD]">
              <Settings2 size={17} />
              WORKSPACE CONFIGURATION
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Settings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#DBEAFE]">
              Manage your personal information, business profile,
              notifications, security and subscription preferences.
            </p>
          </div>

          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] sm:flex">
            <Settings2 size={32} className="text-white" />
          </div>
        </div>
      </section>

      {/* PREVIEW NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
        <Info size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />

        <p className="text-sm leading-6 text-[#142B4A] dark:text-[#DBEAFE]">
          <strong>Preview mode:</strong> Profile, business and
          notification settings are currently stored in temporary
          page state. They are not saved to your backend account yet.
        </p>
      </div>

      {/* NOTICE */}
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 text-sm text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
        >
          <p className="leading-6">{notice}</p>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notice"
            className="shrink-0 rounded-lg p-1 hover:bg-[#DBEAFE] dark:hover:bg-[#142B4A]"
          >
            <X size={17} />
          </button>
        </motion.div>
      )}

      {/* MAIN SETTINGS LAYOUT */}
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

        {/* SIDEBAR */}
        <aside className="h-fit rounded-2xl border border-[#D7E6F8] bg-white p-4 dark:border-[#263D60] dark:bg-[#142B4A]">
          <div className="px-3 pb-4 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Settings Menu
            </p>

            <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              Manage your workspace
            </p>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setNotice("");
                    setSaved(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-[#142B4A] text-white shadow-md"
                      : "text-[#58708F] hover:bg-[#EFF6FF] hover:text-[#142B4A] dark:text-[#A9BEDA] dark:hover:bg-[#203D65] dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      active
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#DBEAFE] text-[#2563EB]"
                    }`}
                  >
                    <Icon size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">
                      {tab.label}
                    </span>

                    <span
                      className={`mt-0.5 block text-xs ${
                        active
                          ? "text-[#DBEAFE]"
                          : "text-[#58708F] dark:text-[#A9BEDA]"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER */}
          <div className="mt-5 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#2563EB]" />

              <p className="text-xs font-bold text-[#142B4A] dark:text-white">
                Account Settings
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
              Keep your account and business information up to date.
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 rounded-2xl border border-[#D7E6F8] bg-white p-5 dark:border-[#263D60] dark:bg-[#142B4A] sm:p-7">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={saveSettings} className="space-y-7">
              <SectionHeading
                title="Personal Information"
                description="Manage your personal account details."
                icon={User}
              />

              <div className="flex flex-col gap-4 rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#203D65] sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-2xl font-bold text-white">
                  {profile.name.trim().charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                  <p className="text-lg font-bold text-[#142B4A] dark:text-white">
                    {profile.name || "Your Name"}
                  </p>

                  <p className="mt-1 text-sm text-[#58708F] dark:text-[#A9BEDA]">
                    {profile.role}
                  </p>

                  <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                    Profile avatar preview
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  value={profile.name}
                  onChange={(value) => updateProfile("name", value)}
                  icon={<User size={17} />}
                  required
                />

                <Field
                  label="Email Address"
                  value={profile.email}
                  onChange={(value) => updateProfile("email", value)}
                  icon={<Mail size={17} />}
                  type="email"
                  required
                />

                <Field
                  label="Phone Number"
                  value={profile.phone}
                  onChange={(value) => updateProfile("phone", value)}
                  icon={<Phone size={17} />}
                />

                <Field
                  label="Role"
                  value={profile.role}
                  onChange={(value) => updateProfile("role", value)}
                  icon={<BriefcaseBusiness size={17} />}
                />
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {/* BUSINESS PROFILE */}
          {activeTab === "business" && (
            <form onSubmit={saveSettings} className="space-y-7">
              <SectionHeading
                title="Business Information"
                description="Manage the details used to organize your business documents."
                icon={Building2}
              />

              <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]">
                <div className="flex items-center gap-2">
                  <Building2 size={19} className="text-[#2563EB]" />

                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Business Details
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                  These details are intended to help organize business
                  documents and account information.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Business Name"
                  value={business.name}
                  onChange={(value) => updateBusiness("name", value)}
                  icon={<Building2 size={17} />}
                  required
                />

                <Field
                  label="Business Type"
                  value={business.type}
                  onChange={(value) => updateBusiness("type", value)}
                  icon={<Building2 size={17} />}
                />

                <Field
                  label="Business Email"
                  value={business.email}
                  onChange={(value) => updateBusiness("email", value)}
                  icon={<Mail size={17} />}
                  type="email"
                />

                <Field
                  label="Business Phone"
                  value={business.phone}
                  onChange={(value) => updateBusiness("phone", value)}
                  icon={<Phone size={17} />}
                />

                <Field
                  label="Website"
                  value={business.website}
                  onChange={(value) => updateBusiness("website", value)}
                  icon={<Globe size={17} />}
                />

                <Field
                  label="Business Address"
                  value={business.address}
                  onChange={(value) => updateBusiness("address", value)}
                  icon={<MapPin size={17} />}
                />
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-7">
              <SectionHeading
                title="Notification Preferences"
                description="Choose which types of notifications you would like to receive."
                icon={Bell}
              />

              <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]">
                <div className="flex items-center gap-2">
                  <BellRing size={19} className="text-[#2563EB]" />

                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Notification Controls
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                  Toggle your preferred notification categories.
                  Actual delivery requires backend notification integration.
                </p>
              </div>

              <div className="space-y-3">
                {(
                  [
                    ["email", "Email Notifications", "Receive updates through email."],
                    ["deadlines", "Deadline Alerts", "Get notified about upcoming and overdue deadlines."],
                    ["payments", "Payment Notifications", "Receive payment status updates."],
                    ["documentAnalysis", "AI Document Analysis", "Get notified when document analysis is ready."],
                    ["reminders", "Reminder Notifications", "Receive your scheduled reminder alerts."],
                    ["marketing", "Product Updates", "Receive announcements and product news."],
                  ] as const
                ).map(([key, title, description]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4 rounded-xl border border-[#D7E6F8] p-4 transition hover:bg-[#EFF6FF] dark:border-[#263D60] dark:hover:bg-[#203D65]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                        {title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                        {description}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-label={title}
                      aria-checked={notifications[key]}
                      onClick={() => updateNotification(key)}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                        notifications[key]
                          ? "bg-[#2563EB]"
                          : "bg-[#A9BEDA]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                          notifications[key] ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    showSavedNotice(
                      "Notification preferences updated in preview mode. They have not been saved to your account."
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
                >
                  {saved ? <CheckCircle2 size={17} /> : <Save size={17} />}
                  {saved ? "Saved (preview)" : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <form onSubmit={submitPassword} className="space-y-7">
              <SectionHeading
                title="Security Settings"
                description="Manage your password and account security preferences."
                icon={ShieldCheck}
              />

              <div className="rounded-2xl border border-[#D7E6F8] p-5 dark:border-[#263D60]">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
                    <Lock size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-[#142B4A] dark:text-white">
                      Change Password
                    </p>

                    <p className="mt-1 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                      Password changes are not connected to the authentication backend yet.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <PasswordField
                    label="Current Password"
                    value={passwords.current}
                    visible={showPasswords.current}
                    onToggle={() =>
                      setShowPasswords((current) => ({
                        ...current,
                        current: !current.current,
                      }))
                    }
                    onChange={(value) => updatePassword("current", value)}
                    required
                  />

                  <PasswordField
                    label="New Password"
                    value={passwords.next}
                    visible={showPasswords.next}
                    onToggle={() =>
                      setShowPasswords((current) => ({
                        ...current,
                        next: !current.next,
                      }))
                    }
                    onChange={(value) => updatePassword("next", value)}
                    required
                    minLength={8}
                  />

                  <PasswordField
                    label="Confirm New Password"
                    value={passwords.confirm}
                    visible={showPasswords.confirm}
                    onToggle={() =>
                      setShowPasswords((current) => ({
                        ...current,
                        confirm: !current.confirm,
                      }))
                    }
                    onChange={(value) => updatePassword("confirm", value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#D7E6F8] bg-[#EFF6FF] p-5 dark:border-[#263D60] dark:bg-[#203D65]">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-[#2563EB]" />

                  <p className="font-bold text-[#142B4A] dark:text-white">
                    Account Protection
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                  Two-factor authentication, login history and active
                  session management are planned security features.
                  They are not connected yet.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
                >
                  <Lock size={17} />
                  Validate Password (Preview)
                </button>
              </div>
            </form>
          )}

          {/* SUBSCRIPTION */}
          {activeTab === "subscription" && (
            <div className="space-y-7">
              <SectionHeading
                title="Subscription & Billing"
                description="View your current plan and manage subscription options."
                icon={CreditCard}
              />

              {/* CURRENT PLAN */}
              <div className="overflow-hidden rounded-2xl border border-[#D7E6F8] dark:border-[#263D60]">
                <div className="flex flex-col justify-between gap-4 bg-[#142B4A] p-6 text-white sm:flex-row sm:items-center">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#93C5FD]">
                      <Crown size={16} />
                      CURRENT SUBSCRIPTION
                    </p>

                    <h3 className="mt-3 text-2xl font-bold">
                      {currentPlanDetails.name} Plan
                    </h3>

                    <p className="mt-1 text-sm text-[#DBEAFE]">
                      {money(currentPlanDetails.price)} / month
                    </p>
                  </div>

                  <span
                    className="w-fit rounded-full px-4 py-2 text-xs font-bold"
                    style={{
                      backgroundColor: `${currentPlanDetails.color}30`,
                      color: "#FFFFFF",
                    }}
                  >
                    Demo Account
                  </span>
                </div>

                <div className="bg-[#EFF6FF] p-5 dark:bg-[#203D65]">
                  <p className="text-sm leading-6 text-[#58708F] dark:text-[#DBEAFE]">
                    Your current plan is displayed using frontend
                    demonstration data. Your actual subscription will
                    be loaded from the backend after integration.
                  </p>
                </div>
              </div>

              {/* PLAN COMPARISON */}
              <div>
                <h3 className="mb-4 font-bold text-[#142B4A] dark:text-white">
                  Available Plans
                </h3>

                <div className="grid gap-4 md:grid-cols-3">
                  {(
                    ["free", "pro", "business"] as PlanType[]
                  ).map((plan) => {
                    const details = PLAN_DETAILS[plan];
                    const active = plan === currentPlan;

                    const descriptions: Record<PlanType, string> = {
                      free: "Essential document management and basic business tools.",
                      pro: "Advanced AI analysis and additional productivity features.",
                      business: "Expanded business intelligence and reporting features.",
                    };

                    const icons: Record<PlanType, typeof User> = {
                      free: FileText,
                      pro: Sparkles,
                      business: Crown,
                    };

                    const Icon = icons[plan];

                    return (
                      <div
                        key={plan}
                        className={`rounded-2xl border p-5 transition ${
                          active
                            ? "border-[#2563EB] bg-[#EFF6FF] dark:bg-[#203D65]"
                            : "border-[#D7E6F8] bg-white dark:border-[#263D60] dark:bg-[#142B4A]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="rounded-xl p-3"
                            style={{
                              backgroundColor: `${details.color}20`,
                              color: details.color,
                            }}
                          >
                            <Icon size={22} />
                          </span>

                          {active && (
                            <CheckCircle2
                              size={21}
                              className="text-[#15803D]"
                            />
                          )}
                        </div>

                        <h4 className="mt-4 text-lg font-bold text-[#142B4A] dark:text-white">
                          {details.name}
                        </h4>

                        <p className="mt-2 text-2xl font-bold text-[#142B4A] dark:text-white">
                          {money(details.price)}
                          <span className="ml-1 text-xs font-medium text-[#58708F] dark:text-[#A9BEDA]">
                            / month
                          </span>
                        </p>

                        <p className="mt-3 min-h-12 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                          {descriptions[plan]}
                        </p>

                        {active ? (
                          <span className="mt-4 inline-flex rounded-full bg-[#DCFCE7] px-3 py-1.5 text-xs font-bold text-[#166534]">
                            Current Plan
                          </span>
                        ) : (
                          <Link
                            href="/subscription"
                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-3 py-2.5 text-xs font-bold !text-white transition hover:bg-[#2563EB]"
                          >
                            View Plan
                            <ArrowRight size={15} />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SUBSCRIPTION ACTIONS */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/subscription"
                  className="group rounded-xl border border-[#D7E6F8] bg-white p-5 transition hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:hover:bg-[#203D65]"
                >
                  <Sparkles size={23} className="text-[#2563EB]" />

                  <h3 className="mt-3 font-bold text-[#142B4A] dark:text-white">
                    Manage Subscription
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    Compare plans and view subscription options.
                  </p>

                  <span className="mt-4 flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                    View Plans
                    <ArrowRight size={16} />
                  </span>
                </Link>

                <Link
                  href="/billing-history"
                  className="group rounded-xl border border-[#D7E6F8] bg-white p-5 transition hover:border-[#2563EB] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:bg-[#142B4A] dark:hover:bg-[#203D65]"
                >
                  <Receipt size={23} className="text-[#2563EB]" />

                  <h3 className="mt-3 font-bold text-[#142B4A] dark:text-white">
                    Billing History
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                    View payment records and invoice details.
                  </p>

                  <span className="mt-4 flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                    View History
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>

              <div className="rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 dark:border-[#263D60] dark:bg-[#203D65]">
                <div className="flex items-center gap-2">
                  <Info size={19} className="text-[#2563EB]" />

                  <p className="text-sm font-bold text-[#142B4A] dark:text-white">
                    Payment Integration
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#58708F] dark:text-[#A9BEDA]">
                  Payment methods, subscription activation, renewals
                  and cancellation management will become functional
                  after payment gateway and backend integration.
                </p>
              </div>
            </div>
          )}

          {/* APPEARANCE */}
          <div className="mt-8 border-t border-[#D7E6F8] pt-7 dark:border-[#263D60]">
            <SectionHeading
              title="Appearance"
              description="Choose how Duego looks on your device."
              icon={Sun}
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: "light",
                  label: "Light",
                  description: "Bright workspace",
                  icon: Sun,
                },
                {
                  value: "dark",
                  label: "Dark",
                  description: "Dark workspace",
                  icon: Moon,
                },
                {
                  value: "system",
                  label: "System",
                  description: "Follow device setting",
                  icon: Globe,
                },
              ].map((item) => {
                const Icon = item.icon;
                const active = theme === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setTheme(item.value)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-[#2563EB] bg-[#EFF6FF] dark:bg-[#203D65]"
                        : "border-[#D7E6F8] hover:bg-[#EFF6FF] dark:border-[#263D60] dark:hover:bg-[#203D65]"
                    }`}
                  >
                    <span className="rounded-lg bg-[#DBEAFE] p-2 text-[#2563EB]">
                      <Icon size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-[#142B4A] dark:text-white">
                        {item.label}
                      </span>

                      <span className="mt-1 block text-xs text-[#58708F] dark:text-[#A9BEDA]">
                        {item.description}
                      </span>
                    </span>

                    {active && (
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-[#2563EB]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* REUSABLE SECTION HEADING */

function SectionHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof User;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-[#DBEAFE] p-3 text-[#2563EB]">
        <Icon size={22} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-[#142B4A] dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-5 text-[#58708F] dark:text-[#A9BEDA]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* REUSABLE INPUT FIELD */

function Field({
  label,
  value,
  onChange,
  icon,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[#142B4A] dark:text-white">
        {label}
        {required && " *"}
      </span>

      <span className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 transition focus-within:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65]">
        <span className="shrink-0 text-[#2563EB]">{icon}</span>

        <input
          type={type}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
        />
      </span>
    </label>
  );
}

/* REUSABLE PASSWORD FIELD */

function PasswordField({
  label,
  value,
  visible,
  onToggle,
  onChange,
  required = false,
  minLength,
}: {
  label: string;
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[#142B4A] dark:text-white">
        {label}
      </span>

      <span className="flex items-center gap-2 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] px-3 focus-within:border-[#2563EB] dark:border-[#263D60] dark:bg-[#203D65]">
        <Lock size={17} className="shrink-0 text-[#2563EB]" />

        <input
          type={visible ? "text" : "password"}
          value={value}
          required={required}
          minLength={minLength}
          onChange={(event) => onChange(event.target.value)}
          placeholder={label}
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#142B4A] outline-none placeholder:text-[#58708F] dark:text-white dark:placeholder:text-[#A9BEDA]"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="rounded-lg p-1 text-[#2563EB] hover:bg-[#DBEAFE] dark:hover:bg-[#142B4A]"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </span>
    </label>
  );
}

/* REUSABLE SAVE BUTTON */

function SaveButton({
  saved,
}: {
  saved: boolean;
}) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
      >
        {saved ? <CheckCircle2 size={17} /> : <Save size={17} />}
        {saved ? "Saved (preview)" : "Save Changes"}
      </button>
    </div>
  );
}


"use client";

import { useState, type FormEvent } from "react";
import {
  User,
  Building2,
  Bell,
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
} from "lucide-react";
import { useTheme } from "next-themes";

type SettingsTab = "profile" | "business" | "notifications" | "security" | "subscription";

const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business Profile", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState(false);
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
  const { theme, setTheme } = useTheme();

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  function updateNotification(key: keyof typeof notifications) {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
      <div>
        <p className="text-sm font-medium text-primary">Workspace</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account, business preferences, and workspace settings.
        </p>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">Preview mode:</strong> Settings
        changes are currently stored only in this page&apos;s temporary state. They
        are not saved to the backend.
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border bg-card p-3">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Settings menu
          </p>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 rounded-2xl border bg-card p-5 sm:p-7">
          {activeTab === "profile" && (
            <form onSubmit={saveSettings} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Personal information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your personal account details.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Profile avatar preview
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={profile.name}
                  onChange={(value) =>
                    setProfile({ ...profile, name: value })
                  }
                  icon={<User size={17} />}
                />
                <Field
                  label="Email address"
                  value={profile.email}
                  onChange={(value) =>
                    setProfile({ ...profile, email: value })
                  }
                  icon={<Mail size={17} />}
                  type="email"
                />
                <Field
                  label="Phone number"
                  value={profile.phone}
                  onChange={(value) =>
                    setProfile({ ...profile, phone: value })
                  }
                  icon={<Phone size={17} />}
                />
                <Field
                  label="Role"
                  value={profile.role}
                  onChange={(value) =>
                    setProfile({ ...profile, role: value })
                  }
                  icon={<Building2 size={17} />}
                />
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {activeTab === "business" && (
            <form onSubmit={saveSettings} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Business information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add the details used to organize your business documents.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Business name"
                  value={business.name}
                  onChange={(value) =>
                    setBusiness({ ...business, name: value })
                  }
                  icon={<Building2 size={17} />}
                />
                <Field
                  label="Business type"
                  value={business.type}
                  onChange={(value) =>
                    setBusiness({ ...business, type: value })
                  }
                  icon={<Building2 size={17} />}
                />
                <Field
                  label="Business email"
                  value={business.email}
                  onChange={(value) =>
                    setBusiness({ ...business, email: value })
                  }
                  icon={<Mail size={17} />}
                  type="email"
                />
                <Field
                  label="Business phone"
                  value={business.phone}
                  onChange={(value) =>
                    setBusiness({ ...business, phone: value })
                  }
                  icon={<Phone size={17} />}
                />
                <Field
                  label="Website"
                  value={business.website}
                  onChange={(value) =>
                    setBusiness({ ...business, website: value })
                  }
                  icon={<Globe size={17} />}
                />
                <Field
                  label="Business address"
                  value={business.address}
                  onChange={(value) =>
                    setBusiness({ ...business, address: value })
                  }
                  icon={<MapPin size={17} />}
                />
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Notification preferences</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="divide-y rounded-xl border">
                {(
                  [
                    ["email", "Email notifications", "Receive updates through email."],
                    ["deadlines", "Deadline alerts", "Get notified about upcoming and overdue deadlines."],
                    ["payments", "Payment notifications", "Receive payment status updates."],
                    ["documentAnalysis", "AI document analysis", "Get notified when document analysis is ready."],
                    ["reminders", "Reminder notifications", "Receive your scheduled reminder alerts."],
                    ["marketing", "Product updates", "Receive announcements and product news."],
                  ] as const
                ).map(([key, title, description]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifications[key]}
                      onClick={() => updateNotification(key)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        notifications[key] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          notifications[key] ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <SaveButton saved={saved} onClick={() => {
                setSaved(true);
                window.setTimeout(() => setSaved(false), 2500);
              }} />
            </div>
          )}

          {activeTab === "security" && (
            <form onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
              setPasswords({ current: "", next: "", confirm: "" });
              window.setTimeout(() => setSaved(false), 2500);
            }} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Security settings</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your password and account security preferences.
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Lock className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Change password</p>
                    <p className="text-xs text-muted-foreground">
                      Password update is a preview only.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <PasswordField
                    label="Current password"
                    value={passwords.current}
                    onChange={(value) =>
                      setPasswords({ ...passwords, current: value })
                    }
                  />
                  <PasswordField
                    label="New password"
                    value={passwords.next}
                    onChange={(value) =>
                      setPasswords({ ...passwords, next: value })
                    }
                  />
                  <PasswordField
                    label="Confirm new password"
                    value={passwords.confirm}
                    onChange={(value) =>
                      setPasswords({ ...passwords, confirm: value })
                    }
                  />
                </div>
              </div>

              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Account protection</p>
                    <p className="text-xs text-muted-foreground">
                      Additional security features can be connected later.
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Two-factor authentication and active session management are
                  not connected yet.
                </p>
              </div>

              <SaveButton saved={saved} label="Update password (preview)" />
            </form>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Subscription & billing</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  View your plan and available subscription options.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Current plan</p>
                    <h3 className="mt-1 text-2xl font-bold">Free Plan</h3>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Preview
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  Explore Duego&apos;s document management and AI workspace.
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  {[
                    "Document workspace",
                    "AI document analysis interface",
                    "Obligation and deadline tracking",
                    "Reminder management interface",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={17} className="text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border p-5">
                <h3 className="font-semibold">Premium Plan</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A planned upgrade option for businesses needing expanded
                  capabilities.
                </p>
                <p className="mt-3 text-sm font-medium">
                  Pricing and features to be finalized.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-4 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground"
                >
                  Upgrade — Coming soon
                </button>
              </div>

              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-primary" />
                  <div>
                    <p className="font-medium">Payment methods</p>
                    <p className="text-xs text-muted-foreground">
                      No payment provider or billing method is connected yet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-7 border-t pt-5">
            <h3 className="text-sm font-semibold">Appearance</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose how Duego looks on your device.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                  theme === "light" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <Sun size={17} /> Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                  theme === "dark" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <Moon size={17} /> Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                  theme === "system" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <Globe size={17} /> System
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>
      <span className="flex items-center gap-2 rounded-xl border bg-background px-3 focus-within:border-primary">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </span>
    </label>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
        placeholder={label}
      />
    </label>
  );
}

function SaveButton({
  saved,
  label = "Save changes",
  onClick,
}: {
  saved: boolean;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex justify-end">
      <button
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        {saved ? <CheckCircle2 size={17} /> : <Save size={17} />}
        {saved ? "Saved (preview)" : label}
      </button>
    </div>
  );
}

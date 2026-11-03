
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  BrainCircuit,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (isRegister && name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setMessage(
      "Your form is valid. Backend authentication will be connected in the next phase."
    );
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Branding panel */}
      <section className="relative hidden overflow-hidden bg-primary p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full border border-white/10" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-primary shadow-lg">
            D
          </div>
          <span className="text-2xl font-bold">Duego</span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Sparkles size={16} />
              Intelligent business management
            </div>

            <h1 className="text-4xl font-bold leading-tight xl:text-6xl">
              Everything important.
              <span className="mt-2 block text-blue-100">
                In one place.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-blue-100">
              Organise business documents, discover important obligations,
              understand risks, and stay ahead of every deadline.
            </p>
          </motion.div>

          <div className="mt-12 space-y-5">
            {[
              {
                icon: FileText,
                title: "Document intelligence",
                text: "Keep business documents organised.",
              },
              {
                icon: BrainCircuit,
                title: "AI-powered insights",
                text: "Understand important information faster.",
              },
              {
                icon: CalendarDays,
                title: "Deadline monitoring",
                text: "Stay informed about upcoming obligations.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <Icon size={21} />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-blue-100">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="relative z-10 text-sm text-blue-100">
          © 2026 Duego. All rights reserved.
        </p>
      </section>

      {/* Authentication form */}
      <section className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between p-6 lg:justify-end lg:px-10">
          <Link href="/" className="text-xl font-bold lg:hidden">
            <span className="text-primary">Duego</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-sm font-medium text-muted hover:text-primary"
            >
              Back to website
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                <ShieldCheck size={25} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight">
                {isRegister ? "Create your account" : "Welcome back"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                {isRegister
                  ? "Join Duego and bring your business documents under control."
                  : "Sign in to continue managing your business with Duego."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">
                  {error}
                </p>
              )}

              {message && (
                <p role="status" className="rounded-xl bg-success/10 p-3 text-sm text-success">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                {isRegister ? "Create account" : "Sign in"}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-muted">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link
                href={isRegister ? "/login" : "/register"}
                className="font-bold text-primary hover:underline"
              >
                {isRegister ? "Sign in" : "Create account"}
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-muted">
              Secure account access for your business workspace.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

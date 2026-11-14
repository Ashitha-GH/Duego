
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
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
  Lock,
  Mail,
  User,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { apiRequest } from "@/lib/api";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

  try {
    if (isRegister) {
      await apiRequest("/users/register", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      setMessage("Registration successful! You can now sign in.");
    } else {
      const formData = new URLSearchParams();
      formData.append("username", email.trim());
      formData.append("password", password);

      const data = await apiRequest("/users/login", {
        method: "POST",
        body: formData,
      });

      localStorage.setItem("access_token", data.access_token);
      router.push("/dashboard");

      setMessage("Login successful! Your account is authenticated.");
    }
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Something went wrong."
    );
  }
}


  const features = [
    {
      icon: FileText,
      title: "Document Intelligence",
      description: "Organize and understand business documents.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Discover important information and risks.",
    },
    {
      icon: CalendarDays,
      title: "Deadline Monitoring",
      description: "Stay informed about upcoming obligations.",
    },
  ];

  return (
    <main className="grid min-h-screen bg-white dark:bg-[#0B1930] lg:grid-cols-2">

      {/* LEFT BRANDING PANEL */}

      <section className="relative hidden min-h-screen overflow-hidden bg-[#142B4A] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full border border-white/10" />

        <div className="pointer-events-none absolute right-20 top-1/3 h-64 w-64 rounded-full bg-[#2563EB]/20 blur-3xl" />

        {/* LOGO */}

        <Link
          href="/"
          className="relative z-10 flex w-fit items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-extrabold text-[#142B4A] shadow-lg">
            D
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Duego
          </span>
        </Link>

        {/* BRAND CONTENT */}

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#93C5FD]/30 bg-[#2563EB]/20 px-4 py-2 text-sm font-medium text-[#DBEAFE]">
              <Sparkles size={16} className="text-[#D6A84B]" />
              Intelligent Business Management
            </div>

            <h1 className="text-4xl font-bold leading-tight xl:text-6xl">
              Everything important.
              <span className="mt-2 block text-[#93C5FD]">
                In one place.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-[#DBEAFE]">
              Organize business documents, discover important
              obligations, understand risks and stay ahead of
              every deadline with Duego.
            </p>
          </motion.div>

          {/* FEATURE LIST */}

          <div className="mt-12 space-y-6">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.12 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-[#DBEAFE]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <p className="relative z-10 text-sm text-[#A9BEDA]">
          © 2026 Duego. All rights reserved.
        </p>
      </section>

      {/* RIGHT AUTHENTICATION AREA */}

      <section className="flex min-h-screen flex-col">

        {/* TOP NAVIGATION */}

        <div className="flex items-center justify-between p-6 lg:justify-end lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold text-[#142B4A] dark:text-white lg:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              D
            </span>
            Duego
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/"
              className="text-sm font-semibold text-[#58708F] transition hover:text-[#2563EB] dark:text-[#A9BEDA]"
            >
              Back to website
            </Link>
          </div>
        </div>

        {/* FORM CONTAINER */}

        <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >

            {/* FORM HEADING */}

            <div className="mb-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DBEAFE] text-[#2563EB] dark:bg-[#203D65]">
                <ShieldCheck size={27} />
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                {isRegister ? "Create your account" : "Account Access"}
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#142B4A] dark:text-white">
                {isRegister ? "Join Duego" : "Welcome back"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
                {isRegister
                  ? "Create your account and bring your business documents under control."
                  : "Sign in to continue managing your business with Duego."}
              </p>
            </div>

            {/* AUTHENTICATION FORM */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* FULL NAME */}

              {isRegister && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-[#142B4A] dark:text-white"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#58708F] dark:text-[#A9BEDA]"
                    />

                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                        setMessage("");
                      }}
                      placeholder="Enter your full name"
                      className="h-13 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] pl-11 pr-4 text-sm text-[#142B4A] outline-none transition placeholder:text-[#58708F] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:placeholder:text-[#A9BEDA]"
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-[#142B4A] dark:text-white"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#58708F] dark:text-[#A9BEDA]"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                      setMessage("");
                    }}
                    placeholder="you@example.com"
                    className="h-13 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] pl-11 pr-4 text-sm text-[#142B4A] outline-none transition placeholder:text-[#58708F] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:placeholder:text-[#A9BEDA]"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-[#142B4A] dark:text-white"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#58708F] dark:text-[#A9BEDA]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                      setMessage("");
                    }}
                    placeholder="Enter your password"
                    className="h-13 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] pl-11 pr-12 text-sm text-[#142B4A] outline-none transition placeholder:text-[#58708F] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:placeholder:text-[#A9BEDA]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#58708F] transition hover:text-[#2563EB] dark:text-[#A9BEDA]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
                  Password must contain at least 8 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}

              {isRegister && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-[#142B4A] dark:text-white"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#58708F] dark:text-[#A9BEDA]"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setError("");
                        setMessage("");
                      }}
                      placeholder="Confirm your password"
                      className="h-13 w-full rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] pl-11 pr-12 text-sm text-[#142B4A] outline-none transition placeholder:text-[#58708F] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 dark:border-[#263D60] dark:bg-[#142B4A] dark:text-white dark:placeholder:text-[#A9BEDA]"
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#58708F] transition hover:text-[#2563EB] dark:text-[#A9BEDA]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      {password === confirmPassword ? (
                        <>
                          <CheckCircle2
                            size={14}
                            className="text-[#16A34A]"
                          />
                          <span className="text-[#16A34A]">
                            Passwords match
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={14}
                            className="text-[#DC2626]"
                          />
                          <span className="text-[#DC2626]">
                            Passwords do not match
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-3 text-sm text-[#B91C1C]"
                >
                  <XCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* INFORMATION MESSAGE */}

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-3 text-sm leading-6 text-[#142B4A] dark:border-[#263D60] dark:bg-[#203D65] dark:text-white"
                >
                  <Info size={18} className="mt-0.5 shrink-0 text-[#2563EB]" />
                  <span>{message}</span>
                </motion.div>
              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#142B4A]/15 transition hover:-translate-y-0.5 hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 dark:focus:ring-offset-[#0B1930]"
              >
                {isRegister ? "Create Account" : "Sign In"}

                <ArrowRight size={18} />
              </button>
            </form>

            {/* SWITCH LOGIN / REGISTER */}

            <div className="mt-8 rounded-xl border border-[#D7E6F8] bg-[#EFF6FF] p-4 text-center dark:border-[#263D60] dark:bg-[#142B4A]">
              <p className="text-sm text-[#58708F] dark:text-[#A9BEDA]">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}

                {" "}

                <Link
                  href={isRegister ? "/login" : "/register"}
                  className="font-bold text-[#2563EB] hover:underline"
                >
                  {isRegister ? "Sign In" : "Create Account"}
                </Link>
              </p>
            </div>

            {/* FOOTER */}

            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#58708F] dark:text-[#A9BEDA]">
              <ShieldCheck size={15} className="text-[#2563EB]" />
              Secure account access for your business workspace.
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

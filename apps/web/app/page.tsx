export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight">Duego</div>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="flex gap-3">
            <button className="rounded-lg px-4 py-2 text-sm font-medium">
              Log in
            </button>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Start free
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-500">
            AI business document management
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Never miss an important business deadline.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Upload your business documents. Duego finds important dates,
            obligations, renewals, and actions — then reminds you before
            they become a problem.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white">
              Start free
            </button>

            <button className="rounded-xl border border-slate-300 px-6 py-3 font-semibold">
              See how it works
            </button>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold">Duego Dashboard</h2>
            <span className="text-sm text-slate-500">Today</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5">
              <p className="text-sm text-slate-500">Need attention</p>
              <p className="mt-2 text-3xl font-bold">3</p>
            </div>

            <div className="rounded-xl bg-white p-5">
              <p className="text-sm text-slate-500">Upcoming</p>
              <p className="mt-2 text-3xl font-bold">7</p>
            </div>

            <div className="rounded-xl bg-white p-5">
              <p className="text-sm text-slate-500">Documents</p>
              <p className="mt-2 text-3xl font-bold">24</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-white p-5">
            <p className="text-sm font-medium">Vendor Agreement</p>
            <p className="mt-2 text-sm text-slate-500">
              Cancellation deadline · 31 October 2027
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Everything important in one place.</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature
              title="AI document reading"
              description="Extract important dates, obligations, payments, and renewal terms."
            />

            <Feature
              title="Deadline tracking"
              description="Turn information hidden inside documents into actionable deadlines."
            />

            <Feature
              title="Smart reminders"
              description="Get reminded before important business actions become urgent."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">How Duego works</h2>

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            <Step number="01" title="Upload" text="Upload a business document." />
            <Step number="02" title="Analyze" text="Duego extracts important information." />
            <Step number="03" title="Confirm" text="Review and confirm detected obligations." />
            <Step number="04" title="Remind" text="Duego reminds you before the deadline." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-slate-500">
          © 2026 Duego. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-400">{number}</p>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
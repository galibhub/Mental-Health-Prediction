import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <div className="flex min-h-screen flex-col">
        <Navbar />

        {/* Main content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="border-t border-line bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.9fr]">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-pine text-white shadow-soft">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20V10" />
                      <path d="M12 12.5C8.8 12.5 7 10.8 7 8.1C7 6.6 8.2 5.5 9.7 5.5c1.2 0 2.1.6 2.3 1.7" />
                      <path d="M12 14.5c3.2 0 5-1.7 5-4.4C17 8.6 15.8 7.5 14.3 7.5c-1.2 0-2.1.6-2.3 1.7" />
                      <path d="M9 20h6" />
                    </svg>
                  </div>

                  <div>
                    <p className="font-display text-xl text-pine-deep">
                      Mental Health
                      <span className="italic text-pine">
                        {" "}
                        Signal
                      </span>
                    </p>

                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted">
                      Student wellness analytics
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-ink-soft">
                  A machine-learning powered wellness signal built
                  around everyday habits, digital behavior, lifestyle,
                  and perceived stress.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                  Navigate
                </p>

                <div className="mt-4 space-y-3">
                  <a
                    href="/"
                    className="block text-sm text-ink-soft transition hover:text-pine"
                  >
                    Home
                  </a>

                  <a
                    href="/assessment"
                    className="block text-sm text-ink-soft transition hover:text-pine"
                  >
                    Assessment
                  </a>
                </div>
              </div>

              {/* Disclaimer */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                  Important
                </p>

                <div className="mt-4 rounded-2xl border border-amber/20 bg-amber-soft p-4">
                  <p className="text-xs leading-6 text-ink-soft">
                    This application provides an ML-based
                    informational signal. It is not a medical
                    diagnosis or a substitute for professional care.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-8 h-px bg-line" />

            <div className="flex flex-col gap-3 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} Mental Health Signal.
                All rights reserved.
              </p>

              <div className="flex items-center gap-2">
                <span>Built with</span>

                <span className="rounded-full bg-paper px-2.5 py-1 font-mono text-[9px] text-ink-soft">
                  React
                </span>

                <span className="rounded-full bg-paper px-2.5 py-1 font-mono text-[9px] text-ink-soft">
                  FastAPI
                </span>

                <span className="rounded-full bg-paper px-2.5 py-1 font-mono text-[9px] text-ink-soft">
                  ML
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PublicLayout;
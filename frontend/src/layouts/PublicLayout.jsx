import { Link, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";


function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory text-ink">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main>
        <Outlet />
      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="mt-24 border-t border-line bg-pine-deep text-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          {/* =================================================
              TOP FOOTER
          ================================================= */}

          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1fr]">

            {/* BRAND */}

            <div>

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >

                <div
                  className="
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-2xl
                    bg-white/10
                    ring-1
                    ring-white/10
                  "
                >

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

                  <p className="font-display text-xl leading-none">

                    Mental Health

                    <span className="ml-1 italic text-[#9a8cff]">
                      Signal
                    </span>

                  </p>


                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/40">
                    Student wellness analytics
                  </p>

                </div>

              </Link>


              <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                A machine-learning powered student wellness
                exploration tool built around everyday habits,
                digital behavior, lifestyle patterns and
                perceived stress.
              </p>


              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9a8cff] opacity-40" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9a8cff]" />

                </span>


                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
                  Prediction model online
                </span>

              </div>

            </div>


            {/* EXPLORE */}

            <div>

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Explore
              </p>


              <div className="mt-5 space-y-3">

                <FooterLink
                  to="/"
                  label="Home"
                />

                <FooterLink
                  to="/assessment"
                  label="Assessment"
                />

                <FooterLink
                  to="/dashboard"
                  label="Dashboard"
                />

              </div>

            </div>


            {/* ACCOUNT */}

            <div>

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Account
              </p>


              <div className="mt-5 space-y-3">

                <FooterLink
                  to="/login"
                  label="Sign in"
                />

                <FooterLink
                  to="/register"
                  label="Create account"
                />

              </div>

            </div>


            {/* IMPORTANT */}

            <div>

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Important
              </p>


              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">

                <div className="mb-3 flex items-center gap-2">

                  <span className="grid h-7 w-7 place-items-center rounded-xl bg-[#9a8cff]/15 text-[#b4adff]">

                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >

                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                      />

                      <path d="M10 9v4" />

                      <path d="M10 6.5h.01" />

                    </svg>

                  </span>


                  <span className="text-sm font-semibold text-white/85">
                    Informational only
                  </span>

                </div>


                <p className="text-xs leading-6 text-white/45">
                  This application provides a
                  machine-learning-based signal. It is
                  not a medical diagnosis and is not a
                  substitute for professional care.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="my-10 h-px bg-white/10" />


          {/* =================================================
              BOTTOM
          ================================================= */}

          <div className="flex flex-col gap-4 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 Mental Health Signal.
              All rights reserved.
            </p>


            <div className="flex flex-wrap items-center gap-2">

              <span>
                Built with
              </span>

              <TechBadge label="React" />

              <TechBadge label="FastAPI" />

              <TechBadge label="MongoDB" />

              <TechBadge label="Machine Learning" />

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}


/* ===========================================================
   FOOTER LINK
=========================================================== */

function FooterLink({
  to,
  label,
}) {
  return (
    <Link
      to={to}
      className="
        block
        text-sm
        text-white/50
        transition
        hover:translate-x-0.5
        hover:text-white
      "
    >
      {label}
    </Link>
  );
}


/* ===========================================================
   TECH BADGE
=========================================================== */

function TechBadge({
  label,
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-white/10
        bg-white/5
        px-2.5
        py-1
        text-[9px]
        text-white/45
      "
    >
      {label}
    </span>
  );
}


export default PublicLayout;
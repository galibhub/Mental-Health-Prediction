import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function LogoMark() {
  return (
    <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-pine-deep shadow-soft">
      <div className="absolute inset-[7px] rounded-xl border border-mint/35" />

      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5 text-mint"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20V10" />
        <path d="M12 13C8.8 13 7 11.3 7 8.5C7 7 8.2 6 9.7 6c1.2 0 2.1.6 2.3 1.7" />
        <path d="M12 15c3.2 0 5-1.7 5-4.5C17 9 15.8 8 14.3 8c-1.2 0-2.1.6-2.3 1.7" />
        <path d="M9 20h6" />
      </svg>
    </div>
  );
}

function navClass({ isActive }) {
  return [
    "relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300",
    isActive
      ? "bg-pine-soft text-pine-deep"
      : "text-ink-soft hover:bg-white/70 hover:text-ink",
  ].join(" ");
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ivory/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-[76px] items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMobile}
            className="group flex items-center gap-3"
          >
            <LogoMark />

            <div className="leading-none">
              <p className="font-display text-[21px] font-medium tracking-tight text-pine-deep">
                Mental Health
              </p>

              <p className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-pine">
                Signal
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/assessment" className={navClass}>
              Assessment
            </NavLink>

            <NavLink to="/result" className={navClass}>
              Result
            </NavLink>
          </nav>

          {/* Right action */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="hidden rounded-full border border-line bg-white/60 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted lg:inline-flex">
              ML Screening
            </span>

            <Link
              to="/assessment"
              className="group inline-flex items-center gap-2 rounded-xl bg-pine px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-card"
            >
              Start assessment

              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 10h11" />
                <path d="m11 6 4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/70 text-ink transition hover:bg-white md:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          className={[
            "overflow-hidden transition-all duration-300 md:hidden",
            mobileOpen ? "max-h-80 pb-5 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <nav
            className="flex flex-col gap-1 border-t border-line/60 pt-4"
            aria-label="Mobile navigation"
          >
            <NavLink to="/" end className={navClass} onClick={closeMobile}>
              Home
            </NavLink>

            <NavLink
              to="/assessment"
              className={navClass}
              onClick={closeMobile}
            >
              Assessment
            </NavLink>

            <NavLink
              to="/result"
              className={navClass}
              onClick={closeMobile}
            >
              Result
            </NavLink>

            <Link
              to="/assessment"
              onClick={closeMobile}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-pine px-4 py-3 text-sm font-semibold text-white transition hover:bg-pine-deep"
            >
              Start assessment
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
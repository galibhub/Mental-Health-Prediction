import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Assessment",
    to: "/assessment",
  },
];

function LogoMark() {
  return (
    <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-pine text-white shadow-soft">
      <div className="absolute inset-0 bg-gradient-to-br from-pine via-pine to-[#8a80ff]" />

      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5"
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
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* subtle glass backdrop */}
      <div className="absolute inset-0 border-b border-line/70 bg-ivory/80 backdrop-blur-xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-[76px] items-center justify-between">
          {/* ===================================================
              BRAND
          =================================================== */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <LogoMark />

            <div className="hidden sm:block">
              <p className="font-display text-xl leading-none text-pine-deep">
                Mental Health
                <span className="italic text-pine">
                  {" "}
                  Signal
                </span>
              </p>

              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
                Student wellness analytics
              </p>
            </div>

            <div className="sm:hidden">
              <p className="font-display text-lg leading-none text-pine-deep">
                MHS
              </p>
            </div>
          </Link>

          {/* ===================================================
              DESKTOP NAV
          =================================================== */}
          <div className="hidden items-center gap-2 md:flex">
            <div className="flex items-center gap-1 rounded-2xl border border-line bg-white/70 p-1.5 shadow-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-pine-soft text-pine-deep shadow-sm"
                        : "text-ink-soft hover:bg-paper hover:text-ink",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* status */}
            <div className="ml-3 hidden items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-2 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pine" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                Model online
              </span>
            </div>

            {/* CTA */}
            <Link
              to="/assessment"
              className="group ml-2 inline-flex items-center gap-2 rounded-2xl bg-pine px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-card"
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
              >
                <path d="M4 10h11" />
                <path d="m11 6 4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* ===================================================
              MOBILE TOGGLE
          =================================================== */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white text-ink transition hover:bg-paper md:hidden"
          >
            {menuOpen ? (
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
        </nav>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}
        <div
          className={[
            "overflow-hidden transition-all duration-300 md:hidden",
            menuOpen
              ? "max-h-96 pb-4 opacity-100"
              : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="rounded-3xl border border-line bg-white p-3 shadow-card">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block rounded-2xl px-4 py-3.5 text-sm font-semibold transition",
                      isActive
                        ? "bg-pine-soft text-pine-deep"
                        : "text-ink-soft hover:bg-paper hover:text-ink",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="my-3 h-px bg-line" />

            <div className="flex items-center gap-2 rounded-2xl bg-mint-soft px-4 py-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pine" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                Prediction model online
              </span>
            </div>

            <Link
              to="/assessment"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-pine px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-pine-deep"
            >
              Start assessment

              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h11" />
                <path d="m11 6 4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
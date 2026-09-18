import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-line/70 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            Mental Health Signal · Calm Intelligence
          </p>

          <p className="text-xs text-ink-muted">
            Informational screening only — not a clinical assessment.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
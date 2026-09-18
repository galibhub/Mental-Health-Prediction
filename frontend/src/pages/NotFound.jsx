import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 py-20 sm:px-8">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-pine">
          404 · Signal lost
        </p>

        <h1 className="mt-5 font-display text-6xl text-pine-deep sm:text-8xl">
          Quietly missing.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-ink-soft">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine-deep"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
import { Link, useLocation } from "react-router-dom";
import { getSignal } from "../utils/signal";

function Result() {
  const location = useLocation();

  const score = location.state?.score;
  const inputs = location.state?.inputs;

  if (typeof score !== "number") {
    return (
      <section className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden">
        <div className="ambient-orb ambient-orb-one -right-28 top-10 -z-10" />
        <div className="ambient-orb ambient-orb-two -left-24 bottom-10 -z-10" />

        <div className="mx-auto flex max-w-3xl justify-center px-5 py-16 sm:px-8 sm:py-24">
          <div className="surface-strong w-full rounded-[30px] p-8 text-center sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-pine-soft text-pine">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v6" />
                <path d="M12 14v6" />
                <path d="M5 9h4" />
                <path d="M15 15h4" />
              </svg>
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
              No result found
            </p>

            <h1 className="mt-3 font-display text-4xl text-pine-deep">
              Start with an assessment.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink-soft">
              Complete the assessment first so the model can
              generate your signal.
            </p>

            <Link
              to="/assessment"
              className="mt-7 inline-flex rounded-2xl bg-pine px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-pine-deep"
            >
              Start assessment
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const signal = getSignal(score);

  const snapshot = [
    ["Age", `${inputs?.age ?? "—"} years`],
    ["Academic", inputs?.academic_level ?? "—"],
    ["Platform", inputs?.most_used_platform ?? "—"],
    [
      "Screen time",
      `${inputs?.avg_daily_usage_hours ?? "—"} hrs`,
    ],
    ["Sleep", `${inputs?.sleep_hours_per_night ?? "—"} hrs`],
    ["Stress", inputs?.stress_level ?? "—"],
  ];

  return (
    <section className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden">
      <div className="ambient-orb ambient-orb-one -right-28 top-8 -z-10" />
      <div className="ambient-orb ambient-orb-two -left-28 bottom-8 -z-10" />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
              Assessment complete
            </p>

            <h1 className="mt-2 font-display text-4xl text-pine-deep sm:text-5xl">
              Your signal is ready.
            </h1>
          </div>

          <Link
            to="/assessment"
            className="inline-flex w-fit rounded-2xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
          >
            Run another assessment
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-line bg-white shadow-card lg:grid-cols-[0.9fr_1.1fr]">
          {/* left */}
          <div className="bg-pine-deep p-7 text-white sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Model score
            </p>

            <div className="mt-10 text-center">
              <div className="flex items-end justify-center gap-2">
                <span className="font-mono text-7xl font-bold tracking-[-0.07em] sm:text-8xl">
                  {score.toFixed(2)}
                </span>

                <span className="mb-3 font-mono text-sm text-white/40">
                  /10
                </span>
              </div>

              <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2">
                <span className="text-sm font-semibold">
                  {signal.label}
                </span>
              </div>

              <h2 className="mt-7 font-display text-3xl">
                {signal.title}
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/55">
                {signal.context}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
                Important
              </p>

              <p className="mt-2 text-xs leading-6 text-white/55">
                This application provides a machine-learning
                prediction for informational purposes. It is not a
                diagnosis or substitute for professional care.
              </p>
            </div>
          </div>

          {/* right */}
          <div className="p-7 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Response snapshot
            </p>

            <h2 className="mt-2 font-display text-3xl text-pine-deep">
              What you submitted
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {snapshot.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-line bg-paper p-4"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                    {label}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-ink">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-pine/10 bg-pine-soft p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-pine">
                How to read this
              </p>

              <p className="mt-2 text-sm leading-7 text-ink-soft">
                The score summarizes the pattern captured by the
                trained model. The signal label is only a friendly
                interpretation of the numerical output.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/assessment"
                className="rounded-2xl bg-pine px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-pine-deep"
              >
                Run another assessment
              </Link>

              <Link
                to="/"
                className="rounded-2xl border border-line bg-white px-6 py-3.5 text-center text-sm font-semibold text-ink transition hover:bg-paper"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Result;
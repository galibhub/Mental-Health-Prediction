import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Ambient shapes */}
      <div className="ambient-orb ambient-orb-one -right-28 top-16 -z-10" />
      <div className="ambient-orb ambient-orb-two -left-24 bottom-10 -z-10" />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Hero copy */}
          <div className="animate-rise-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-pine/15 bg-pine-soft px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-pine">
              <span className="h-1.5 w-1.5 rounded-full bg-pine" />
              Student wellness analytics
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-pine-deep sm:text-7xl lg:text-[78px]">
              Understand your
              <span className="block italic text-pine">
                everyday signal.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-ink-soft sm:text-lg">
              A calm, data-informed way to explore how sleep, stress, study,
              physical activity and digital habits relate to your predicted
              mental health score.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/assessment"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-pine px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-pine-deep hover:shadow-float"
              >
                Begin assessment

                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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

              <Link
                to="/result"
                className="inline-flex items-center justify-center rounded-2xl border border-line bg-white/75 px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-pine/25 hover:bg-white"
              >
                See result preview
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-ink-muted">
              <span>12 lifestyle signals</span>
              <span>•</span>
              <span>ML-powered score</span>
              <span>•</span>
              <span>Private by design</span>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative animate-rise-in [animation-delay:120ms]">
            <div className="surface-strong relative overflow-hidden rounded-[30px] p-6 sm:p-8">
              {/* top row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    Sample signal
                  </p>

                  <p className="mt-2 font-display text-2xl text-pine-deep">
                    Today, in context.
                  </p>
                </div>

                <span className="rounded-full bg-mint-soft px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-pine">
                  Preview
                </span>
              </div>

              {/* score */}
              <div className="mt-8 rounded-[26px] bg-pine-deep p-6 text-white sm:p-7">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
                      Predicted score
                    </p>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="font-mono text-6xl font-bold tracking-tight">
                        7.42
                      </span>

                      <span className="font-mono text-sm text-white/45">
                        /10
                      </span>
                    </div>
                  </div>

                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-mint"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 17l5-5 4 3 7-8" />
                      <path d="M15 7h5v5" />
                    </svg>
                  </div>
                </div>

                {/* mock gauge */}
                <div className="mt-7">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[74%] rounded-full bg-mint" />
                  </div>

                  <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                    <span>0</span>
                    <span>signal</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              {/* signal cards */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line/70 bg-white/70 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                    Sleep
                  </p>

                  <p className="mt-2 font-mono text-2xl font-bold text-ink">
                    7.1
                    <span className="ml-1 text-xs font-normal text-ink-muted">
                      hrs
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-line/70 bg-white/70 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                    Screen time
                  </p>

                  <p className="mt-2 font-mono text-2xl font-bold text-ink">
                    5.8
                    <span className="ml-1 text-xs font-normal text-ink-muted">
                      hrs
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-amber-soft p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                  Reminder
                </p>

                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  This is a model-generated screening signal, not a diagnosis.
                </p>
              </div>
            </div>

            {/* decorative floating chip */}
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-card sm:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                Built around
              </p>

              <p className="mt-1 text-sm font-semibold text-pine-deep">
                Your daily rhythm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
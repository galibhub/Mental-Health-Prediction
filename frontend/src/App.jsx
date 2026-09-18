function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ivory px-6 py-12">
      {/* Ambient background */}
      <div className="ambient-orb ambient-orb-one -right-20 top-10 animate-soft-pulse" />
      <div className="ambient-orb ambient-orb-two -left-16 bottom-10" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="animate-rise-in">
          <span className="inline-flex items-center rounded-full border border-pine/15 bg-pine-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-pine">
            Design System · 02
          </span>

          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium tracking-tight text-pine-deep sm:text-7xl">
            Calm intelligence,
            <span className="block italic text-pine">
              thoughtfully designed.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
            A visual language for understanding mental wellbeing through
            thoughtful data, calm interactions, and human-centered design.
          </p>
        </header>

        {/* Token showcase */}
        <section className="mt-14 grid gap-5 md:grid-cols-3">
          {/* Brand */}
          <article className="surface rounded-3xl p-6 transition duration-500 hover:-translate-y-1 hover:shadow-card">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              Brand
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-2xl bg-pine" />
                <div>
                  <p className="font-semibold text-ink">Pine</p>
                  <p className="font-mono text-xs text-ink-muted">#2F6B57</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-2xl bg-mint" />
                <div>
                  <p className="font-semibold text-ink">Mint</p>
                  <p className="font-mono text-xs text-ink-muted">#9FCFBD</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-2xl bg-amber" />
                <div>
                  <p className="font-semibold text-ink">Amber</p>
                  <p className="font-mono text-xs text-ink-muted">#D9A441</p>
                </div>
              </div>
            </div>
          </article>

          {/* Typography */}
          <article className="surface rounded-3xl p-6 transition duration-500 hover:-translate-y-1 hover:shadow-card">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              Typography
            </p>

            <div className="mt-6">
              <p className="font-display text-4xl leading-tight text-pine-deep">
                Mindful
                <span className="block italic text-pine">by design.</span>
              </p>

              <p className="mt-5 text-sm leading-6 text-ink-soft">
                Clear information should feel calm, not clinical.
              </p>

              <p className="mt-4 font-mono text-xs text-ink-muted">
                SCORE / 07.42
              </p>
            </div>
          </article>

          {/* Surface */}
          <article className="surface-strong rounded-3xl p-6 transition duration-500 hover:-translate-y-1 hover:shadow-float">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              Surface
            </p>

            <div className="mt-6">
              <div className="rounded-2xl bg-pine-deep p-5 text-white">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-mint">
                  Mental health signal
                </p>

                <p className="mt-3 font-mono text-5xl font-bold">
                  7.42
                  <span className="ml-1 text-base font-normal text-white/50">
                    /10
                  </span>
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Button system */}
        <section className="surface mt-5 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                Interaction
              </p>

              <h2 className="mt-2 font-display text-3xl text-pine-deep">
                Quiet confidence.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-pine px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-lg">
                Start assessment
              </button>

              <button className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition duration-300 hover:border-pine/30 hover:bg-mint-soft">
                View history
              </button>

              <button className="rounded-xl bg-amber-soft px-5 py-3 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5">
                Secondary action
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            Mental Health Signal · Calm Intelligence
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
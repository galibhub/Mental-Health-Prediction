function Result() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] bg-pine-deep p-7 text-white sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
            Prediction result
          </p>

          <div className="mt-8">
            <p className="font-mono text-7xl font-bold tracking-tight">
              7.42
              <span className="ml-2 text-base font-normal text-white/40">
                /10
              </span>
            </p>

            <p className="mt-3 font-display text-2xl italic text-mint">
              Signal preview
            </p>
          </div>

          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[74%] rounded-full bg-mint" />
          </div>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
            Your real prediction result will be rendered here after the
            assessment is connected to FastAPI.
          </p>
        </div>

        <div className="surface-strong rounded-[30px] p-7 sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Interpretation
          </p>

          <h1 className="mt-4 font-display text-4xl text-pine-deep">
            A result should explain,
            <span className="block italic text-pine">
              not overwhelm.
            </span>
          </h1>

          <div className="mt-8 space-y-3">
            {["Sleep pattern", "Stress level", "Screen time"].map(
              (item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-line bg-white/65 px-5 py-4"
                >
                  <span className="text-sm font-medium text-ink-soft">
                    {item}
                  </span>

                  <span className="font-mono text-xs text-pine">
                    {["High influence", "Moderate", "Moderate"][index]}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Result;
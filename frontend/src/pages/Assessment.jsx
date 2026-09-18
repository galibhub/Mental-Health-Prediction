function Assessment() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="surface-strong rounded-[30px] p-7 sm:p-10">
        <span className="inline-flex rounded-full bg-pine-soft px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-pine">
          Assessment · Coming next
        </span>

        <h1 className="mt-6 font-display text-4xl text-pine-deep sm:text-6xl">
          Your assessment
          <span className="block italic text-pine">
            starts here.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft">
          The full multi-step questionnaire will be built in the next
          milestone, using the fields accepted by your FastAPI model.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Profile"],
            ["02", "Digital habits"],
            ["03", "Lifestyle & stress"],
          ].map(([number, label]) => (
            <div
              key={number}
              className="rounded-2xl border border-line bg-white/70 p-5"
            >
              <p className="font-mono text-xs text-pine">{number}</p>
              <p className="mt-2 font-semibold text-ink">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Assessment;
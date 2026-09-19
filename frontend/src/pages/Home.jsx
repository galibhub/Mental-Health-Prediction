import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0 -z-10">

          <div className="absolute left-[10%] top-20 h-64 w-64 rounded-full bg-[#8a80ff]/10 blur-3xl" />

          <div className="absolute right-[5%] top-40 h-72 w-72 rounded-full bg-[#c8c2ff]/20 blur-3xl" />

        </div>


        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 shadow-sm">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine opacity-30" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pine" />

                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                  Machine-learning wellness signal
                </span>

              </div>


              <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight text-pine-deep sm:text-6xl lg:text-7xl">

                Understand your
                <span className="ml-2 italic text-pine">
                  everyday pattern.
                </span>

              </h1>


              <p className="mt-7 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">

                Explore how daily digital habits,
                sleep, study, physical activity and
                perceived stress come together in a
                machine-learning-based mental health
                score.

              </p>


              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/assessment"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-pine
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-soft
                    transition
                    hover:-translate-y-0.5
                    hover:bg-pine-deep
                  "
                >

                  Take the assessment

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


                <a
                  href="#how-it-works"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-line
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-ink-soft
                    transition
                    hover:bg-paper
                    hover:text-ink
                  "
                >
                  See how it works
                </a>

              </div>


              <div className="mt-8 flex flex-wrap gap-5">

                <MiniPoint text="Fast assessment" />

                <MiniPoint text="Personal history" />

                <MiniPoint text="ML-powered prediction" />

              </div>

            </div>


            {/* RIGHT VISUAL */}

            <div className="relative">

              <div className="rounded-[32px] border border-line bg-white p-4 shadow-card sm:p-5">

                <div className="rounded-[26px] bg-gradient-to-br from-pine-deep via-[#403a8c] to-[#8a80ff] p-6 text-white sm:p-7">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                        Assessment snapshot
                      </p>

                      <p className="mt-2 font-display text-2xl">
                        Your daily pattern
                      </p>

                    </div>


                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">

                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 17l5-5 4 3 7-8" />
                        <path d="M17 7h3v3" />
                      </svg>

                    </div>

                  </div>


                  <div className="mt-8 grid grid-cols-2 gap-3">

                    <PatternCard
                      label="Screen time"
                      value="Daily"
                    />

                    <PatternCard
                      label="Sleep"
                      value="Nightly"
                    />

                    <PatternCard
                      label="Activity"
                      value="Lifestyle"
                    />

                    <PatternCard
                      label="Stress"
                      value="Perceived"
                    />

                  </div>


                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs text-white/45">
                          Model
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Random Forest regression
                        </p>

                      </div>


                      <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/60">
                        Ready
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* Floating card */}

              <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-card sm:block lg:-left-8">

                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted">
                  Output
                </p>

                <p className="mt-1 text-sm font-semibold text-pine-deep">
                  Model score + context
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="border-y border-line bg-white"
      >

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="How it works"
            title="From your routine to a model signal."
            description="The assessment turns a small set of everyday inputs into a model-generated score that you can review and revisit over time."
          />


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <StepCard
              number="01"
              title="Share your pattern"
              description="Tell the system about your digital behavior, academic routine, sleep, activity and perceived stress."
            />

            <StepCard
              number="02"
              title="Run the model"
              description="Your inputs are processed through the trained machine-learning regression pipeline."
            />

            <StepCard
              number="03"
              title="Review the signal"
              description="Receive your predicted score and keep your assessment history connected to your account."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT WE LOOK AT
      ===================================================== */}

      <section className="bg-paper">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
                What the assessment covers
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight text-pine-deep sm:text-5xl">
                Small signals.
                <span className="block italic text-pine">
                  Broader context.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-ink-muted">
                The model receives several dimensions of
                everyday student life rather than a single
                input.
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              <FeatureCard
                icon="◌"
                title="Digital habits"
                text="Daily usage, unlock frequency and your most-used platform."
              />

              <FeatureCard
                icon="◒"
                title="Academic routine"
                text="Academic level and study time are included in the assessment."
              />

              <FeatureCard
                icon="○"
                title="Lifestyle"
                text="Sleep and physical activity help describe your everyday rhythm."
              />

              <FeatureCard
                icon="≈"
                title="Perceived stress"
                text="Your selected stress level becomes part of the model input."
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY THIS PROJECT
      ===================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="rounded-[36px] border border-line bg-gradient-to-br from-pine-soft via-white to-mint-soft p-7 sm:p-10 lg:p-12">

            <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">

              <div>

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
                  Built as a real application
                </p>

                <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-pine-deep sm:text-5xl">
                  More than a prediction page.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft">
                  Mental Health Signal combines a trained
                  regression model with a FastAPI backend,
                  MongoDB-based assessment storage and
                  authenticated user accounts.
                </p>

              </div>


              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">

                <TechRow
                  number="01"
                  label="React + Vite"
                />

                <TechRow
                  number="02"
                  label="FastAPI + ML"
                />

                <TechRow
                  number="03"
                  label="MongoDB + JWT"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SCORE EXPLANATION
      ===================================================== */}

      <section className="bg-pine-deep text-white">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            <div>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a8cff]">
                About the result
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                A score is a signal,
                <span className="block italic text-[#b8b2ff]">
                  not a diagnosis.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
                Results are presented as model-score ranges
                based on the training target distribution.
                They are intended for informational exploration,
                not clinical interpretation.
              </p>

            </div>


            <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">

              <div className="rounded-3xl bg-white p-6 text-ink">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                      Example model score
                    </p>

                    <p className="mt-2 font-display text-5xl text-pine-deep">
                      6.32
                    </p>

                  </div>

                  <span className="rounded-full bg-pine-soft px-3 py-1.5 text-xs font-semibold text-pine-deep">
                    Middle range
                  </span>

                </div>


                <div className="mt-7">

                  <div className="relative h-3 overflow-hidden rounded-full bg-paper">

                    <div className="absolute left-0 top-0 h-full w-[25%] rounded-l-full bg-[#ddd9ff]" />

                    <div className="absolute left-[25%] top-0 h-full w-[50%] bg-[#b6afff]" />

                    <div className="absolute right-0 top-0 h-full w-[25%] rounded-r-full bg-[#8178ff]" />


                    <span className="absolute left-[61%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-pine shadow-sm" />

                  </div>


                  <div className="mt-3 flex justify-between font-mono text-[9px] text-ink-muted">

                    <span>3.6</span>

                    <span>5.1</span>

                    <span>6.0</span>

                    <span>7.0</span>

                    <span>9.4</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-paper">

        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">

          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-pine-soft text-pine-deep">

            <span className="text-lg">
              ↗
            </span>

          </div>

          <h2 className="mt-5 font-display text-4xl text-pine-deep sm:text-5xl">
            Ready to explore your pattern?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-muted">
            Complete the assessment and see how the
            trained model interprets the information you
            provide.
          </p>


          <Link
            to="/assessment"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-pine
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-soft
              transition
              hover:-translate-y-0.5
              hover:bg-pine-deep
            "
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

      </section>

    </div>
  );
}


/* ===========================================================
   SMALL COMPONENTS
=========================================================== */


function MiniPoint({
  text,
}) {
  return (
    <div className="flex items-center gap-2">

      <span className="grid h-5 w-5 place-items-center rounded-full bg-pine-soft text-[10px] font-bold text-pine-deep">
        ✓
      </span>

      <span className="text-xs font-medium text-ink-muted">
        {text}
      </span>

    </div>
  );
}


function PatternCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

      <p className="text-[10px] text-white/40">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-white">
        {value}
      </p>

    </div>
  );
}


function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="max-w-2xl">

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-display text-4xl leading-tight text-pine-deep sm:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-ink-muted">
        {description}
      </p>

    </div>
  );
}


function StepCard({
  number,
  title,
  description,
}) {
  return (
    <div className="group rounded-[28px] border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">

      <span className="font-mono text-[10px] tracking-[0.2em] text-pine">
        {number}
      </span>

      <h3 className="mt-8 font-display text-2xl text-pine-deep">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-ink-muted">
        {description}
      </p>

    </div>
  );
}


function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-[26px] border border-line bg-white p-6 shadow-sm">

      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-pine-soft font-display text-xl text-pine-deep">
        {icon}
      </div>

      <h3 className="mt-5 font-display text-2xl text-pine-deep">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {text}
      </p>

    </div>
  );
}


function TechRow({
  number,
  label,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 px-4 py-3">

      <span className="font-mono text-[9px] tracking-[0.15em] text-pine">
        {number}
      </span>

      <span className="text-sm font-semibold text-pine-deep">
        {label}
      </span>

    </div>
  );
}


export default Home;
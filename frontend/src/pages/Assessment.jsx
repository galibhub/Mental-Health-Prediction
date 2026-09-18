import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    id: 1,
    eyebrow: "01",
    title: "Personal",
    description: "A little context about you.",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "Digital habits",
    description: "How technology fits into your day.",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Lifestyle & stress",
    description: "Your everyday rhythm.",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Review",
    description: "Check everything before submitting.",
  },
];

const INITIAL_DATA = {
  age: "",
  gender: "",
  country: "",
  academic_level: "",

  most_used_platform: "",
  purpose_of_use: "",
  avg_daily_usage_hours: "",
  daily_unlocks: "",

  study_hours: "",
  physical_activity_hours: "",
  sleep_hours_per_night: "",
  stress_level: "",
};

const COUNTRIES = [
  "Bangladesh",
  "India",
  "USA",
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "Mexico",
  "Turkey",
  "France",
];

const PLATFORMS = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Snapchat",
  "Twitter",
  "YouTube",
  "TikTok",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

const PURPOSES = [
  "Networking",
  "Education",
  "Entertainment",
  "News",
];

const ACADEMIC_LEVELS = [
  "High School",
  "Undergraduate",
  "Graduate",
];

const STRESS_LEVELS = [
  {
    value: "Low",
    label: "Low",
    description: "Mostly calm",
  },
  {
    value: "Medium",
    label: "Medium",
    description: "Some pressure",
  },
  {
    value: "High",
    label: "High",
    description: "Often stressed",
  },
  {
    value: "Very High",
    label: "Very high",
    description: "Significant pressure",
  },
];

function FieldLabel({ children, hint }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <label className="text-sm font-semibold text-ink">
        {children}
      </label>

      {hint && (
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
          {hint}
        </span>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  step,
  list,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      list={list}
      className="w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink-muted/70 focus:border-pine/40 focus:bg-white focus:ring-4 focus:ring-pine/10"
    />
  );
}

function SelectInput({ value, onChange, placeholder, options }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full appearance-none rounded-2xl border border-line bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-all duration-300 focus:border-pine/40 focus:bg-white focus:ring-4 focus:ring-pine/10"
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function ChoiceButton({
  selected,
  onClick,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-2xl border p-4 text-left transition-all duration-300",
        selected
          ? "border-pine bg-pine-soft shadow-soft"
          : "border-line bg-paper hover:-translate-y-0.5 hover:border-pine/25 hover:bg-white",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>

          {description && (
            <p className="mt-1 text-xs leading-5 text-ink-muted">
              {description}
            </p>
          )}
        </div>

        <span
          className={[
            "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition",
            selected
              ? "border-pine bg-pine text-white"
              : "border-line bg-white",
          ].join(" ")}
        >
          {selected && (
            <svg
              viewBox="0 0 20 20"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 10 3 3 7-7" />
            </svg>
          )}
        </span>
      </div>
    </button>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-pine">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-display text-3xl text-pine-deep sm:text-4xl">
        {title}
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-7 text-ink-soft">
        {description}
      </p>
    </div>
  );
}

function StepIcon({ number, active, completed }) {
  return (
    <div
      className={[
        "grid h-10 w-10 shrink-0 place-items-center rounded-2xl border font-mono text-xs font-bold transition-all duration-300",
        completed
          ? "border-pine bg-pine text-white"
          : active
            ? "border-pine/30 bg-pine-soft text-pine-deep shadow-soft"
            : "border-line bg-white text-ink-muted",
      ].join(" ")}
    >
      {completed ? (
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 10 3 3 7-7" />
        </svg>
      ) : (
        number
      )}
    </div>
  );
}

function Assessment() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [completed, setCompleted] = useState(false);

  const progress = useMemo(() => {
    return (step / STEPS.length) * 100;
  }, [step]);

  const updateField = (field, value) => {
    setData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 1) {
      if (!data.age) {
        nextErrors.age = "Age is required.";
      } else if (Number(data.age) < 10 || Number(data.age) > 100) {
        nextErrors.age = "Enter an age between 10 and 100.";
      }

      if (!data.gender) {
        nextErrors.gender = "Please select your gender.";
      }

      if (!data.country.trim()) {
        nextErrors.country = "Country is required.";
      }

      if (!data.academic_level) {
        nextErrors.academic_level = "Please select your academic level.";
      }
    }

    if (step === 2) {
      if (!data.most_used_platform) {
        nextErrors.most_used_platform =
          "Please select a platform.";
      }

      if (!data.purpose_of_use) {
        nextErrors.purpose_of_use =
          "Please select your primary purpose.";
      }

      if (
        data.avg_daily_usage_hours === "" ||
        Number(data.avg_daily_usage_hours) < 0 ||
        Number(data.avg_daily_usage_hours) > 24
      ) {
        nextErrors.avg_daily_usage_hours =
          "Enter a value from 0 to 24 hours.";
      }

      if (
        data.daily_unlocks === "" ||
        Number(data.daily_unlocks) < 0
      ) {
        nextErrors.daily_unlocks =
          "Enter 0 or more unlocks.";
      }
    }

    if (step === 3) {
      if (
        data.study_hours === "" ||
        Number(data.study_hours) < 0 ||
        Number(data.study_hours) > 24
      ) {
        nextErrors.study_hours =
          "Enter a value from 0 to 24 hours.";
      }

      if (
        data.physical_activity_hours === "" ||
        Number(data.physical_activity_hours) < 0 ||
        Number(data.physical_activity_hours) > 24
      ) {
        nextErrors.physical_activity_hours =
          "Enter a value from 0 to 24 hours.";
      }

      if (
        data.sleep_hours_per_night === "" ||
        Number(data.sleep_hours_per_night) < 0 ||
        Number(data.sleep_hours_per_night) > 24
      ) {
        nextErrors.sleep_hours_per_night =
          "Enter a value from 0 to 24 hours.";
      }

      if (!data.stress_level) {
        nextErrors.stress_level =
          "Please select your stress level.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;

    setStep((current) => Math.min(current + 1, STEPS.length));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  };

  const submitAssessment = () => {
    setCompleted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetAssessment = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setStep(1);
    setCompleted(false);
  };

  if (completed) {
    return (
      <section className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden">
        <div className="ambient-orb ambient-orb-one -right-24 top-12 -z-10" />
        <div className="ambient-orb ambient-orb-two -left-24 bottom-12 -z-10" />

        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="surface-strong overflow-hidden rounded-[32px]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-pine-deep p-8 text-white sm:p-10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-mint"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20V10" />
                    <path d="M12 13C8.8 13 7 11.3 7 8.5C7 7 8.2 6 9.7 6c1.2 0 2.1.6 2.3 1.7" />
                    <path d="M12 15c3.2 0 5-1.7 5-4.5C17 9 15.8 8 14.3 8c-1.2 0-2.1.6-2.3 1.7" />
                    <path d="M9 20h6" />
                  </svg>
                </div>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
                  Assessment captured
                </p>

                <h1 className="mt-3 font-display text-4xl sm:text-5xl">
                  Ready for
                  <span className="block italic text-mint">
                    the signal.
                  </span>
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                  Your responses have been collected successfully. The next
                  milestone connects this assessment to your FastAPI model.
                </p>

                <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  12 inputs captured
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Response summary
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Age", `${data.age} years`],
                    ["Academic", data.academic_level],
                    ["Platform", data.most_used_platform],
                    ["Screen time", `${data.avg_daily_usage_hours} hrs`],
                    ["Sleep", `${data.sleep_hours_per_night} hrs`],
                    ["Stress", data.stress_level],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-line bg-paper p-4"
                    >
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                        {label}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-ink">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl bg-amber-soft p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                    Important
                  </p>

                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    This application provides a model-based screening signal.
                    It is not a medical diagnosis.
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={resetAssessment}
                    className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-pine/25 hover:bg-mint-soft"
                  >
                    Start over
                  </button>

                  <Link
                    to="/"
                    className="rounded-xl bg-pine px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-pine-deep"
                  >
                    Return home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden">
      <div className="ambient-orb ambient-orb-one -right-32 top-10 -z-10" />
      <div className="ambient-orb ambient-orb-two -left-28 bottom-10 -z-10" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:py-14">
        {/* top bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-pine"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 10H5" />
              <path d="m9 6-4 4 4 4" />
            </svg>

            Back to home
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Assessment
            </span>

            <span className="h-1 w-1 rounded-full bg-line" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-pine">
              {step} / {STEPS.length}
            </span>
          </div>
        </div>

        {/* progress */}
        <div className="mb-8">
          <div className="h-1.5 overflow-hidden rounded-full bg-paper-deep">
            <div
              className="h-full rounded-full bg-pine transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr] xl:grid-cols-[330px_1fr]">
          {/* sidebar */}
          <aside className="surface rounded-[28px] p-5 lg:sticky lg:top-24 lg:h-fit">
            <div className="px-2 pb-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                Your journey
              </p>

              <h2 className="mt-2 font-display text-2xl text-pine-deep">
                One step
                <span className="italic text-pine"> at a time.</span>
              </h2>
            </div>

            <div className="space-y-2">
              {STEPS.map((item) => {
                const active = step === item.id;
                const isCompleted = step > item.id;

                return (
                  <div
                    key={item.id}
                    className={[
                      "flex items-center gap-3 rounded-2xl p-3 transition-all duration-300",
                      active
                        ? "bg-pine-soft"
                        : "hover:bg-paper",
                    ].join(" ")}
                  >
                    <StepIcon
                      number={item.eyebrow}
                      active={active}
                      completed={isCompleted}
                    />

                    <div className="min-w-0">
                      <p
                        className={[
                          "text-sm font-semibold",
                          active
                            ? "text-pine-deep"
                            : "text-ink-soft",
                        ].join(" ")}
                      >
                        {item.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-pine-deep p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mint">
                  Progress
                </span>

                <span className="font-mono text-[10px] text-white/50">
                  {Math.round(progress)}%
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/65">
                There are no right or wrong answers here. Just describe your
                everyday rhythm as honestly as you can.
              </p>
            </div>
          </aside>

          {/* form */}
          <div className="surface-strong rounded-[28px] p-6 sm:p-8 lg:p-10">
            {step === 1 && (
              <>
                <SectionHeading
                  eyebrow="01 · Personal"
                  title="Let's start with context."
                  description="These details help the model understand the background behind your daily patterns."
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <FieldLabel hint="10–100">Age</FieldLabel>

                    <TextInput
                      type="number"
                      min="10"
                      max="100"
                      step="1"
                      placeholder="e.g. 21"
                      value={data.age}
                      onChange={(value) =>
                        updateField("age", value)
                      }
                    />

                    {errors.age && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.age}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Gender</FieldLabel>

                    <div className="grid grid-cols-2 gap-3">
                      {["Male", "Female"].map((option) => (
                        <ChoiceButton
                          key={option}
                          title={option}
                          selected={data.gender === option}
                          onClick={() =>
                            updateField("gender", option)
                          }
                        />
                      ))}
                    </div>

                    {errors.gender && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Country</FieldLabel>

                    <TextInput
                      list="country-options"
                      placeholder="e.g. Bangladesh"
                      value={data.country}
                      onChange={(value) =>
                        updateField("country", value)
                      }
                    />

                    <datalist id="country-options">
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country} />
                      ))}
                    </datalist>

                    <p className="mt-2 text-xs text-ink-muted">
                      Not listed? You can type your country.
                    </p>

                    {errors.country && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Academic level</FieldLabel>

                    <SelectInput
                      value={data.academic_level}
                      onChange={(value) =>
                        updateField("academic_level", value)
                      }
                      placeholder="Choose academic level"
                      options={ACADEMIC_LEVELS}
                    />

                    {errors.academic_level && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.academic_level}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <SectionHeading
                  eyebrow="02 · Digital habits"
                  title="How does technology fit into your day?"
                  description="Tell us about your usual social-media and phone-use patterns."
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <FieldLabel>Most-used platform</FieldLabel>

                    <SelectInput
                      value={data.most_used_platform}
                      onChange={(value) =>
                        updateField(
                          "most_used_platform",
                          value,
                        )
                      }
                      placeholder="Choose a platform"
                      options={PLATFORMS}
                    />

                    {errors.most_used_platform && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.most_used_platform}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Primary purpose</FieldLabel>

                    <SelectInput
                      value={data.purpose_of_use}
                      onChange={(value) =>
                        updateField("purpose_of_use", value)
                      }
                      placeholder="What do you mainly use it for?"
                      options={PURPOSES}
                    />

                    {errors.purpose_of_use && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.purpose_of_use}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel hint="0–24 hrs">
                      Average daily screen time
                    </FieldLabel>

                    <div className="relative">
                      <TextInput
                        type="number"
                        min="0"
                        max="24"
                        step="0.1"
                        placeholder="e.g. 5.5"
                        value={data.avg_daily_usage_hours}
                        onChange={(value) =>
                          updateField(
                            "avg_daily_usage_hours",
                            value,
                          )
                        }
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-ink-muted">
                        hrs
                      </span>
                    </div>

                    {errors.avg_daily_usage_hours && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.avg_daily_usage_hours}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel hint="0+">
                      Daily phone unlocks
                    </FieldLabel>

                    <TextInput
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 60"
                      value={data.daily_unlocks}
                      onChange={(value) =>
                        updateField("daily_unlocks", value)
                      }
                    />

                    {errors.daily_unlocks && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.daily_unlocks}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-line bg-mint-soft p-5">
                  <div className="flex gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-pine shadow-sm">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="5"
                          y="2.5"
                          width="10"
                          height="15"
                          rx="2"
                        />
                        <path d="M8 5h4" />
                        <path d="M9 14.5h2" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Think about a typical day
                      </p>

                      <p className="mt-1 text-xs leading-6 text-ink-soft">
                        Use your usual average rather than an unusually busy
                        or quiet day.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <SectionHeading
                  eyebrow="03 · Lifestyle & stress"
                  title="Now, your everyday rhythm."
                  description="These signals describe sleep, study, physical activity and perceived stress."
                />

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <FieldLabel hint="0–24 hrs">
                      Study hours / day
                    </FieldLabel>

                    <TextInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 5"
                      value={data.study_hours}
                      onChange={(value) =>
                        updateField("study_hours", value)
                      }
                    />

                    {errors.study_hours && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.study_hours}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel hint="0–24 hrs">
                      Physical activity / day
                    </FieldLabel>

                    <TextInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 1"
                      value={data.physical_activity_hours}
                      onChange={(value) =>
                        updateField(
                          "physical_activity_hours",
                          value,
                        )
                      }
                    />

                    {errors.physical_activity_hours && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.physical_activity_hours}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel hint="0–24 hrs">
                      Sleep / night
                    </FieldLabel>

                    <TextInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 7"
                      value={data.sleep_hours_per_night}
                      onChange={(value) =>
                        updateField(
                          "sleep_hours_per_night",
                          value,
                        )
                      }
                    />

                    {errors.sleep_hours_per_night && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.sleep_hours_per_night}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <FieldLabel>
                    Perceived stress level
                  </FieldLabel>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {STRESS_LEVELS.map((option) => (
                      <ChoiceButton
                        key={option.value}
                        title={option.label}
                        description={option.description}
                        selected={
                          data.stress_level === option.value
                        }
                        onClick={() =>
                          updateField(
                            "stress_level",
                            option.value,
                          )
                        }
                      />
                    ))}
                  </div>

                  {errors.stress_level && (
                    <p className="mt-2 text-xs text-coral">
                      {errors.stress_level}
                    </p>
                  )}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-paper p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                      Study
                    </p>

                    <p className="mt-2 font-mono text-xl font-bold text-pine-deep">
                      {data.study_hours || "—"}
                      <span className="ml-1 text-[10px] font-normal text-ink-muted">
                        hrs
                      </span>
                    </p>
                  </div>

                  <div className="rounded-2xl bg-paper p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                      Movement
                    </p>

                    <p className="mt-2 font-mono text-xl font-bold text-pine-deep">
                      {data.physical_activity_hours || "—"}
                      <span className="ml-1 text-[10px] font-normal text-ink-muted">
                        hrs
                      </span>
                    </p>
                  </div>

                  <div className="rounded-2xl bg-paper p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                      Sleep
                    </p>

                    <p className="mt-2 font-mono text-xl font-bold text-pine-deep">
                      {data.sleep_hours_per_night || "—"}
                      <span className="ml-1 text-[10px] font-normal text-ink-muted">
                        hrs
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <SectionHeading
                  eyebrow="04 · Review"
                  title="A final look before we read the signal."
                  description="Check the information below. You can go back and change anything before submitting."
                />

                <div className="space-y-4">
                  <div className="rounded-2xl border border-line bg-paper p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-pine">
                        Personal
                      </p>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-pine transition hover:text-pine-deep"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        ["Age", data.age],
                        ["Gender", data.gender],
                        ["Country", data.country],
                        ["Academic", data.academic_level],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-[11px] text-ink-muted">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-ink">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line bg-paper p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-pine">
                        Digital habits
                      </p>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-pine transition hover:text-pine-deep"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        [
                          "Platform",
                          data.most_used_platform,
                        ],
                        ["Purpose", data.purpose_of_use],
                        [
                          "Screen time",
                          `${data.avg_daily_usage_hours} hrs`,
                        ],
                        [
                          "Unlocks",
                          data.daily_unlocks,
                        ],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-[11px] text-ink-muted">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-ink">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line bg-paper p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-pine">
                        Lifestyle & stress
                      </p>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs font-semibold text-pine transition hover:text-pine-deep"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        [
                          "Study",
                          `${data.study_hours} hrs`,
                        ],
                        [
                          "Activity",
                          `${data.physical_activity_hours} hrs`,
                        ],
                        [
                          "Sleep",
                          `${data.sleep_hours_per_night} hrs`,
                        ],
                        ["Stress", data.stress_level],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-[11px] text-ink-muted">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-ink">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 rounded-2xl border border-amber/20 bg-amber-soft p-5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/80 text-ink">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="10" cy="10" r="7.5" />
                      <path d="M10 8v5" />
                      <path d="M10 5.5h.01" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Before you continue
                    </p>

                    <p className="mt-1 text-xs leading-6 text-ink-soft">
                      The result generated by this application is an
                      ML-based screening signal and should not be treated as
                      a medical diagnosis.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* navigation */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-pine px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-card"
                >
                  Continue

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
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitAssessment}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-pine px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-card"
                >
                  Complete assessment

                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 10 3 3 7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Assessment;
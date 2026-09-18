import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { getSignal } from "../utils/signal";

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
    description: "Mostly calm",
  },
  {
    value: "Medium",
    description: "Some pressure",
  },
  {
    value: "High",
    description: "Often stressed",
  },
  {
    value: "Very High",
    description: "Significant pressure",
  },
];

const GAUGE_LENGTH = Math.PI * 100;

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
      className="w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink-muted/70 hover:border-pine/20 focus:border-pine/40 focus:bg-white focus:ring-4 focus:ring-pine/10"
    />
  );
}

function SelectInput({
  value,
  onChange,
  placeholder,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-2xl border border-line bg-paper px-4 py-3.5 pr-11 text-sm text-ink outline-none transition-all duration-300 hover:border-pine/20 focus:border-pine/40 focus:bg-white focus:ring-4 focus:ring-pine/10"
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

      <svg
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 7 5 5 5-5" />
      </svg>
    </div>
  );
}

function StressButton({
  option,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-4 text-left transition-all duration-300",
        selected
          ? "border-pine bg-pine text-white shadow-soft"
          : "border-line bg-paper text-ink hover:-translate-y-0.5 hover:border-pine/20 hover:bg-white",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p
            className={[
              "text-sm font-semibold",
              selected ? "text-white" : "text-ink",
            ].join(" ")}
          >
            {option.value}
          </p>

          <p
            className={[
              "mt-1 text-xs",
              selected ? "text-white/70" : "text-ink-muted",
            ].join(" ")}
          >
            {option.description}
          </p>
        </div>

        <span
          className={[
            "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
            selected
              ? "border-white/50 bg-white/15"
              : "border-line bg-white",
          ].join(" ")}
        >
          {selected && (
            <svg
              viewBox="0 0 20 20"
              className="h-3 w-3 text-white"
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

function SectionTitle({
  number,
  title,
  description,
}) {
  return (
    <div className="border-b border-line pb-5">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-pine-soft font-mono text-[10px] font-bold text-pine-deep">
          {number}
        </span>

        <h2 className="font-display text-2xl text-pine-deep sm:text-3xl">
          {title}
        </h2>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
        {description}
      </p>
    </div>
  );
}

function Gauge({ score }) {
  const clamped = Math.max(0, Math.min(10, score ?? 0));

  const offset =
    GAUGE_LENGTH * (1 - clamped / 10);

  const hasScore = typeof score === "number";

  return (
    <svg
      viewBox="0 0 240 160"
      className="mx-auto w-full max-w-[330px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="scoreGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#d95c67" />
          <stop offset="52%" stopColor="#d89b2b" />
          <stop offset="100%" stopColor="#635bff" />
        </linearGradient>
      </defs>

      <path
        d="M 30 140 A 100 100 0 0 1 210 140"
        fill="none"
        stroke="#353550"
        strokeOpacity="0.16"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {hasScore && (
        <path
          d="M 30 140 A 100 100 0 0 1 210 140"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={GAUGE_LENGTH}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      )}

      <circle
        cx="120"
        cy="140"
        r="6"
        fill={hasScore ? "#635bff" : "#b8b7c7"}
      />
    </svg>
  );
}

function Assessment() {
  const navigate = useNavigate();
  const resultRef = useRef(null);

  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [score, setScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const signal = useMemo(() => {
    if (score === null) return null;
    return getSignal(score);
  }, [score]);

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

    setApiError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (
      data.age === "" ||
      Number(data.age) < 10 ||
      Number(data.age) > 100
    ) {
      nextErrors.age =
        "Enter an age between 10 and 100.";
    }

    if (!data.gender) {
      nextErrors.gender = "Please select your gender.";
    }

    if (!data.country.trim()) {
      nextErrors.country = "Country is required.";
    }

    if (!data.academic_level) {
      nextErrors.academic_level =
        "Please select your academic level.";
    }

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

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = () => {
    return {
      age: Number(data.age),
      gender: data.gender,
      country: data.country.trim(),
      academic_level: data.academic_level,
      most_used_platform: data.most_used_platform,
      purpose_of_use: data.purpose_of_use,
      avg_daily_usage_hours: Number(
        data.avg_daily_usage_hours,
      ),
      daily_unlocks: Number(data.daily_unlocks),
      study_hours: Number(data.study_hours),
      physical_activity_hours: Number(
        data.physical_activity_hours,
      ),
      sleep_hours_per_night: Number(
        data.sleep_hours_per_night,
      ),
      stress_level: data.stress_level,
    };
  };

  const submitAssessment = async () => {
    if (isSubmitting) return;

    if (!validate()) {
      window.scrollTo({
        top: 120,
        behavior: "smooth",
      });
      return;
    }

    setIsSubmitting(true);
    setApiError("");
    setScore(null);

    try {
      const payload = buildPayload();

      const response = await api.post(
        "/predict",
        payload,
      );

      const predictedScore =
        response.data?.predicted_mental_health_score;

      if (
        typeof predictedScore !== "number" ||
        Number.isNaN(predictedScore)
      ) {
        throw new Error(
          "The API returned an invalid score.",
        );
      }

      setScore(predictedScore);

      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 422) {
          const detail = error.response.data?.detail;

          if (Array.isArray(detail)) {
            const serverErrors = {};

            detail.forEach((item) => {
              const location =
                Array.isArray(item.loc)
                  ? item.loc[item.loc.length - 1]
                  : null;

              if (location) {
                serverErrors[location] =
                  item.msg || "Invalid value.";
              }
            });

            setErrors((current) => ({
              ...current,
              ...serverErrors,
            }));
          }

          setApiError(
            "The API rejected some of the submitted values. Please review the highlighted fields.",
          );
        } else {
          setApiError(
            "The prediction service returned an error. Please try again.",
          );
        }
      } else if (error.request) {
        setApiError(
          "Could not reach the FastAPI server. Make sure the backend is running on port 8000.",
        );
      } else {
        setApiError(
          error.message ||
            "Something went wrong while generating the prediction.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAssessment = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setScore(null);
    setApiError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openFullResult = () => {
    if (score === null) return;

    navigate("/result", {
      state: {
        score,
        inputs: data,
      },
    });
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="ambient-orb ambient-orb-one -right-32 top-10 -z-10" />
      <div className="ambient-orb ambient-orb-two -left-28 bottom-24 -z-10" />

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* top heading */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-pine"
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

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
              Student wellness analytics
            </div>

            <h1 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-pine-deep sm:text-5xl">
              Understand your
              <span className="italic text-pine">
                {" "}
                daily signal.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">
              Share a few details about your habits, routine,
              screen time, and stress. The model returns a
              score from 0 to 10.
            </p>
          </div>

          <div className="surface rounded-2xl px-4 py-3 lg:max-w-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-pine-soft text-pine">
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <circle cx="10" cy="10" r="7.5" />
                  <path d="M10 8v5" />
                  <path d="M10 5.5h.01" />
                </svg>
              </span>

              <p className="text-xs leading-5 text-ink-soft">
                This is an ML-based informational signal,
                not a medical diagnosis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.82fr]">
          {/* =====================================================
              FORM
          ===================================================== */}
          <div className="surface-strong rounded-[30px] p-5 sm:p-7 lg:p-9">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitAssessment();
              }}
            >
              {/* Profile */}
              <section>
                <SectionTitle
                  number="01"
                  title="Profile"
                  description="A little context helps the model interpret your overall pattern."
                />

                <div className="mt-7 grid gap-5 md:grid-cols-3">
                  <div>
                    <FieldLabel hint="10–100">
                      Age
                    </FieldLabel>

                    <TextInput
                      type="number"
                      min="10"
                      max="100"
                      step="1"
                      placeholder="e.g. 22"
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
                      {["Male", "Female"].map(
                        (option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              updateField(
                                "gender",
                                option,
                              )
                            }
                            className={[
                              "rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-all duration-300",
                              data.gender === option
                                ? "border-pine bg-pine-soft text-pine-deep"
                                : "border-line bg-paper text-ink-soft hover:border-pine/20 hover:bg-white",
                            ].join(" ")}
                          >
                            {option}
                          </button>
                        ),
                      )}
                    </div>

                    {errors.gender && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>
                      Country
                    </FieldLabel>

                    <TextInput
                      list="country-options"
                      placeholder="e.g. Bangladesh"
                      value={data.country}
                      onChange={(value) =>
                        updateField(
                          "country",
                          value,
                        )
                      }
                    />

                    <datalist id="country-options">
                      {COUNTRIES.map((country) => (
                        <option
                          key={country}
                          value={country}
                        />
                      ))}
                    </datalist>

                    {errors.country && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Academic + Digital */}
              <section className="mt-10">
                <SectionTitle
                  number="02"
                  title="Academic & digital habits"
                  description="Tell us what technology usually looks like during a normal day."
                />

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <div>
                    <FieldLabel>
                      Academic level
                    </FieldLabel>

                    <SelectInput
                      value={data.academic_level}
                      onChange={(value) =>
                        updateField(
                          "academic_level",
                          value,
                        )
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

                  <div>
                    <FieldLabel>
                      Most-used platform
                    </FieldLabel>

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
                    <FieldLabel>
                      Primary purpose
                    </FieldLabel>

                    <SelectInput
                      value={data.purpose_of_use}
                      onChange={(value) =>
                        updateField(
                          "purpose_of_use",
                          value,
                        )
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
                        placeholder="e.g. 6"
                        value={
                          data.avg_daily_usage_hours
                        }
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
                        updateField(
                          "daily_unlocks",
                          value,
                        )
                      }
                    />

                    {errors.daily_unlocks && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.daily_unlocks}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Lifestyle */}
              <section className="mt-10">
                <SectionTitle
                  number="03"
                  title="Lifestyle & stress"
                  description="Your sleep, study, movement, and perceived stress complete the picture."
                />

                <div className="mt-7 grid gap-5 md:grid-cols-3">
                  <div>
                    <FieldLabel hint="0–24 hrs">
                      Study hours / day
                    </FieldLabel>

                    <div className="relative">
                      <TextInput
                        type="number"
                        min="0"
                        max="24"
                        step="0.1"
                        placeholder="e.g. 5"
                        value={data.study_hours}
                        onChange={(value) =>
                          updateField(
                            "study_hours",
                            value,
                          )
                        }
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-ink-muted">
                        hrs
                      </span>
                    </div>

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

                    <div className="relative">
                      <TextInput
                        type="number"
                        min="0"
                        max="24"
                        step="0.1"
                        placeholder="e.g. 1"
                        value={
                          data.physical_activity_hours
                        }
                        onChange={(value) =>
                          updateField(
                            "physical_activity_hours",
                            value,
                          )
                        }
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-ink-muted">
                        hrs
                      </span>
                    </div>

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

                    <div className="relative">
                      <TextInput
                        type="number"
                        min="0"
                        max="24"
                        step="0.1"
                        placeholder="e.g. 7"
                        value={
                          data.sleep_hours_per_night
                        }
                        onChange={(value) =>
                          updateField(
                            "sleep_hours_per_night",
                            value,
                          )
                        }
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-ink-muted">
                        hrs
                      </span>
                    </div>

                    {errors.sleep_hours_per_night && (
                      <p className="mt-2 text-xs text-coral">
                        {errors.sleep_hours_per_night}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <FieldLabel>
                    Perceived stress level
                  </FieldLabel>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {STRESS_LEVELS.map((option) => (
                      <StressButton
                        key={option.value}
                        option={option}
                        selected={
                          data.stress_level ===
                          option.value
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
              </section>

              {/* submit */}
              <div className="mt-10 border-t border-line pt-7">
                {apiError && (
                  <div className="mb-5 flex gap-3 rounded-2xl border border-coral/20 bg-coral-soft p-4">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-coral">
                      !
                    </div>

                    <p className="text-sm leading-6 text-ink-soft">
                      {apiError}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-ink-muted">
                    Use your usual day as the reference point.
                    There are no right or wrong answers.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-pine px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-card disabled:translate-y-0 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Reading your signal...
                      </>
                    ) : (
                      <>
                        Read my signal

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
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* =====================================================
              RESULT
          ===================================================== */}
          <aside
            ref={resultRef}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <div className="overflow-hidden rounded-[30px] bg-pine-deep text-white shadow-float">
              {/* top accent */}
              <div className="h-1.5 bg-gradient-to-r from-coral via-amber to-pine" />

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                      Live result
                    </p>

                    <h2 className="mt-1 font-display text-2xl">
                      Your signal
                    </h2>
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                    0–10
                  </span>
                </div>

                <div className="mt-6">
                  <Gauge score={score} />
                </div>

                {isSubmitting ? (
                  <div className="py-3 text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-white/10" />

                    <p className="font-display text-2xl">
                      Reading the signal...
                    </p>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/55">
                      Your responses are being passed through
                      the prediction model.
                    </p>
                  </div>
                ) : score === null ? (
                  <div className="py-3 text-center">
                    <p className="font-display text-2xl">
                      Your score will appear here
                    </p>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/55">
                      Complete the form and submit it to
                      generate your model-based score.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="flex items-end justify-center gap-2">
                        <span className="font-mono text-6xl font-bold tracking-[-0.06em] sm:text-7xl">
                          {score.toFixed(2)}
                        </span>

                        <span className="mb-2 font-mono text-sm text-white/45">
                          /10
                        </span>
                      </div>

                      <div className="mt-3 inline-flex items-center rounded-full bg-white/10 px-4 py-2">
                        <span className="mr-2 h-2 w-2 rounded-full bg-white/80" />

                        <span className="text-sm font-semibold">
                          {signal.label}
                        </span>
                      </div>

                      <p className="mt-5 text-sm font-medium leading-6 text-white/85">
                        {signal.title}
                      </p>

                      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/55">
                        {signal.context}
                      </p>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        [
                          "Screen time",
                          `${data.avg_daily_usage_hours} hrs`,
                        ],
                        [
                          "Sleep",
                          `${data.sleep_hours_per_night} hrs`,
                        ],
                        [
                          "Activity",
                          `${data.physical_activity_hours} hrs`,
                        ],
                        [
                          "Stress",
                          data.stress_level,
                        ],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                        >
                          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                            {label}
                          </p>

                          <p className="mt-2 text-sm font-semibold text-white">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                        About this result
                      </p>

                      <p className="mt-2 text-xs leading-6 text-white/55">
                        This score is generated from the trained
                        machine-learning model using the information
                        you submitted. It should be treated as an
                        informational signal, not a clinical assessment.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={openFullResult}
                        className="rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-pine-deep transition hover:bg-white/90"
                      >
                        Open full result
                      </button>

                      <button
                        type="button"
                        onClick={resetAssessment}
                        className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Run another assessment
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Assessment;
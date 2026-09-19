import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/useAuth";


function Dashboard() {

  const {
    user,
  } = useAuth();


  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    async function loadDashboard() {

      try {

        setError("");

        const response =
          await api.get(
            "/api/dashboard"
          );

        setData(
          response.data
        );

      } catch (error) {

        console.error(
          "Dashboard loading failed:",
          error
        );

        setError(
          error.response?.data?.detail ||
          "Unable to load dashboard."
        );

      } finally {

        setLoading(false);

      }
    }


    loadDashboard();

  }, []);


  if (loading) {

    return (
      <div className="grid min-h-[60vh] place-items-center">

        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-pine/20
            border-t-pine
          "
        />

      </div>
    );

  }


  if (error) {

    return (
      <section className="mx-auto max-w-4xl px-4 py-16">

        <div className="rounded-[28px] border border-coral/20 bg-coral-soft p-8 text-center">

          <h1 className="font-display text-3xl text-pine-deep">
            Dashboard unavailable
          </h1>

          <p className="mt-3 text-sm text-coral">
            {error}
          </p>

        </div>

      </section>
    );

  }


  const stats =
    data?.stats;


  const assessments =
    data?.recent_assessments || [];


  const firstName =
    user?.full_name?.split(" ")[0] ||
    "there";


  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pine">
            Personal dashboard
          </p>

          <h1 className="mt-2 font-display text-4xl text-pine-deep sm:text-5xl">
            Hello, {firstName}.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted">
            Review your assessment activity,
            model scores and saved history.
          </p>

        </div>


        <Link
          to="/assessment"
          className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            bg-pine
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-soft
            transition
            hover:bg-pine-deep
          "
        >
          New assessment
        </Link>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          label="Total assessments"
          value={
            stats?.total_assessments ??
            0
          }
        />

        <StatCard
          label="Average model score"
          value={
            stats?.average_score ??
            "—"
          }
        />

        <StatCard
          label="Latest model score"
          value={
            stats?.latest_score ??
            "—"
          }
        />

      </div>


      {/* =================================================
          HISTORY
      ================================================= */}

      <div className="mt-8 overflow-hidden rounded-[28px] border border-line bg-white shadow-card">

        <div className="border-b border-line px-5 py-5 sm:px-6">

          <h2 className="font-display text-2xl text-pine-deep">
            Assessment history
          </h2>

          <p className="mt-1 text-xs text-ink-muted">
            Your most recent prediction records
          </p>

        </div>


        {assessments.length > 0 ? (

          <div className="divide-y divide-line">

            {assessments.map(
              (assessment, index) => (

                <div
                  key={assessment.id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-5
                    transition
                    hover:bg-paper/60
                    sm:px-6
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        grid
                        h-10
                        w-10
                        shrink-0
                        place-items-center
                        rounded-2xl
                        bg-pine-soft
                        text-xs
                        font-bold
                        text-pine-deep
                      "
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>


                    <div>

                      <p className="text-sm font-semibold text-ink">
                        Mental health assessment
                      </p>

                      <p className="mt-1 text-xs text-ink-muted">
                        {formatDate(
                          assessment.created_at
                        )}
                      </p>

                    </div>

                  </div>


                  <div className="text-right">

                    <p className="font-display text-2xl text-pine-deep">
                      {assessment.score}
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                      model score
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="px-6 py-16 text-center">

            <p className="font-display text-2xl text-pine-deep">
              No assessments yet
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
              Complete your first assessment
              to start building your personal
              assessment history.
            </p>

            <Link
              to="/assessment"
              className="
                mt-6
                inline-flex
                rounded-2xl
                bg-pine
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-pine-deep
              "
            >
              Take assessment
            </Link>

          </div>

        )}

      </div>

    </section>
  );
}


function StatCard({
  label,
  value,
}) {

  return (

    <div className="rounded-[24px] border border-line bg-white p-5 shadow-sm">

      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </p>

      <p className="mt-4 font-display text-4xl text-pine-deep">
        {value}
      </p>

    </div>

  );
}


function formatDate(value) {

  if (!value) {
    return "Unknown date";
  }

  return new Date(
    value
  ).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

}


export default Dashboard;
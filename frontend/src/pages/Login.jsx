import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";


function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
  } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(
        form.email,
        form.password
      );

      const destination =
        location.state?.from?.pathname ||
        "/dashboard";

      navigate(destination, {
        replace: true,
      });

    } catch (error) {
      setError(
        error.response?.data?.detail ||
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  }


  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }


  return (
    <section className="mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl items-center px-4 py-12 sm:px-6">

      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-line bg-white shadow-card md:grid-cols-2">

        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <div className="hidden bg-gradient-to-br from-pine-deep via-[#403a8c] to-[#8a80ff] p-10 text-white md:flex md:flex-col md:justify-between">

          <div>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Mental Health Signal
            </p>

            <h1 className="mt-8 max-w-md font-display text-5xl leading-[0.98]">
              Your personal{" "}
              <span className="italic">
                wellness space.
              </span>
            </h1>

          </div>

          <p className="max-w-sm text-sm leading-6 text-white/70">
            Sign in to access your dashboard,
            assessment history and saved
            prediction records.
          </p>

        </div>


        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <div className="p-7 sm:p-10">

          <div className="mb-8">

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pine">
              Welcome back
            </p>

            <h2 className="mt-2 font-display text-4xl text-pine-deep">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-ink-muted">
              Access your assessment dashboard.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-2xl border border-coral/20 bg-coral-soft px-4 py-3 text-sm text-coral">
              {error}
            </div>
          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-ink">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-line
                  bg-paper
                  px-4
                  py-3.5
                  text-sm
                  text-ink
                  outline-none
                  transition
                  focus:border-pine
                  focus:bg-white
                  focus:ring-4
                  focus:ring-pine/10
                "
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-ink">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-line
                  bg-paper
                  px-4
                  py-3.5
                  text-sm
                  text-ink
                  outline-none
                  transition
                  focus:border-pine
                  focus:bg-white
                  focus:ring-4
                  focus:ring-pine/10
                "
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-2xl
                bg-pine
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-soft
                transition
                hover:bg-pine-deep
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>


          {/* REGISTER LINK */}

          <p className="mt-7 text-center text-sm text-ink-muted">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-pine hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </section>
  );
}


export default Login;
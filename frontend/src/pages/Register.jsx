import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";


function Register() {
  const navigate = useNavigate();

  const {
    register,
  } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


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


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");


    if (
      form.password !==
      form.confirm_password
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }


    if (form.password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    setLoading(true);


    try {

      await register(
        form.full_name,
        form.email,
        form.password
      );


      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );


    } catch (error) {

      setError(
        error.response?.data?.detail ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <section className="mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl items-center px-4 py-12 sm:px-6">

      <div className="mx-auto w-full max-w-xl rounded-[32px] border border-line bg-white p-7 shadow-card sm:p-10">

        {/* HEADER */}

        <div>

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pine">
            Create your account
          </p>

          <h1 className="mt-2 font-display text-4xl text-pine-deep">
            Start your journey
          </h1>

          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Your assessments and prediction
            history will be saved securely
            to your account.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-2xl border border-coral/20 bg-coral-soft px-4 py-3 text-sm text-coral">
            {error}
          </div>
        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >

          {/* FULL NAME */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-ink">
              Full name
            </label>

            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              autoComplete="name"
              className="
                w-full
                rounded-2xl
                border
                border-line
                bg-paper
                px-4
                py-3.5
                text-sm
                outline-none
                transition
                focus:border-pine
                focus:bg-white
                focus:ring-4
                focus:ring-pine/10
              "
            />

          </div>


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
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              autoComplete="new-password"
              className="
                w-full
                rounded-2xl
                border
                border-line
                bg-paper
                px-4
                py-3.5
                text-sm
                outline-none
                transition
                focus:border-pine
                focus:bg-white
                focus:ring-4
                focus:ring-pine/10
              "
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-ink">
              Confirm password
            </label>

            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              placeholder="Repeat your password"
              required
              minLength={8}
              autoComplete="new-password"
              className="
                w-full
                rounded-2xl
                border
                border-line
                bg-paper
                px-4
                py-3.5
                text-sm
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
              ? "Creating account..."
              : "Create account"}
          </button>

        </form>


        {/* LOGIN LINK */}

        <p className="mt-7 text-center text-sm text-ink-muted">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-pine hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>

    </section>
  );
}


export default Register;
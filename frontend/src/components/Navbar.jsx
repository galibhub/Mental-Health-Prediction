import { useState } from "react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";


const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Assessment",
    to: "/assessment",
  },
];


function LogoMark() {

  return (

    <div
      className="
        relative
        grid
        h-10
        w-10
        shrink-0
        place-items-center
        overflow-hidden
        rounded-2xl
        bg-pine
        text-white
        shadow-soft
      "
    >

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-pine
          via-pine
          to-[#8a80ff]
        "
      />

      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >

        <path d="M12 20V10" />

        <path d="M12 12.5C8.8 12.5 7 10.8 7 8.1C7 6.6 8.2 5.5 9.7 5.5c1.2 0 2.1.6 2.3 1.7" />

        <path d="M12 14.5c3.2 0 5-1.7 5-4.4C17 8.6 15.8 7.5 14.3 7.5c-1.2 0-2.1.6-2.3 1.7" />

        <path d="M9 20h6" />

      </svg>

    </div>

  );
}


function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);


  const {
    user,
    logout,
  } = useAuth();


  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .slice(0, 2)
        .map(
          (word) => word[0]
        )
        .join("")
        .toUpperCase()
    : "";


  function handleLogout() {

    logout();

    setMenuOpen(false);
  }


  return (

    <header className="sticky top-0 z-50">

      {/* =================================================
          BACKDROP
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          border-b
          border-line/70
          bg-ivory/80
          backdrop-blur-xl
        "
      />


      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <nav
          className="
            flex
            h-[76px]
            items-center
            justify-between
          "
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className="
              group
              flex
              items-center
              gap-3
            "
          >

            <LogoMark />


            <div className="hidden sm:block">

              <p
                className="
                  font-display
                  text-xl
                  leading-none
                  text-pine-deep
                "
              >
                Mental Health

                <span
                  className="
                    italic
                    text-pine
                  "
                >
                  {" "}Signal
                </span>
              </p>


              <p
                className="
                  mt-1
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-ink-muted
                "
              >
                Student wellness analytics
              </p>

            </div>


            <div className="sm:hidden">

              <p
                className="
                  font-display
                  text-lg
                  leading-none
                  text-pine-deep
                "
              >
                MHS
              </p>

            </div>

          </Link>


          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <div
            className="
              hidden
              items-center
              gap-2
              md:flex
            "
          >

            {/* Navigation */}

            <div
              className="
                flex
                items-center
                gap-1
                rounded-2xl
                border
                border-line
                bg-white/70
                p-1.5
                shadow-sm
              "
            >

              {navItems.map(
                (item) => (

                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({
                      isActive,
                    }) =>
                      [
                        "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",

                        isActive
                          ? "bg-pine-soft text-pine-deep shadow-sm"
                          : "text-ink-soft hover:bg-paper hover:text-ink",
                      ].join(" ")
                    }
                  >

                    {item.label}

                  </NavLink>

                )
              )}


              {/* Dashboard */}

              {user && (

                <NavLink
                  to="/dashboard"
                  className={({
                    isActive,
                  }) =>
                    [
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",

                      isActive
                        ? "bg-pine-soft text-pine-deep shadow-sm"
                        : "text-ink-soft hover:bg-paper hover:text-ink",
                    ].join(" ")
                  }
                >
                  Dashboard
                </NavLink>

              )}

            </div>


            {/* =================================================
                LOGGED OUT
            ================================================= */}

            {!user ? (

              <div
                className="
                  ml-2
                  flex
                  items-center
                  gap-1
                "
              >

                {/* Login */}

                <Link
                  to="/login"
                  className="
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-ink-soft
                    transition
                    hover:bg-paper
                    hover:text-ink
                  "
                >
                  Login
                </Link>


                {/* Register */}

                <Link
                  to="/register"
                  className="
                    rounded-xl
                    border
                    border-line
                    bg-white/80
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-pine-deep
                    shadow-sm
                    transition
                    hover:border-pine/20
                    hover:bg-pine-soft
                  "
                >
                  Register
                </Link>


                {/* Start Assessment */}

                <Link
                  to="/assessment"
                  className="
                    group
                    ml-2
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-pine
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-soft
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-pine-deep
                    hover:shadow-card
                  "
                >

                  Start assessment

                  <svg
                    viewBox="0 0 20 20"
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
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

            ) : (

              /* =================================================
                 LOGGED IN
              ================================================= */

              <div
                className="
                  ml-2
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-line
                  bg-white/80
                  p-1.5
                  shadow-sm
                "
              >

                {/* User */}

                <Link
                  to="/dashboard"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    px-2.5
                    py-1.5
                    transition
                    hover:bg-paper
                  "
                >

                  <span
                    className="
                      grid
                      h-8
                      w-8
                      shrink-0
                      place-items-center
                      rounded-xl
                      bg-pine-soft
                      text-xs
                      font-bold
                      text-pine-deep
                    "
                  >
                    {initials}
                  </span>


                  <span
                    className="
                      hidden
                      max-w-[120px]
                      truncate
                      text-sm
                      font-semibold
                      text-ink
                      lg:block
                    "
                  >
                    {user.full_name}
                  </span>

                </Link>


                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    rounded-xl
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-ink-muted
                    transition
                    hover:bg-coral-soft
                    hover:text-coral
                  "
                >
                  Logout
                </button>

              </div>

            )}

          </div>


          {/* =================================================
              MOBILE TOGGLE
          ================================================= */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (current) => !current
              )
            }
            className="
              grid
              h-11
              w-11
              place-items-center
              rounded-2xl
              border
              border-line
              bg-white
              text-ink
              transition
              hover:bg-paper
              md:hidden
            "
          >

            {menuOpen ? (

              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>

            ) : (

              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>

            )}

          </button>

        </nav>


        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {menuOpen && (

          <div className="pb-4 md:hidden">

            <div
              className="
                rounded-3xl
                border
                border-line
                bg-white
                p-3
                shadow-card
              "
            >

              {/* Navigation */}

              <div className="space-y-1">

                {navItems.map(
                  (item) => (

                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={({
                        isActive,
                      }) =>
                        [
                          "block rounded-2xl px-4 py-3.5 text-sm font-semibold transition",

                          isActive
                            ? "bg-pine-soft text-pine-deep"
                            : "text-ink-soft hover:bg-paper hover:text-ink",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>

                  )
                )}


                {/* Dashboard */}

                {user && (

                  <NavLink
                    to="/dashboard"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={({
                      isActive,
                    }) =>
                      [
                        "block rounded-2xl px-4 py-3.5 text-sm font-semibold transition",

                        isActive
                          ? "bg-pine-soft text-pine-deep"
                          : "text-ink-soft hover:bg-paper hover:text-ink",
                      ].join(" ")
                    }
                  >
                    Dashboard
                  </NavLink>

                )}

              </div>


              <div
                className="
                  my-3
                  h-px
                  bg-line
                "
              />


              {/* Model status */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-mint-soft
                  px-4
                  py-3
                "
              >

                <span className="relative flex h-2 w-2">

                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-pine
                      opacity-40
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-pine
                    "
                  />

                </span>


                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-ink-muted
                  "
                >
                  Prediction model online
                </span>

              </div>


              {/* =================================================
                  MOBILE LOGGED OUT
              ================================================= */}

              {!user ? (

                <>

                  <div
                    className="
                      mt-3
                      grid
                      grid-cols-2
                      gap-2
                    "
                  >

                    <Link
                      to="/login"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="
                        rounded-2xl
                        border
                        border-line
                        bg-white
                        px-4
                        py-3.5
                        text-center
                        text-sm
                        font-semibold
                        text-ink
                        transition
                        hover:bg-paper
                      "
                    >
                      Login
                    </Link>


                    <Link
                      to="/register"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="
                        rounded-2xl
                        bg-pine
                        px-4
                        py-3.5
                        text-center
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-pine-deep
                      "
                    >
                      Register
                    </Link>

                  </div>


                  <Link
                    to="/assessment"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="
                      mt-2
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-pine
                      px-5
                      py-3.5
                      text-sm
                      font-semibold
                      text-white
                      transition
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

                </>

              ) : (

                /* =================================================
                   MOBILE LOGGED IN
                ================================================= */

                <div className="mt-3">

                  <Link
                    to="/dashboard"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-paper
                      px-4
                      py-3.5
                    "
                  >

                    <span
                      className="
                        grid
                        h-10
                        w-10
                        shrink-0
                        place-items-center
                        rounded-xl
                        bg-pine-soft
                        text-sm
                        font-bold
                        text-pine-deep
                      "
                    >
                      {initials}
                    </span>


                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-ink
                        "
                      >
                        {user.full_name}
                      </p>

                      <p
                        className="
                          truncate
                          text-xs
                          text-ink-muted
                        "
                      >
                        {user.email}
                      </p>

                    </div>

                  </Link>


                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      mt-2
                      w-full
                      rounded-2xl
                      bg-coral-soft
                      px-4
                      py-3.5
                      text-sm
                      font-semibold
                      text-coral
                      transition
                      hover:opacity-80
                    "
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </div>

        )}

      </div>

    </header>

  );
}


export default Navbar;
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";


function ProtectedRoute() {

  const {
    user,
    loading,
  } = useAuth();

  const location = useLocation();


  if (loading) {

    return (
      <div
        className="
          grid
          min-h-[60vh]
          place-items-center
        "
      >

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


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );

  }


  return <Outlet />;
}


export default ProtectedRoute;
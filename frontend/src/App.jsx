import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route element={<ProtectedRoute />}>

          <Route
            path="/assessment"
            element={<Assessment />}
          />

          <Route
            path="/result"
            element={<Result />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>


        <Route
          path="/404"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/404"
              replace
            />
          }
        />

      </Route>

    </Routes>
  );
}


export default App;
import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "./shared/Sidebar";
import { Box } from "@mui/material";
import Navbar from "./shared/Navbar";
import { useState } from "react";
import gradientImage from "./assets/gradient.png";
import AppRoutes from "./AppRoutes";
import Login from "./modules/auth/containers/Login";
import SignUp from "./modules/auth/containers/SignUp";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const IsLogged = () => {
  const logged = localStorage.getItem("token");
  return !logged ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="font-light font-kanit">
      <Routes>
        <Route element={<IsLogged />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/*"
            element={
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Sidebar open={collapsed} setOpen={setCollapsed} />
                <Box
                  sx={{
                    width: collapsed
                      ? "calc(100% - 80px)"
                      : "calc(100% - 270px)",
                    transition: "width 0.3s ease-in-out",
                  }}
                >
                  <Navbar />
                  <div
                    className=""
                    style={{
                      backgroundImage: `url(${gradientImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "calc(100dvh - 80px)",
                      width: "100%",
                    }}
                  >
                    <AppRoutes />
                  </div>
                </Box>
              </Box>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

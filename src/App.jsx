import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./shared/Sidebar";
import { Box } from "@mui/material";
import Navbar from "./shared/Navbar";
import { useState } from "react";
import gradientImage from "./assets/gradient.png";
import AppRoutes from "./AppRoutes";
import Footer from "./shared/PaginationContainer";
// import { useDispatch, useSelector } from "react-redux";

// const ProtectedRoute = () => {
//   const isAuthenticated = verifyToken();
//   return isAuthenticated.status ? <Outlet /> : <Navigate to="/login" />;
// };
// const IsLogged = () => {
//   const logged = verifyToken();
//   return !logged.status ? <Outlet /> : <Navigate to="/" />;
// };

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="font-light font-kanit">
      <Routes>
        <Route
          path="/*"
          element={
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Sidebar open={collapsed} setOpen={setCollapsed} />
              <Box
                sx={{
                  width: collapsed ? "calc(100% - 80px)" : "calc(100% - 270px)",
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
      </Routes>
    </div>
  );
}

export default App;

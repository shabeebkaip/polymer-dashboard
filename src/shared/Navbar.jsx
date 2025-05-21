import { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pageTitle } = useSelector((state) => state.sharedState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoading(false);
      window.location.href = "/login";
    }, 1000);
  };

  
  const handleBack = () => {
    navigate(-1);
  };
  const showBackButton = location.pathname !== "/" && location.pathname !== "/products";

  return (
    <nav className="w-full bg-white shadow-custom h-[80px]">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
        {showBackButton && (
            <IconButton onClick={handleBack} size="small" className="mr-2">
              <ArrowBackIcon sx={{ color: "#263238" }} />
            </IconButton>
          )}
          <h1 className="text-[#263238] text-2xl">{pageTitle}</h1>
        </div>

        <button
          onClick={() => handleLogout()}
          className="relative flex h-[55px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-6 py-2   md:flex-grow-0 md:gap-1 xl:gap-2 shadow-xl text-blue-700 font-medium  "
        >
          {loading ? (
            <CircularProgress size={"25px"} style={{ color: "#2f50ff" }} />
          ) : (
            "logout"
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

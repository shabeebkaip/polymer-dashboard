import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
    <nav className="w-full bg-white shadow-none border-b border-emerald-100 h-[72px]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="rounded-full bg-emerald-50 hover:bg-emerald-100 p-2 transition-colors border border-emerald-100 shadow-sm"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-600" />
            </button>
          )}
          <h1 className="text-emerald-700 text-2xl font-bold tracking-tight">{pageTitle}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="relative flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-2 shadow-lg text-white font-semibold transition-colors min-w-[110px] justify-center"
        >
          {loading ? (
            <CircularProgress size={22} style={{ color: "#fff" }} />
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

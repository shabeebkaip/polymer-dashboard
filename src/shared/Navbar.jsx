import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createLogApi } from "../modules/Logs/api";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const handleLogout = () => {
    createLogApi({
      user_name: JSON.parse(localStorage.getItem("user")).username,
      activity: "Logged out",
    }).then((response) => {
      console.log(response);
      localStorage.clear();
      window.location.href = "/login";
    }); 
  };
  return (
    <nav className="w-full bg-white shadow-custom  h-[80px]">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-5">
          <h1 className="text-[#263238] text-2xl">
            {" "}
            {location.pathname.includes("activity")
              ? "Activity Logs"
              : "Employees"}
          </h1>
        </div>

        <button
          onClick={() => handleLogout()}
          className="relative flex h-[55px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-6 py-2   md:flex-grow-0 md:gap-1 xl:gap-2 shadow-xl text-blue-700 font-medium  "
        >
          logout
        </button>
      </div>

      {loading && (
        <div>
          <div className="relative w-full h-1 bg-gray-200">
            <div className="absolute top-0 left-0 w-full h-full bg-[#2952FF] linear-loader"></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

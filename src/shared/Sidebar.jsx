import { useState, useCallback } from "react";
import logo from "../assets/btc_networks_logo.jpg";

const menuItems = [
  {
    displayName: "Employees",
    route: "/",
    name: "Employees",
    icon: "",
  },
  {
    displayName: "Activity Logs",
    route: "/activity-logs",
    name: "dashboard",
    icon: "",
  },
  {
    displayName: "Users",
    route: "/users",
    name: "dashboard",
    icon: "",
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const renderMenuItem = useCallback((item, index) => {
    const isSelected = location.pathname === item.route;

    const itemClasses = `flex items-center p-3 m-1 rounded-lg cursor-pointer transition-colors
        ${collapsed ? "justify-center" : "justify-start"}
        ${
          isSelected
            ? "bg-[#F6F7F6] text-[#004CFF]"
            : "text-[#363535] hover:bg-[#F6F7F6] hover:text-[#004CFF]"
        }`;

    return (
      <div
        key={index}
        className={itemClasses}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => {
          window.location.href = item.route;
        }}
      >
        {!collapsed && <span>{item.displayName}</span>}
      </div>
    );
  }, []);

  return (
    <div
      className={`h-screen bg-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[270px]"
      }`}
    >
      <div className="flex items-center justify-center">
        <img
          src={logo}
          alt="Logo"
          className={`transition-transform duration-300 ease-in-out object-contain w-20 h-20`}
        />
      </div>
      <div className="mt-4 overflow-y-auto customScrollbar ">
        {menuItems?.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default Sidebar;

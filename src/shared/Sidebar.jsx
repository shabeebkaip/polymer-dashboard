import React, { useState, useCallback } from "react";
import logo from '../assets/btc_networks_logo.jpg'

const menuItems = [
    {
        displayName: "Employees",
        route: "/",
        name: 'dashboard',
        icon: ''
    },
    {
        displayName: "Logs",
        route: "/logs",
        name: 'dashboard',
        icon: ''
    },
    {
        displayName: "Users",
        route: "/users",
        name: 'dashboard',
        icon: ''
    },
    // {
    //     displayName: "Signout",
    //     route: "/",
    //     name: 'dashboard',
    //     icon: ''
    // },

]

const Sidebar = ({ collapsed, setCollapsed }) => {
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const handleAccordionChange = useCallback((panel) => {
        setExpandedAccordion((prev) => (prev === panel ? null : panel));
    }, []);



    const renderMenuItem = useCallback(
        (item, index) => {
            const isSelected = location.pathname === item.route;

            const isHovered = hoveredItem === index;

            const itemClasses = `flex items-center p-3 m-1 rounded-lg cursor-pointer transition-colors
        ${collapsed ? "justify-center" : "justify-start"}
        ${isSelected
                    ? "bg-[#F6F7F6] text-[#004CFF]"
                    : "text-[#363535] hover:bg-[#F6F7F6] hover:text-[#004CFF]"
                }`;

            const iconFilter =
                isSelected || isHovered
                    ? "brightness(0) saturate(100%) invert(40%) sepia(100%) saturate(2500%) hue-rotate(208deg) brightness(95%) contrast(100%)"
                    : "none";

            return (
                <div
                    key={index}
                    className={itemClasses}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    {/* <img
                        src={icon}
                        alt={item.displayName}
                        className={`w-6 h-6 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
                        style={{ filter: iconFilter }}
                    /> */}
                    {!collapsed && <span>{item.displayName}</span>}
                </div>
            );
        },
        [collapsed, expandedAccordion, hoveredItem]
    );

    return (
        <div
            className={`h-screen bg-white transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-[270px]"
                }`}
        >
            <div className="flex justify-center items-center" >
                <img
                    src={logo}
                    alt="Logo"
                    className={`transition-transform duration-300 ease-in-out object-contain w-20 h-20`}
                />
            </div>
            <div className="overflow-y-auto  customScrollbar mt-4 ">
                {menuItems?.map(renderMenuItem)}
            </div>
        </div>
    );
};

export default Sidebar;

import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoLogoPolymer } from "react-icons/io";
import { GiFamilyTree, GiBrandyBottle } from "react-icons/gi";
import { TbBrandDenodo } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { Typography } from "@mui/material";

const menuItems = [
  {
    name: "products",
    displayName: "Products",
    route: "/products",
    icon: <IoLogoPolymer />,
  },
  {
    name: "products_family",
    displayName: "Product Families",
    route: "/product-families",
    icon: <GiFamilyTree />,
  },
  {
    name: "Industries",
    displayName: "industries",
    route: "/industries",
    icon: <MdCategory />,
  },
  {
    name: "chemical_family",
    displayName: "Chemical Family",
    route: "/chemical-family",
    icon: <GiBrandyBottle />,
  },
  {
    name: "brands",
    displayName: "Brands",
    route: "/brands",
    icon: <TbBrandDenodo />,
  },
  { name: "users", displayName: "Users", route: "/users", icon: <FaRegUser /> },
  {
    name: "enquiries",
    displayName: "Enquiries",
    route: "/enquiries",
    icon: <RiCustomerServiceLine />,
  },
];

const Sidebar = ({ collapsed }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const baseItemClasses =
    "flex items-center p-3 m-1 rounded-lg cursor-pointer transition-colors";
  const selectedClasses = "bg-[#F6F7F6] text-[#004CFF]";
  const hoverClasses = "text-[#363535] hover:bg-[#F6F7F6] hover:text-[#004CFF]";

  const renderMenuItems = useMemo(() => {
    return menuItems.map((item, index) => {
      const isSelected = location.pathname === item.route;
      const hasItems = item.items?.length > 0;
      const isSubmenuOpen = openSubmenus[item.name];

      const itemClasses = `${baseItemClasses} ${
        collapsed ? "justify-center" : "justify-between"
      } ${isSelected ? selectedClasses : hoverClasses}`;

      if (hasItems) {
        return (
          <div key={`${item.name}-${index}`}>
            <div
              className={itemClasses}
              onClick={() => toggleSubmenu(item.name)}
            >
              <div className="flex items-center">
                <div className="mr-2">{item.icon}</div>
                {!collapsed && <span>{item.displayName}</span>}
              </div>
              {!collapsed &&
                (isSubmenuOpen ? <RxCaretDown /> : <RxCaretRight />)}
            </div>

            {!collapsed && isSubmenuOpen && (
              <div className="ml-4">
                {item.items.map((subItem) => {
                  const isSubSelected = location.pathname === subItem.route;
                  const subItemClasses = `${baseItemClasses} ${
                    isSubSelected ? selectedClasses : hoverClasses
                  }`;

                  return (
                    <div
                      key={subItem.name}
                      className={subItemClasses}
                      onClick={() => (window.location.href = subItem.route)}
                    >
                      <span>{subItem.displayName}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      return (
        <div
          key={`${item.name}-${index}`}
          className={itemClasses}
          onClick={() => (window.location.href = item.route)}
        >
          <div className="flex items-center">
            <div className="mr-2">{item.icon}</div>
            {!collapsed && <span>{item.displayName}</span>}
          </div>
        </div>
      );
    });
  }, [collapsed, openSubmenus]);

  return (
    <div
      className={`h-screen bg-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[270px]"
      }`}
    >
      <div className="flex flex-col items-center justify-center shadow-sm ">
        <img
          src={"/polymer.svg"}
          alt="Logo"
          className="object-contain w-20 h-20 transition-transform duration-300 ease-in-out"
        />
        <Typography color="primary">Polymers Hub</Typography>
      </div>
      <div className="mt-4 overflow-y-auto customScrollbar">
        {renderMenuItems}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};

export default Sidebar;

import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";
import { MdCategory } from "react-icons/md";
import { IoLogoPolymer } from "react-icons/io";
import { GiFamilyTree } from "react-icons/gi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';



const menuItems = [
  {
    name: "products",
    displayName: "Products",
    route: "/products",
    icon: <IoLogoPolymer />,
  },
  {
    name: "users",
    displayName: "Users",
    route: "/users",
    icon: <GroupIcon />,

    items: [
      {
        name: "buyers",
        displayName: "Buyers",
        route: "/buyers-list",
      },
      {
        name: "sellers",
        displayName: "Sellers",
        route: "/sellers-list",
      },
    ],
  },
  {
    name: "enquiries",
    displayName: "Enquiries",
    route: "/enquiries",
    items: [
      {
        name: "Sample Requests",
        displayName: "Sample Requests",
        route: "/enquiries/sample",
        
      },
      {
        name: "Quote Requests",
        displayName: "Quote Requests",
        route: "/enquiries/quote",
      },
      {
        name: "finance Requests",
        displayName: "Finance Requests",
        route: "/enquiries/finance",
      },
    ],
    icon: <ForumIcon />,
  },
  {
    name: "dropdown",
    displayName: "Dropdown",
    route: "/dropdown",
    icon:  <ArrowDropDownIcon/>,
    items: [
      {
        name: "products_family",
        displayName: "Product Families",
        route: "/product-families",
      },
      {
        name: "Industries",
        displayName: "industries",
        route: "/industries",
      },
      {
        name: "polymer_type",
        displayName: "Polymer Types",
        route: "/polymer-type",      },
      {
        name: "payment_terms",
        displayName: "Payment Terms",
        route: "/payment-terms",
      },
      {
        name: "packaging_type",
        displayName: "Packaging Types",
        route: "/packaging-type",
      },
      {
        name: "physical_form",
        displayName: "Physical Form",
        route: "/physical-form",
      },
      {
        name: "grade",
        displayName: "Grade",
        route: "/grade",
      },
      {
        name: "incoterm",
        displayName: "Incoterm",
        route: "/incoterm",
      },
      {
        name: "chemical_family",
        displayName: "Chemical Family",
        route: "/chemical-family",
      },
    ],
  },
];

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
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
                      onClick={() => navigate(subItem.route)}
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
          onClick={() => navigate(item.route)}
        >
          <div className="flex items-center">
            <div className="mr-2">{item.icon}</div>
            {!collapsed && <span>{item.displayName}</span>}
          </div>
        </div>
      );
    });
  }, [collapsed, openSubmenus, navigate]);

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
      <div className="mt-4 overflow-y-auto h-[calc(100vh-140px)] customScrollbar">
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

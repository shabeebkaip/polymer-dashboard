import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// Lucide icons
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  FileStack,
} from "lucide-react";

const menuItems = [
  {
    name: "dashboard",
    displayName: "Dashboard",
    route: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "products",
    displayName: "Products",
    route: "/products",
    icon: <Package size={20} />,
  },
  {
    name: "users",
    displayName: "Users",
    route: "/users",
    icon: <Users size={20} />,
    items: [
      { name: "buyers", displayName: "Buyers", route: "/buyers-list" },
      { name: "sellers", displayName: "Sellers", route: "/sellers-list" },
      { name: "experts", displayName: "Experts", route: "/experts-list" },
    ],
  },
  {
    name: "procurement",
    displayName: "Procurement",
    route: "/enquiries",
    icon: <MessageCircle size={20} />,
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
      {
        name: "Bulk Order Requests",
        displayName: "Bulk Order Requests",
        route: "/enquiries/BulkOrder",
      },
      {
        name: "Best Deal Requests",
        displayName: "Best Deal Requests",
        route: "/enquiries/BestDeal",
      },
      {
        name: "Best Deal Quote Requests",
        displayName: "Best Deal Quote Requests",
        route: "/enquiries/DealQuote",
      },
      {
        name: "Supplier Offer Requests",
        displayName: "Supplier Offer Requests",
        route: "/enquiries/SupplierOffer",
      },
    ],
  },
  {
    name: "cms",
    displayName: "Cms",
    route: "/cms",
    icon: <FileText size={20} />,
    items: [
      {
        name: "Privacy & policy",
        displayName: "Privacy & policy",
        route: "/cms/privacyPolicy",
      },
      {
        name: "Terms & Conditions",
        displayName: "Terms & Conditions",
        route: "/cms/termsAndConditions",
      },
      {
        name: "social Media",
        displayName: "Social Media",
        route: "/cms/socialMedia",
      },
      {
        name: "Benefits For Buyer",
        displayName: "Benefits For Buyer",
        route: "/cms/BenefitsForBuyer",
      },
      {
        name: "Benefits For Suplier",
        displayName: "Benefits For Suplier",
        route: "/cms/BenefitsForSuplier",
      },
      {
        name: "Hero Section",
        displayName: "Hero Section",
        route: "/cms/HeroSection",
      },
      {
        name: "Footer Contact Info",
        displayName: "Footer Contact Info",
        route: "/cms/FooterMailNumber",
      },
      {
        name: "Polymer Advantages",
        displayName: "Polymer Advantages",
        route: "/cms/PolymerAdvantages",
      },
      {
        name: "testimonials",
        displayName: "Testimonials",
        route: "/cms/Testimonials",
      },
    ],
  },
  {
    name: "dropdown",
    displayName: "Master Data",
    route: "/dropdown",
    icon: <FileStack size={20} />,
    items: [
      {
        name: "products_family",
        displayName: "Product Families",
        route: "/product-families",
      },
      { name: "Industries", displayName: "industries", route: "/industries" },
      {
        name: "polymer_type",
        displayName: "Polymer Types",
        route: "/polymer-type",
      },
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
      { name: "grade", displayName: "Grade", route: "/grade" },
      { name: "incoterm", displayName: "Incoterm", route: "/incoterm" },
      {
        name: "chemical_family",
        displayName: "Chemical Family",
        route: "/chemical-family",
      },
      {
        name: "shipping-method",
        displayName: "Shipping Method",
        route: "/shipping-method",
      },
    ],
  },
];

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const emeraldGradient = "bg-gradient-to-br from-emerald-500 to-emerald-600";

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const baseItemClasses =
    "flex items-center p-3 m-1 rounded-xl cursor-pointer transition-colors duration-200 min-w-0";
  const selectedClasses =
    "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 shadow-sm";
  const hoverClasses =
    "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700";

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
          <div key={`${item.name}-${index}`} className="space-y-1 min-w-0">
            <div
              className={itemClasses}
              onClick={() => toggleSubmenu(item.name)}
            >
              <div className="flex items-center">
                <div
                  className={`mr-2 ${
                    isSelected ? "text-emerald-600" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="font-medium text-sm truncate">
                    {item.displayName}
                  </span>
                )}
              </div>
              {!collapsed &&
                (isSubmenuOpen ? (
                  <ChevronDown className="text-gray-400" size={16} />
                ) : (
                  <ChevronRight className="text-gray-400" size={16} />
                ))}
            </div>
            {!collapsed && isSubmenuOpen && (
              <div className="ml-4 space-y-1 pr-2 min-w-0">
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
                      <span className="text-sm font-medium truncate">
                        {subItem.displayName}
                      </span>
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
            <div
              className={`mr-2 ${
                isSelected ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              {item.icon}
            </div>
            {!collapsed && (
              <span className="font-medium text-sm truncate">
                {item.displayName}
              </span>
            )}
          </div>
        </div>
      );
    });
  }, [collapsed, openSubmenus, navigate]);

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[270px]"
      }`}
    >
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}
          >
            <img src={"/typography.svg"} alt="Logo" className="p-1" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base truncate">
                Admin
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 capitalize">
                  Admin
                </span>
                <div
                  className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"
                  title="Online"
                ></div>
              </div>
            </div>
          )}
        </div>
        {/* No email for admin */}
      </div>
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-3 min-w-0">{renderMenuItems}</nav>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default Sidebar;

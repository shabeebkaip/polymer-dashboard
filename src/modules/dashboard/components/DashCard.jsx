import { Users, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DashCard = ({ cardCounts }) => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(link);
  };

  const cardData = [
    {
      title: "Total Buyers",
      countKey: "buyers",
      icon: Users,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      link: "/buyers",
    },
    {
      title: "Total Sellers",
      countKey: "sellers",
      icon: ShoppingCart,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      link: "/sellers",
    },
    {
      title: "Total Products",
      countKey: "products",
      icon: Eye,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      link: "/products",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {cardData.map(({ title, countKey, icon: Icon, bgColor, textColor, link }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.03] cursor-pointer flex flex-col items-center justify-center min-h-[140px]"
            onClick={() => handleNavigate(link)}
          >
            <div className="flex items-center justify-center mb-2 w-full">
              <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-base text-gray-500 font-medium mb-1 text-center">{title}</p>
            <p className="text-3xl font-bold text-gray-800 text-center">
              {cardCounts?.[countKey]?.toLocaleString?.() || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

DashCard.propTypes = {
  cardCounts: PropTypes.object,
};

export default DashCard;

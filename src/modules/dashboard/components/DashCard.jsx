import { Users, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <>
      {cardCounts && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cardData.map(({ title, countKey, icon: Icon, bgColor, textColor, link }) => (
            <div
              key={title}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => handleNavigate(link)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-full ${bgColor} ${textColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-2xl font-bold text-gray-800">
                {cardCounts[countKey]?.toLocaleString?.() || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DashCard;

import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardApi } from "./api";
import DashCard from "./components/DashCard";
import OverviewChart from "./components/DashChart";
import { setLoader, setMode, setPageTitle } from "../../slices/sharedSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [cardCounts, setCardCounts] = useState(null);
  const [quoteEnquiryGraph, setQuoteEnquiryGraph] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setMode());
    dispatch(setPageTitle("Dashboard"));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await DashboardApi.fetchDashboardData({});
      const data = response.data;

      setCardCounts(data.cardCounts || null);
      setQuoteEnquiryGraph(data.chartData?.quoteEnquiryGraph || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
      dispatch(setLoader());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-base">
            Welcome to your admin dashboard. Here you can monitor key metrics and
            recent activity.
          </p>
        </div>
        {/* Modern Card Layout */}
        <div className="flex flex-wrap gap-6 mb-8 justify-start">
          <DashCard cardCounts={cardCounts} />
        </div>
        {/* Modern Chart Container */}
        <div className="w-full rounded-2xl bg-white shadow-lg p-6 border border-emerald-100">
          <OverviewChart
            chartData={quoteEnquiryGraph}
            chartType="quoteEnquiry"
            title="Quote Enquiries"
            loading={loading}
            modern
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

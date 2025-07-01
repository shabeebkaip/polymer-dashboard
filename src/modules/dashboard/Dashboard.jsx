import React, { useEffect, useState } from "react";
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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <DashCard cardCounts={cardCounts} />
      </div>

      <div className="w-full">
        <OverviewChart
          chartData={quoteEnquiryGraph}
          chartType="quoteEnquiry"
          title="Quote Enquiries"
          loading={loading}
        />
      </div>
    </>
  );
};

export default Dashboard;

import  { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const OverviewChart = ({ chartData = [], title = "Quote Enquiries", loading }) => {
  const [filteredChartData, setFilteredChartData] = useState([]);

  const monthLabels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const last6Months = getLastSixMonths(chartData);
    setFilteredChartData(last6Months);
  }, [chartData]);

  const getLastSixMonths = (data) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const monthsRange = Array.from({ length: 6 }, (_, i) =>
      ((currentMonth - 6 + i + 12) % 12) + 1
    );
    return data.filter((item) => monthsRange.includes(item.month));
  };

  const data = {
    labels: filteredChartData.map(item => monthLabels[item.month - 1].slice(0, 3)),
    datasets: [
      {
        fill: true,
        data: filteredChartData.map(item => item.enquiries || 0),
        borderColor: "#10B981", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.15)", // emerald-500 with opacity
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
        tension: 0.45,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#10B981",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#10B981",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false, // Remove the colored square
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#059669", // emerald-600
          font: { weight: "bold", size: 14 },
        },
      },
      y: {
        grid: { color: "rgba(16, 185, 129, 0.07)", borderDash: [4, 4] },
        ticks: {
          maxTicksLimit: 5,
          color: "#94A3B8", // slate-400
          font: { size: 13 },
          callback: (value) => `${value}`,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round",
      },
      point: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div
      className="relative bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
      style={{ minHeight: "400px" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-700">{title}</h2>
      </div>
      <div className="w-full" style={{ height: "300px" }}>
        {!loading ? <Line options={options} data={data} /> : <p className="text-center text-gray-400">Loading chart...</p>}
      </div>
    </div>
  );
};

OverviewChart.propTypes = {
  chartData: PropTypes.array,
  title: PropTypes.string,
  loading: PropTypes.bool,
};

export default OverviewChart;

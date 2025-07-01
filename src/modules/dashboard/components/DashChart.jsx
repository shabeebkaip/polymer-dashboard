import React, { useEffect, useState } from "react";
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
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        ticks: {
          maxTicksLimit: 5,
          callback: (value) => `${value} enquiries`,
        },
      },
    },
  };

  return (
    <div
      className="relative bg-white rounded-lg p-5"
      style={{
        boxShadow:
          "rgb(0 0 0 / 0.05) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        border: "1px solid #e2e8f0",
        height: "400px",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      <div style={{ height: "300px", width: "100%" }}>
        {!loading ? <Line options={options} data={data} /> : <p>Loading chart...</p>}
      </div>
    </div>
  );
};

export default OverviewChart;

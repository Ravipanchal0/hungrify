import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  LineChart,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { assets } from "../assets/assets";

import { FcMoneyTransfer } from "react-icons/fc"; //Money
import { FcCancel } from "react-icons/fc"; //cancel
import { RiFileList3Fill } from "react-icons/ri"; //order
import { HiNewspaper } from "react-icons/hi2"; //new order
import { IoCheckmarkDoneCircle } from "react-icons/io5"; //delivered

const rawPieChartData = [
  { name: "Mon", delivered: 2400, cancelled: 400 },
  { name: "Tue", delivered: 1398, cancelled: 210 },
  { name: "Wed", delivered: 800, cancelled: 290 },
  { name: "Thu", delivered: 908, cancelled: 200 },
  { name: "Fri", delivered: 400, cancelled: 181 },
  { name: "Sat", delivered: 3800, cancelled: 500 },
  { name: "Sun", delivered: 1500, cancelled: 800 },
];

// Compute `orders` for each day
const pieChartData = rawPieChartData.map((item) => ({
  ...item,
  orders: item.delivered + item.cancelled,
}));

// Dummy data
const sampleData = {
  "This Week": {
    orders: 1250,
    delivered: 1100,
    cancelled: 150,
    revenue: 12500,
    newOrders: 300,
    chart: [
      { day: "Mon", value: 100 },
      { day: "Tue", value: 200 },
      { day: "Wed", value: 300 },
      { day: "Thu", value: 250 },
      { day: "Fri", value: 400 },
      { day: "Sat", value: 500 },
      { day: "Sun", value: 600 },
    ],
  },
  "Last Week": {
    orders: 1000,
    delivered: 900,
    cancelled: 100,
    revenue: 10000,
    newOrders: 200,
    chart: [
      { day: "Mon", value: 80 },
      { day: "Tue", value: 150 },
      { day: "Wed", value: 200 },
      { day: "Thu", value: 180 },
      { day: "Fri", value: 250 },
      { day: "Sat", value: 300 },
      { day: "Sun", value: 400 },
    ],
  },
  "This Month": {
    orders: 5000,
    delivered: 4500,
    cancelled: 500,
    revenue: 50000,
    newOrders: 1000,
    chart: [
      { day: "Week 1", value: 800 },
      { day: "Week 2", value: 1000 },
      { day: "Week 3", value: 1200 },
      { day: "Week 4", value: 1500 },
    ],
  },
  "Last Month": {
    orders: 4200,
    delivered: 3800,
    cancelled: 400,
    newOrders: 950,
    revenue: 42000,
    chart: [
      { day: "Week 1", value: 600 },
      { day: "Week 2", value: 900 },
      { day: "Week 3", value: 1100 },
      { day: "Week 4", value: 1300 },
    ],
  },
};

const Dashboard = () => {
  const [filter, setFilter] = useState("This Week");
  const [data, setData] = useState(sampleData["This Week"]);

  useEffect(() => {
    setData(sampleData[filter]);
  }, [filter]);

  return (
    <div className="w-full h-full p-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
        <div className="header">
          <h3 className="text-2xl font-medium text-gray-800">Dashboard</h3>
          <p className="text-gray-500 text-sm">
            Hi, Ravi Panchal. Welcome back to Hungrify Admin!
          </p>
        </div>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
        <MetricCard
          title="Orders"
          value={data.orders}
          color="bg-blue-100"
          icon={assets.order}
        />
        <MetricCard
          title="Delivered"
          value={data.delivered}
          color="bg-green-100"
          icon={assets.delivered}
        />
        <MetricCard
          title="Cancelled"
          value={data.cancelled}
          color="bg-red-100"
          icon={assets.cancelled_ordered}
        />
        <MetricCard
          title="New Orders"
          value={data.newOrders}
          color="bg-purple-100"
          icon={assets.new_order}
        />
        <MetricCard
          title="Revenue"
          value={`\u20B9${data.revenue.toLocaleString()}`}
          color="bg-yellow-100"
          icon={assets.revenue}
        />
      </div>

      {/* Chart Section */}

      <div className="w-full h-full lg:h-96 flex flex-col lg:flex-row gap-12">
        <div className="barchart w-full lg:w-1/2 h-full bg-white p-5 rounded-lg shadow-md">
          <h4 className="text-normal lg:text-lg font-medium text-gray-700 mb-2">
            Order Trend
            <i className="text-xs lg:text-sm font-normal text-gray-400">
              (This week)
            </i>
          </h4>
          <div className="piechart w-full h-full p-2 md:p-3 pb-2 md:pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={pieChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="orders"
                  fill="#4394E5"
                  activeBar={<Rectangle fill="#0066CC" stroke="#0066CC" />}
                />
                <Bar
                  dataKey="delivered"
                  fill="#63993D"
                  activeBar={<Rectangle fill="#87BB62" stroke="#87BB62" />}
                />
                <Bar
                  dataKey="cancelled"
                  fill="#F0561D"
                  activeBar={<Rectangle fill="#F4784A" stroke="#F4784A" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="linechart w-full lg:w-1/2 h-full bg-white p-5 rounded-lg shadow-md">
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Total Revenue
          </h4>
          <div className="linechart w-full h-full p-2 md:p-3 md:pb-5 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, color, icon }) => (
  <div
    className={`flex items-center gap-x-5 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${color}`}
  >
    <div className="icon">
      <img src={icon} alt="" width={72} />
    </div>
    <div className="data">
      <p className="text-lg text-gray-700 font-medium">{title}</p>
      <h4 className="text-xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

export default Dashboard;

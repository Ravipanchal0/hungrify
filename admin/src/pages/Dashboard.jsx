import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
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
import { MetricCard } from "../components";

const Dashboard = () => {
  const { fetchAllOrdersList } = useContext(StoreContext);
  const [filter, setFilter] = useState("This Week");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      const allOrders = await fetchAllOrdersList();
      setOrders(allOrders);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter orders by status if needed (for metrics)
  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");
  const newOrders = orders.filter((o) => {
    const today = new Date();
    const created = new Date(o.createdAt);
    // e.g., new this week logic
    return created >= getStartOfPeriod(filter);
  });

  const revenue = deliveredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;

  // Build chart data grouped by day/week
  const chartData = buildChartData(orders, filter);

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
          value={totalOrders}
          color="bg-blue-100"
          icon={assets.order}
        />
        <MetricCard
          title="Delivered"
          value={deliveredOrders.length}
          color="bg-green-100"
          icon={assets.delivered}
        />
        <MetricCard
          title="Cancelled"
          value={cancelledOrders.length}
          color="bg-red-100"
          icon={assets.cancelled_ordered}
        />
        <MetricCard
          title="New Orders"
          value={newOrders.length}
          color="bg-purple-100"
          icon={assets.new_order}
        />
        <MetricCard
          title="Revenue"
          value={`\u20B9${revenue.toLocaleString()}`}
          color="bg-yellow-100"
          icon={assets.revenue}
        />
      </div>

      {/* Chart Section */}

      <div className="graphs w-full h-full lg:h-96 flex flex-col lg:flex-row gap-12">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="w-full h-full bg-white p-5 rounded-lg shadow">
            <h4 className="mb-2 font-medium">Orders Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.bar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#4394E5" />
                <Bar dataKey="delivered" fill="#63993D" />
                <Bar dataKey="cancelled" fill="#F0561D" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full h-full bg-white p-5 rounded-lg shadow">
            <h4 className="mb-2 font-medium">Revenue Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.line}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStartOfPeriod = (filter) => {
  const now = new Date();
  switch (filter) {
    case "This Week":
      const dayOfWeek = now.getDay();
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - dayOfWeek
      );
    case "Last Week":
      const lastWeekStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() - 7
      );
      return lastWeekStart;
    case "This Month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "Last Month":
      return new Date(now.getFullYear(), now.getMonth() - 1, 1);
    default:
      return new Date(0);
  }
};

const buildChartData = (orders, filter) => {
  const start = getStartOfPeriod(filter);
  const grouped = {};
  orders.forEach((o) => {
    const c = new Date(o.createdAt);
    if (c < start) return;
    let label;
    if (filter.includes("Week")) {
      label = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][c.getDay()];
    } else {
      label = `Week ${Math.floor((c.getDate() - 1) / 7) + 1}`;
    }
    if (!grouped[label])
      grouped[label] = { orders: 0, delivered: 0, cancelled: 0, revenue: 0 };
    grouped[label].orders++;
    grouped[label].revenue += o.totalAmount || 0;
    if (o.status === "delivered") grouped[label].delivered++;
    if (o.status === "cancelled") grouped[label].cancelled++;
  });
  const bar = Object.entries(grouped).map(([label, vals]) => ({
    label,
    ...vals,
  }));
  const line = bar.map(({ label, revenue }) => ({ label, revenue }));
  return { bar, line };
};

export default Dashboard;

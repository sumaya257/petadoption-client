import React from "react";
import { FaPaw, FaDonate, FaHeart } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DashboardOverview = () => {
  const barChartData = [
    { name: "Pets", value: 18 },
    { name: "Donations", value: 80 },
    { name: "Adoptions", value: 2 },
  ];

  const pieChartData = [
    { name: "Dogs", value: 5 },
    { name: "Cats", value: 4 },
    { name: "Rabbits", value: 2 },
    { name: "Fishes", value: 3 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500 text-white p-4 rounded-lg flex items-center">
          <FaPaw className="text-4xl mr-4" />
          <div>
            <p className="text-lg">Total Pets</p>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg flex items-center">
          <FaDonate className="text-4xl mr-4" />
          <div>
            <p className="text-lg">Total Donations</p>
            <p className="text-2xl font-bold">80</p>
          </div>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg flex items-center">
          <FaHeart className="text-4xl mr-4" />
          <div>
            <p className="text-lg">Total Adoptions</p>
            <p className="text-2xl font-bold">30</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Overall Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Pet Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" outerRadius={100}>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

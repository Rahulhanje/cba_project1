// src/components/AdminDashboard.jsx
import React, { useState } from "react";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // Dummy data – replace with API calls
  const stats = {
    products: 120,
    orders: 350,
    users: 80,
    revenue: 15000,
  };

  const [orderStatusData, setOrderStatusData] = useState([
    { name: "Pending", value: 10 },
    { name: "Shipped", value: 15 },
    { name: "Delivered", value: 20 },
  ]);

  // pending, shipped, delivered, cancelled
  // const COLORS = ["#3b82f6", "#22c55e", "#ef4444"];
  const COLORS = ["red", "blue", "orange"];

  const [revenue, setRevenue] = useState(1000);
  const [totalOrders, setTotalOrders] = useState(350);
  const [totalProducts, setTotalProducts] = useState(120);
  const [totalUsers, setTotalUsers] = useState(80);

  const getAllUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setTotalUsers(res.data.length);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await API.get("/products");
      setTotalProducts(res.data.length);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await API.get("/");
      setTotalOrders(res.data.length);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const getOrderStatus = async () => {
    try {
    } catch (err) {
      console.error("Error fetching order status:", err);
    }
  };

  const getRevenue = async () => {
    try {
      const res = await API.get("/orders/revenue");
      setRevenue(res.data);
    } catch (err) {
      console.error("Error fetching revenue:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 m-3 text-left">Welcome Admin!</h1>

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-6">
        {/* Products */}
        <Link to="/admin/products">
          <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
            <Package className="text-blue-500" size={32} />
            <div>
              <p className="text-gray-500">Products</p>
              <h2 className="text-2xl font-bold">{totalProducts}</h2>
            </div>
          </div>
        </Link>

        {/* Orders */}
        <Link to="/admin/orders">
          {" "}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
            <ShoppingBag className="text-green-500" size={32} />
            <div>
              <p className="text-gray-500">Orders</p>
              <h2 className="text-2xl font-bold">{totalOrders}</h2>
            </div>
          </div>
        </Link>

        {/* Users */}
        <Link to="/admin/users">
          <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
            <Users className="text-purple-500" size={32} />
            <div>
              <p className="text-gray-500">Users</p>
              <h2 className="text-2xl font-bold">{totalUsers}</h2>
            </div>
          </div>
        </Link>

        {/* Revenue */}
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
          <DollarSign className="text-yellow-500" size={32} />
          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">${revenue}</h2>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="gap-6">
        {/* Order Status Distribution */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Order Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

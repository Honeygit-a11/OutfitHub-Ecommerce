import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import "../../../components/Admin/Dashboard/Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get("http://localhost:7000/api/dashboard");
        setStats(data);
        setSalesData(data.salesChart);
        setRecentOrders(data.recentOrders);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        {/* Stats */}
        <section className="dashboard-cards">
          <div className="dashboard-card">
            <p className="card-title">Total Sales</p>
            <h2 className="card-value">${stats.totalSales}</h2>
          </div>
          <div className="dashboard-card">
            <p className="card-title">Orders</p>
            <h2 className="card-value">{stats.totalOrders}</h2>
          </div>
          <div className="dashboard-card">
            <p className="card-title">Customers</p>
            <h2 className="card-value">{stats.totalCustomers}</h2>
          </div>
          <div className="dashboard-card">
            <p className="card-title">Revenue Growth</p>
            <h2 className="card-value">{stats.revenueGrowth}%</h2>
          </div>
        </section>

        {/* Chart */}
        <section className="dashboard-charts">
          <div className="chart-box">
            <h3 className="chart-title">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4e73df" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="dashboard-orders">
          <h3 className="orders-title">Recent Orders</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>PaymentMethod</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userName}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td><span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>{order.paymentMethod || "Not Selected"}</td>
                  <td>${order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

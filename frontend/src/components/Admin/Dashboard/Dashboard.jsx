import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../../components/Admin/Dashboard/Dashboard.css";

const salesData = [
  
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">

        {/* Stats Cards */}
        <section className="dashboard-cards">
          <div className="dashboard-card">
            <p className="card-title">Total Sales</p>
            <h2 className="card-value"></h2>
            <span className="card-change positive"></span>
          </div>
          <div className="dashboard-card">
            <p className="card-title">Orders</p>
            <h2 className="card-value"></h2>
            <span className="card-change positive"></span>
          </div>
          <div className="dashboard-card">
            <p className="card-title">Customers</p>
            <h2 className="card-value"></h2>
            <span className="card-change positive"></span>
          </div>
          <div className="dashboard-card">
            <p className="card-title">Revenue Growth</p>
            <h2 className="card-value"></h2>
            <span className="card-change positive"></span>
          </div>
        </section>

        <section className="dashboard-charts">
          <div className="chart-box">
            <h3 className="chart-title">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4e73df"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* <div className="chart-box">
            <h3 className="chart-title">Top Selling Products</h3>
            <ul className="product-list">
              <li>Product A - 500</li>
              <li>Product B - 900</li>
              <li>Product C - 700</li>
              <li>Product D - 300</li>
              <li>Product E - 200</li>
            </ul>
          </div> */}
        </section>

        <section className="dashboard-orders">
          <h3 className="orders-title">Recent Orders</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>Emily Carter</td>
                <td>2023-08-15</td>
                <td><span className="order-status shipped">Shipped</span></td>
                <td>$150.00</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>David Lee</td>
                <td>2023-08-14</td>
                <td><span className="order-status processing">Processing</span></td>
                <td>$200.00</td>
              </tr>
              <tr>
                <td>#12347</td>
                <td>Sophia Clark</td>
                <td>2023-08-13</td>
                <td><span className="order-status delivered">Delivered</span></td>
                <td>$100.00</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
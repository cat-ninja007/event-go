import { useState, useEffect } from "react";
import axios from "axios";
import Logout from "../../components/Logout";
import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalEvents: 0, totalTickets: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <Logout />
        </header>
        <section className="dashboard-content">
          <div className="stats">
            <div className="card">Total Events: {stats.totalEvents}</div>
            <div className="card">Total Tickets Sold: {stats.totalTickets}</div>
            <div className="card">Revenue: ${stats.totalRevenue}</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

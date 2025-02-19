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
        const response = await axios.get("http://localhost:8080/api/v1/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter events to include only those created by the logged-in organizer
        const organizerEvents = response.data.data;
        const totalEvents = organizerEvents.length;

        // Calculate total tickets and revenue
        let totalTickets = 0;
        let totalRevenue = 0;

        for (const event of organizerEvents) {
          try {
            const ticketResponse = await axios.get(
              `http://localhost:8080/api/v1/tickets?eventId=${event.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            const tickets = ticketResponse.data.data;
            totalTickets += tickets.reduce((sum, ticket) => sum + (ticket.availableSeat || 0), 0);
            totalRevenue += tickets.reduce((sum, ticket) => sum + (ticket.price * (ticket.availableSeat || 0)), 0);
          } catch (error) {
            console.error(`Failed to fetch tickets for event ${event.id}`, error);
          }
        }

        setStats({ totalEvents, totalTickets, totalRevenue });
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
            <div className="card">Revenue: ${stats.totalRevenue.toFixed(2)}</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

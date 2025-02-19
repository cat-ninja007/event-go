import { NavLink, useLocation } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get current path

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                isActive && location.pathname === "/admin" ? "active" : ""}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/events" 
              className={({ isActive }) => 
                isActive && location.pathname.startsWith("/admin/events") ? "active" : ""}
            >
              Manage Events
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/reports" 
              className={({ isActive }) => 
                isActive && location.pathname.startsWith("/admin/reports") ? "active" : ""}
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

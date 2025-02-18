import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/events" className={({ isActive }) => isActive ? "active" : ""}>
              Manage Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "active" : ""}>
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

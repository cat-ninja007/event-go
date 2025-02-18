import Navbar from "../../components/admin/Navbar"
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import "./styles/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main-content">
        <Navbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

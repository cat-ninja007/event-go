import Logout from "../Logout";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      <Logout />
    </header>
  );
};

export default Navbar;

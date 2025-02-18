import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('Logout Yes Button Clieck')
    } catch (error) {
      console.error("Logout failed", error);
    }
    
    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ backgroundColor: "red", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
        Logout
      </button>
      
      {isOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout} style={{ marginRight: "10px", backgroundColor: "red", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
              Yes, Logout
            </button>
            <button onClick={() => setIsOpen(false)} style={{ backgroundColor: "gray", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;

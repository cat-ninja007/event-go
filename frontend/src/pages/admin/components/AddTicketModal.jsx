import { useState } from "react";
import axios from "axios";
import "../styles/AddTicketModal.css";

const AddTicketModal = ({ isOpen, onClose, eventId, onTicketAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    availableSeat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      // Ensure eventId is passed correctly
      const ticketData = {
        eventId,
        name: formData.name,
        price: parseFloat(formData.price), // Convert to float
        availableSeat: parseInt(formData.availableSeat), // Convert to integer
        isReleased: formData.isReleased ?? false, // Ensure a boolean value
        isClosed: formData.isClosed ?? false, // Ensure a boolean value
      };
  
      const response = await axios.post("http://localhost:8080/api/v1/tickets", ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      onTicketAdded(response.data.data);
      onClose();
    } catch (error) {
      console.error("Failed to create ticket", error.response ? error.response.data : error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Ticket</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ticket Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="availableSeat"
            placeholder="Available Seats"
            value={formData.availableSeat}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="create-btn">Create Ticket</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicketModal;

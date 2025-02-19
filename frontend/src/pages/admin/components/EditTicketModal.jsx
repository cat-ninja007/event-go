import React, { useState, useEffect } from "react";
import "../styles/EditTicketModal.css";

const EditTicketModal = ({ isOpen, onClose, onTicketUpdated, ticketData }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    availableSeat: "",
    isReleased: false,
    isClosed: false,
  });

  useEffect(() => {
    if (ticketData) {
      setFormData({
        name: ticketData.name || "",
        price: ticketData.price || 0,
        availableSeat: ticketData.availableSeat || 0,
        isReleased: ticketData.isReleased || false,
        isClosed: ticketData.isClosed || false,
      });
    }
  }, [ticketData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTicket = {
      ...ticketData,
      name: formData.name,
      price: Number(formData.price), // Ensure it's a number
      availableSeat: Number(formData.availableSeat), // Ensure it's a number
      isReleased: Boolean(formData.isReleased), // Ensure it's a boolean
      isClosed: Boolean(formData.isClosed), // Ensure it's a boolean
    };

    console.log("Submitting ticket update:", updatedTicket);
    onTicketUpdated(updatedTicket);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Ticket</h2>
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
            <button type="submit" className="update-btn">
              Update Ticket
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicketModal;

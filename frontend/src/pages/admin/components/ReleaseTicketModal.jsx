import React from "react";
import axios from "axios";
import "../styles/ReleaseTicketModal.css"

const ReleaseTicketModal = ({ isOpen, onClose, ticketId, onTicketReleased }) => {
  if (!isOpen) return null;

  const handleRelease = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/v1/tickets/${ticketId}/release`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onTicketReleased(ticketId);
      onClose();
    } catch (error) {
      console.error("Failed to release ticket", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Release Ticket</h2>
        <p>Are you sure you want to release this ticket?</p>
        <div className="modal-actions">
          <button onClick={handleRelease} className="release-btn">Release</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseTicketModal;

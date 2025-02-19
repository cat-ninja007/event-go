import React from "react";
import "../styles/CloseTicketModal.css";

const CloseTicketModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Close Ticket</h2>
        <p>Are you sure you want to close this ticket?</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Close</button>
          <button className="cancel-btn" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default CloseTicketModal;

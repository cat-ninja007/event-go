import React from "react";
import "../styles/DeleteTicketModal.css"

const DeleteTicketModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Delete Ticket</h2>
        <p>Are you sure you want to delete this ticket?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-delete-btn">Yes</button>
          <button onClick={onClose} className="cancel-delete-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTicketModal;

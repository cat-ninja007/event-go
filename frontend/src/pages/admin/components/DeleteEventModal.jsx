import React from "react";
import "../styles/DeleteEventModal.css";

const DeleteEventModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Delete Event</h2>
        <p>Are you sure you want to delete this event? This action will remove all associated tickets.</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Delete</button>
          <button className="cancel-btn" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;

import { useState } from "react";
import axios from "axios";
import "../styles/AddEventModal.css";

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Format the startDate and endDate before sending the request
    const formattedStartDate = new Date(formData.startDate).toISOString();
    const formattedEndDate = new Date(formData.endDate).toISOString();
  
    const eventData = {
      ...formData,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post("http://localhost:8080/api/v1/events", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      onEventAdded(response.data.data);
      onClose();
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status Code:", error.response.status);
      } else {
        console.error("Failed to create event", error);
      }
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required />
          <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />
          <div className="modal-actions">
            <button type="submit" className="create-btn">Create Event</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;

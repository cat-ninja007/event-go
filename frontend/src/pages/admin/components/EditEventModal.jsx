import { useState, useEffect } from "react";
import "../styles/EditEventModal.css";

const EditEventModal = ({ isOpen, onClose, onEventUpdated, eventData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (eventData) {
      setFormData({
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        image: eventData.image,
        startDate: new Date(eventData.startDate).toISOString().slice(0, 16),
        endDate: new Date(eventData.endDate).toISOString().slice(0, 16),
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...eventData,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      image: formData.image,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };
    onEventUpdated(updatedEvent);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required />
          <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />
          <div className="modal-actions">
            <button type="submit" className="update-btn">Update Event</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;

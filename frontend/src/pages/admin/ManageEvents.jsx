import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddEventModal from "./components/AddEventModal";
import EditEventModal from "./components/EditEventModal";
import "./styles/ManageEvents.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/v1/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventsData = response.data.data;

      // Fetch tickets for each event
      const eventsWithTickets = await Promise.all(
        eventsData.map(async (event) => {
          try {
            const ticketResponse = await axios.get(
              `http://localhost:8080/api/v1/tickets?eventId=${event.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return { ...event, tickets: ticketResponse.data.data };
          } catch (ticketError) {
            console.error("Failed to fetch tickets for event", event.id, ticketError);
            return { ...event, tickets: [] };
          }
        })
      );

      setEvents(eventsWithTickets);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteEventId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/events/${deleteEventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event.id !== deleteEventId));
      setDeleteEventId(null);
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/v1/events/${updatedEvent.id}`,
        updatedEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents(events.map(event => event.id === updatedEvent.id ? response.data.data : event));
      setEditEvent(null);
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  return (
    <div className="manage-events-container">
      <div className="header">
        <h2>Manage Events</h2>
        <button onClick={() => setIsModalOpen(true)} className="add-event-btn">+ Add Event</button>
      </div>
      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onEventAdded={fetchEvents} />
      {editEvent && (
        <EditEventModal
          isOpen={!!editEvent}
          onClose={() => setEditEvent(null)}
          onEventUpdated={handleUpdate}
          eventData={editEvent}
        />
      )}
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-container">
              <div className="event-info">
                <div>
                  <img src={event.image} alt={event.title} className="event-image" width="150px" height={"100%"} />
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
              </div>
              <div className="ticket-list">
                <h4>Tickets</h4>
                {event.tickets && event.tickets.length > 0 ? (
                  event.tickets.map(ticket => (
                    <div key={ticket.id} className="ticket-card">
                      <p><strong>Name:</strong> {ticket.name}</p>
                      <p><strong>Price:</strong> ${ticket.price}</p>
                      <p><strong>Available Seats:</strong> {ticket.availableSeat}</p>
                    </div>
                  ))
                ) : (
                  <p>No tickets available</p>
                )}
              </div>
              <div className="event-actions">
                <button onClick={() => setEditEvent(event)} className="edit-btn">Edit Event</button>
                <button onClick={() => setDeleteEventId(event.id)} className="delete-btn">Delete Event</button>
                <Link to={`/admin/events/${event.id}/add-ticket`} className="add-ticket-btn">Add Ticket</Link>
                <Link to={`/event/${event.id}`} className="view-event-btn">View Event</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
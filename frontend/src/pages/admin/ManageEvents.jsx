import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, Heading, Text, Image, Button, Flex } from "@chakra-ui/react";

// Events
import AddEventModal from "./components/AddEventModal";
import EditEventModal from "./components/EditEventModal";
import DeleteEventModal from "./components/DeleteEventModal";

// Tickets
import AddTicketModal from "./components/AddTicketModal";
import DeleteTicketModal from "./components/DeleteTicketModal";
import EditTicketModal from "./components/EditTicketModal";
import ReleaseTicketModal from "./components/ReleaseTicketModal";
import CloseTicketModal from "./components/CloseTicketModal";

import "./styles/ManageEvents.css";
import { Link } from "react-router-dom";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteEventId, setDeleteEventId] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [addTicketEventId, setAddTicketEventId] = useState(null);
  const [deleteTicketId, setDeleteTicketId] = useState(null);
  const [editTicket, setEditTicket] = useState(null);
  const [releaseTicketId, setReleaseTicketId] = useState(null);
  const [closeTicketId, setCloseTicketId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  // GET EVENT & TICKET
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
            console.error(
              "Failed to fetch tickets for event",
              event.id,
              ticketError
            );
            return { ...event, tickets: [] };
          }
        })
      );

      setEvents(eventsWithTickets);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  // DELETE EVENT
  const handleDeleteEvent = async () => {
    if (!deleteEventId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/api/v1/events/${deleteEventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(events.filter((event) => event.id !== deleteEventId));
      setDeleteEventId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  // DELETE TICKET
  const handleDeleteTicket = async () => {
    if (!deleteTicketId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/api/v1/tickets/${deleteTicketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(
        events.map((event) => ({
          ...event,
          tickets: event.tickets.filter(
            (ticket) => ticket.id !== deleteTicketId
          ),
        }))
      );
      setDeleteTicketId(null);
    } catch (error) {
      console.error("Failed to delete ticket", error);
    }
  };

  // UPDATE EVENT
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
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? response.data.data : event
        )
      );
      setEditEvent(null);
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  // UPDATE TICKET
  const handleUpdateTicket = async (updatedTicket) => {
    try {
      const token = localStorage.getItem("token");

      // Log the payload before sending
      console.log("Updating ticket with data:", updatedTicket);

      const response = await axios.put(
        `http://localhost:8080/api/v1/tickets/${updatedTicket.id}`,
        updatedTicket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update successful:", response.data);
      setEvents(
        events.map((event) => ({
          ...event,
          tickets: event.tickets.map((ticket) =>
            ticket.id === updatedTicket.id ? response.data.data : ticket
          ),
        }))
      );
      setEditTicket(null);
    } catch (error) {
      console.error(
        "Failed to update ticket",
        error.response ? error.response.data : error
      );
    }
  };

  // RELEASE TICKET
  const handleTicketReleased = (ticketId) => {
    setEvents(
      events.map((event) => ({
        ...event,
        tickets: event.tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, isReleased: true } : ticket
        ),
      }))
    );
  };

  // CLOSE TICKET
  const handleCloseTicket = async () => {
    if (!closeTicketId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/v1/tickets/${closeTicketId}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(
        events.map((event) => ({
          ...event,
          tickets: event.tickets.map((ticket) =>
            ticket.id === closeTicketId ? { ...ticket, isClosed: true } : ticket
          ),
        }))
      );
      setCloseTicketId(null);
    } catch (error) {
      console.error("Failed to close ticket", error);
    }
  };

  // VIEW EVENT DETAIL PAGE
  const handleViewEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(`http://localhost:8080/api/v1/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // navigate(`../../events/${eventId}`);  // Ensure absolute path
      navigate(`../../events/${eventId}`, { replace: true });
    } catch (error) {
      console.error("Failed to fetch event details", error);
    }
  };

  return (
    <div className="manage-events-container">
      <div className="header">
        <h2>Manage Events</h2>
        <button onClick={() => setIsModalOpen(true)} className="add-event-btn">
          + Add Event
        </button>
      </div>

      {/* ADD EVENT MODAL */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventAdded={fetchEvents}
      />

      {/* EDIT EVENT MODAL */}
      {editEvent && (
        <EditEventModal
          isOpen={!!editEvent}
          onClose={() => setEditEvent(null)}
          onEventUpdated={handleUpdate}
          eventData={editEvent}
        />
      )}

      {/* DELETE EVENT MODAL */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
      />

      {/* ADD TICKET MODAL */}
      {addTicketEventId && (
        <AddTicketModal
          isOpen={!!addTicketEventId}
          onClose={() => setAddTicketEventId(null)}
          eventId={addTicketEventId} // Pass eventId to modal
          onTicketAdded={fetchEvents}
        />
      )}

      {/* DELETE TICKET MODAL */}
      {deleteTicketId && (
        <DeleteTicketModal
          isOpen={!!deleteTicketId}
          onClose={() => setDeleteTicketId(null)}
          onConfirm={handleDeleteTicket}
        />
      )}

      {/* UPDATE TICKET MODAL */}
      {editTicket && (
        <EditTicketModal
          isOpen={!!editTicket}
          onClose={() => setEditTicket(null)}
          onTicketUpdated={handleUpdateTicket}
          ticketData={editTicket}
        />
      )}

      {/* RELEASE TICKET MODAL */}
      {releaseTicketId && (
        <ReleaseTicketModal
          isOpen={!!releaseTicketId}
          onClose={() => setReleaseTicketId(null)}
          ticketId={releaseTicketId}
          onTicketReleased={handleTicketReleased}
        />
      )}

      {/* CLOSE TICKET MODAL */}
      <CloseTicketModal
        isOpen={!!closeTicketId}
        onClose={() => setCloseTicketId(null)}
        onConfirm={handleCloseTicket}
      />

      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-container">
              <Box
                position="relative"
                width="30%"
                height="100%"
                overflow="hidden"
              >
                <Image
                  src={event.image}
                  width="100%"
                  height="240px"
                  objectFit="cover"
                  rounded="2xl"
                  alt={event.title}
                />
              </Box>
              <div className="event-info">
                <Heading fontSize="24px" fontWeight="bold" mb="20px">
                  {event.title}
                </Heading>
                <p>{event.description}</p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="ticket-list">
                <h4>Tickets</h4>
                {event.tickets && event.tickets.length > 0 ? (
                  event.tickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                      <p>
                        <strong>Name:</strong> {ticket.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${ticket.price}
                      </p>
                      <p>
                        <strong>Available Seats:</strong> {ticket.availableSeat}
                      </p>
                      <div className="ticket-actions">
                        <button
                          onClick={() => setEditTicket(ticket)}
                          className="edit-ticket-btn"
                          disabled={ticket.isReleased}
                        >
                          Edit Ticket
                        </button>
                        <button
                          onClick={() => setReleaseTicketId(ticket.id)}
                          className="release-ticket-btn"
                          disabled={ticket.isReleased}
                        >
                          Release Ticket
                        </button>
                        <button
                          className="close-ticket-btn"
                          onClick={() => setCloseTicketId(ticket.id)}
                          disabled={ticket.isClosed}
                        >
                          {ticket.isClosed ? "Closed" : "Close Ticket"}
                        </button>
                        <button
                          onClick={() => setDeleteTicketId(ticket.id)}
                          className="delete-ticket-btn"
                          disabled={ticket.isReleased}
                        >
                          Delete Ticket
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tickets available</p>
                )}
              </div>
              <div className="event-actions">
                <button
                  onClick={() => setEditEvent(event)}
                  className="edit-btn"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => {
                    setDeleteEventId(event.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="delete-btn"
                >
                  Delete Event
                </button>
                <button
                  onClick={() => handleViewEvent(event.id)}
                  className="view-event-btn"
                >
                  View Event
                </button>
                <button
                  onClick={() => setAddTicketEventId(event.id)}
                  className="add-ticket-btn"
                >
                  Add Ticket
                </button>
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

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AddEventModal from "./components/AddEventModal";
// import EditEventModal from "./components/EditEventModal";
// import "./styles/ManageEvents.css";
// import { Link } from "react-router-dom";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteEventId, setDeleteEventId] = useState(null);
//   const [editEvent, setEditEvent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:8080/api/v1/events", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const eventsData = response.data.data;

//       // Fetch tickets for each event
//       const eventsWithTickets = await Promise.all(
//         eventsData.map(async (event) => {
//           try {
//             const ticketResponse = await axios.get(
//               `http://localhost:8080/api/v1/tickets?eventId=${event.id}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             return { ...event, tickets: ticketResponse.data.data };
//           } catch (ticketError) {
//             console.error("Failed to fetch tickets for event", event.id, ticketError);
//             return { ...event, tickets: [] };
//           }
//         })
//       );

//       setEvents(eventsWithTickets);
//     } catch (error) {
//       console.error("Failed to fetch events", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteEventId) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:8080/api/v1/events/${deleteEventId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEvents(events.filter(event => event.id !== deleteEventId));
//       setDeleteEventId(null);
//     } catch (error) {
//       console.error("Failed to delete event", error);
//     }
//   };

//   const handleUpdate = async (updatedEvent) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `http://localhost:8080/api/v1/events/${updatedEvent.id}`,
//         updatedEvent,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setEvents(events.map(event => event.id === updatedEvent.id ? response.data.data : event));
//       setEditEvent(null);
//     } catch (error) {
//       console.error("Failed to update event", error);
//     }
//   };

//   const handleViewEvent = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.get(`http://localhost:8080/api/v1/event/${eventId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate(`/event/${eventId}`);
//     } catch (error) {
//       console.error("Failed to fetch event details", error);
//     }
//   };

//   return (
//     <div className="manage-events-container">
//       <div className="header">
//         <h2>Manage Events</h2>
//         <button onClick={() => setIsModalOpen(true)} className="add-event-btn">+ Add Event</button>
//       </div>
//       <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onEventAdded={fetchEvents} />
//       {editEvent && (
//         <EditEventModal
//           isOpen={!!editEvent}
//           onClose={() => setEditEvent(null)}
//           onEventUpdated={handleUpdate}
//           eventData={editEvent}
//         />
//       )}
//       <div className="event-list">
//         {events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} className="event-container">
//               <div className="event-info">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <p><strong>Location:</strong> {event.location}</p>
//                 <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
//                 <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
//               </div>
//               <div className="ticket-list">
//                 <h4>Tickets</h4>
//                 {event.tickets && event.tickets.length > 0 ? (
//                   event.tickets.map(ticket => (
//                     <div key={ticket.id} className="ticket-card">
//                       <p><strong>Name:</strong> {ticket.name}</p>
//                       <p><strong>Price:</strong> ${ticket.price}</p>
//                       <p><strong>Available Seats:</strong> {ticket.availableSeat}</p>
//                       <div className="ticket-actions">
//                          <Link to={`/admin/tickets/edit/${ticket.id}`} className="edit-ticket-btn">Edit Ticket</Link>
//                          <button className="release-ticket-btn">Release Ticket</button>
//                          <button className="close-ticket-btn">Close Ticket</button>
//                          <button className="delete-ticket-btn">Delete Ticket</button>
//                        </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No tickets available</p>
//                 )}
//               </div>
//               <div className="event-actions">
//                 <button onClick={() => setEditEvent(event)} className="edit-btn">Edit Event</button>
//                 <button onClick={() => setDeleteEventId(event.id)} className="delete-btn">Delete Event</button>
//                 <button onClick={() => handleViewEvent(event.id)} className="view-event-btn">View Event</button>
//                 <button onClick={() => navigate(`/admin/events/${event.id}/add-ticket`)} className="add-ticket-btn">Add Ticket</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/v1/events", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const eventsData = response.data.data;

//         // Fetch tickets for each event
//         const eventsWithTickets = await Promise.all(
//           eventsData.map(async (event) => {
//             try {
//               const ticketResponse = await axios.get(
//                 `http://localhost:8080/api/v1/tickets?eventId=${event.id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );
//               return { ...event, tickets: ticketResponse.data.data };
//             } catch (ticketError) {
//               console.error("Failed to fetch tickets for event", event.id, ticketError);
//               return { ...event, tickets: [] };
//             }
//           })
//         );

//         setEvents(eventsWithTickets);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleDelete = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:8080/api/v1/events/${eventId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEvents(events.filter(event => event.id !== eventId));
//     } catch (error) {
//       console.error("Failed to delete event", error);
//     }
//   };

//   return (
//     <div className="manage-events-container">
//       <div className="header">
//         <h2>Manage Events</h2>
//         <Link to="/admin/events/create" className="add-event-btn">+ Add Event</Link>
//       </div>
//       <div className="event-list">
//         {events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} className="event-container">
//               <div className="event-info">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <p><strong>Location:</strong> {event.location}</p>
//                 <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
//                 <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
//               </div>
//               <div className="ticket-list">
//                 <h4>Tickets</h4>
//                 {event.tickets && event.tickets.length > 0 ? (
//                   event.tickets.map(ticket => (
//                     <div key={ticket.id} className="ticket-card">
//                       <p><strong>Name:</strong> {ticket.name}</p>
//                       <p><strong>Price:</strong> ${ticket.price}</p>
//                       <p><strong>Available Seats:</strong> {ticket.availableSeat}</p>
//                       <div className="ticket-actions">
//                         <Link to={`/admin/tickets/edit/${ticket.id}`} className="edit-ticket-btn">Edit Ticket</Link>
//                         <button className="release-ticket-btn">Release Ticket</button>
//                         <button className="close-ticket-btn">Close Ticket</button>
//                         <button className="delete-ticket-btn">Delete Ticket</button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No tickets available</p>
//                 )}
//               </div>
//               <div className="event-actions">
//                 <Link to={`/admin/events/edit/${event.id}`} className="edit-btn">Edit Event</Link>
//                 <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete Event</button>
//                 <Link to={`/admin/events/${event.id}/add-ticket`} className="add-ticket-btn">Add Ticket</Link>
//                 <Link to={`/event/${event.id}`} className="view-event-btn">View Event</Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./styles/ManageEvents.css";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/v1/events", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const eventsData = response.data.data;

//         // Fetch tickets for each event
//         const eventsWithTickets = await Promise.all(
//           eventsData.map(async (event) => {
//             try {
//               const ticketResponse = await axios.get(
//                 `http://localhost:8080/api/v1/tickets?eventId=${event.id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );
//               return { ...event, tickets: ticketResponse.data.data };
//             } catch (ticketError) {
//               console.error("Failed to fetch tickets for event", event.id, ticketError);
//               return { ...event, tickets: [] };
//             }
//           })
//         );

//         setEvents(eventsWithTickets);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleDelete = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:8080/api/v1/event/${eventId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEvents(events.filter(event => event.id !== eventId));
//     } catch (error) {
//       console.error("Failed to delete event", error);
//     }
//   };

//   return (
//     <div className="manage-events-container">
//       <div className="header">
//         <h2>Manage Events</h2>
//         <Link to="/admin/events/create" className="add-event-btn">+ Add Event</Link>
//       </div>
//       <div className="event-list">
//         {events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} className="event-container">
//               <div className="event-info">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <p><strong>Location:</strong> {event.location}</p>
//                 <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
//                 <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
//               </div>
//               <div className="ticket-list">
//                 <h4>Tickets</h4>
//                 {event.tickets && event.tickets.length > 0 ? (
//                   event.tickets.map(ticket => (
//                     <div key={ticket.id} className="ticket-card">
//                       <p><strong>Name:</strong> {ticket.name}</p>
//                       <p><strong>Price:</strong> ${ticket.price}</p>
//                       <p><strong>Available Seats:</strong> {ticket.availableSeat}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No tickets available</p>
//                 )}
//               </div>
//               <div className="event-actions">
//                 <Link to={`/admin/events/edit/${event.id}`} className="edit-btn">Edit Event</Link>
//                 <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete Event</button>
//                 <Link to={`/admin/events/${event.id}/add-ticket`} className="add-ticket-btn">Add Ticket</Link>
//                 <Link to={`/event/${event.id}`} className="view-event-btn">View Event</Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./styles/ManageEvents.css";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/v1/event", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEvents(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleDelete = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:8080/api/v1/event/${eventId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEvents(events.filter(event => event.id !== eventId));
//     } catch (error) {
//       console.error("Failed to delete event", error);
//     }
//   };

//   return (
//     <div className="manage-events-container">
//       <div className="header">
//         <h2>Manage Events</h2>
//         <Link to="/admin/events/create" className="add-event-btn">+ Add Event</Link>
//       </div>
//       <div className="event-list">
//         {events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} className="event-container">
//               <div className="event-info">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <p><strong>Location:</strong> {event.location}</p>
//                 <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
//                 <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
//               </div>
//               <div className="ticket-list">
//                 <h4>Tickets</h4>
//                 {event.tickets && event.tickets.length > 0 ? (
//                   event.tickets.map(ticket => (
//                     <div key={ticket.id} className="ticket-card">
//                       <p><strong>Name:</strong> {ticket.name}</p>
//                       <p><strong>Price:</strong> ${ticket.price}</p>
//                       <p><strong>Available Seats:</strong> {ticket.availableSeat}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No tickets available</p>
//                 )}
//               </div>
//               <div className="event-actions">
//                 <Link to={`/admin/events/edit/${event.id}`} className="edit-btn">Edit Event</Link>
//                 <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete Event</button>
//                 <Link to={`/admin/events/${event.id}/add-ticket`} className="add-ticket-btn">Add Ticket</Link>
//                 <Link to={`/event/${event.id}`} className="view-event-btn">View Event</Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./styles/ManageEvents.css";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/v1/events", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEvents(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <div className="manage-events-container">
//       <div className="header">
//         <h2>Manage Events</h2>
//         <Link to="/admin/events/create" className="add-event-btn">+ Add Event</Link>
//       </div>
//       <div className="event-list">
//         {events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} className="event-card">
//               <img src={event.image} alt={event.title} className="event-image" />
//               <div className="event-info">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <p><strong>Location:</strong> {event.location}</p>
//                 <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
//                 <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/ManageEvents.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/event", {
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
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  return (
    <div className="manage-events-container">
      <div className="header">
        <h2>Manage Events</h2>
        <Link to="/admin/events/create" className="add-event-btn">+ Add Event</Link>
      </div>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-container">
              <div className="event-info">
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
                      <div className="ticket-actions">
                        <Link to={`/admin/tickets/edit/${ticket.id}`} className="edit-ticket-btn">Edit Ticket</Link>
                        <button className="release-ticket-btn">Release Ticket</button>
                        <button className="close-ticket-btn">Close Ticket</button>
                        <button className="delete-ticket-btn">Delete Ticket</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tickets available</p>
                )}
              </div>
              <div className="event-actions">
                <Link to={`/admin/events/edit/${event.id}`} className="edit-btn">Edit Event</Link>
                <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete Event</button>
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

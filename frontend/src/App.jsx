import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import EventDetail from "./pages/EventDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AdminLayout from "./pages/admin/AdminLayout";

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "ORGANIZER" ? "/admin-dashboard" : "/"} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute allowedRoles={["ATTENDEE", "ORGANIZER"]}><Home /></PrivateRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events/:id" element={<EventDetail />} />
        {/* <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/events" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><ManageEvents /></PrivateRoute>} /> */}
        <Route path="/admin" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><AdminLayout /></PrivateRoute>}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="events" element={<ManageEvents />} />
          {/* <Route path="tickets" element={<ManageTickets />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import EventDetail from "./pages/EventDetails";
// import AdminDashboard from "./pages/AdminDashboard";
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/event/:id" element={<EventDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

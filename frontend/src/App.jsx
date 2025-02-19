import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import EventDetail from "./pages/EventDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminEventDetail from "./pages/admin/AdminEventDetails";
// import PrivateRoute from "./components/PrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes (No login required) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events/:id" element={<EventDetail />} />  {/* ✅ Public */}
        <Route path="/" element={<Home />} />  {/* ✅ Public */}

        {/* ✅ Attendee Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute allowedRoles={["ATTENDEE"]}>
              <Home />
            </PrivateRoute>
          } 
        />

        {/* ✅ Organizer Routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute allowedRoles={["ORGANIZER"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<ManageEvents />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import EventDetail from "./pages/EventDetails";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageEvents from "./pages/admin/ManageEvents";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminEventDetail from "./pages/admin/AdminEventDetails";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const role = localStorage.getItem("role");

//   if (!role) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to={role === "ORGANIZER" ? "/admin" : "/"} replace />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
        

//         {/* Attendee Routes */}
//         <Route path="/" element={<PrivateRoute allowedRoles={["ATTENDEE"]}><Home /></PrivateRoute>} />
//         {/* <Route path="/events/:id" element={<PrivateRoute allowedRoles={["ATTENDEE", "ORGANIZER"]}><EventDetail /></PrivateRoute>} /> */}

//         <Route path="/events/:id" element={<PrivateRoute allowedRoles={["ATTENDEE", "ORGANIZER"]}><EventDetail /></PrivateRoute>} />


//         {/* Organizer Routes */}
//         <Route path="/admin" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><AdminLayout /></PrivateRoute>}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="events" element={<ManageEvents />} />
//           {/* <Route path=":id" element={<AdminEventDetail />} /> */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import EventDetail from "./pages/EventDetails";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageEvents from "./pages/admin/ManageEvents";
// import AdminLayout from "./pages/admin/AdminLayout";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const role = localStorage.getItem("role");

//   if (!role) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to={role === "ORGANIZER" ? "/admin-dashboard" : "/"} replace />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<PrivateRoute allowedRoles={["ATTENDEE", "ORGANIZER"]}><Home /></PrivateRoute>} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/events/:id" element={<EventDetail />} />
//         {/* <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><AdminDashboard /></PrivateRoute>} />
//         <Route path="/admin/events" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><ManageEvents /></PrivateRoute>} /> */}
//         <Route path="/admin" element={<PrivateRoute allowedRoles={["ORGANIZER"]}><AdminLayout /></PrivateRoute>}>
//           <Route path="" element={<AdminDashboard />} />
//           <Route path="events" element={<ManageEvents />} />
//           <Route path="/events/:id" element={<EventDetail />} />
//           {/* <Route path="tickets" element={<ManageTickets />} /> */}
//           {/* <Route path="reports" element={<Reports />} /> */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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

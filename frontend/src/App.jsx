import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

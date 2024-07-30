import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

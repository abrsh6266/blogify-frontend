import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

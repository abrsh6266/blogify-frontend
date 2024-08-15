import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

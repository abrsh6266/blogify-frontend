import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import { useSelector } from "react-redux";
import PrivateNavbar from "./components/Navbar/PrivateNavbar copy";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Posts/PublicPosts";

export default function App() {
  const { userAuth } = useSelector((state) => state?.users);
  return (
    <BrowserRouter>
      {/* Navbar */}
      {userAuth?.userInfo?.token ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

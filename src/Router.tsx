import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import Login from "./pages/Login";
// admin pages
import AdminHome from "./pages/Admin/Home";
// user pages
import UserHome from "./pages/User/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* user links */}
        <Route path="/user" element={<UserHome />} />
        {/* admin links */}
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </BrowserRouter >
  )
}
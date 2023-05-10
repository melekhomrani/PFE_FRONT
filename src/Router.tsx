import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import Login from "./pages/Login";
// admin pages
import AdminHome from "./pages/Admin/Home";
import AdminProfile from "./pages/Admin/Profile";
import AdminIndex from "./pages/Admin/Index";
import AdminReclamations from "./pages/Admin/Reclamations";
import AdminUsers from "./pages/Admin/Users";
import AdminTypes from "./pages/Admin/Types";
import AdminRoles from "./pages/Admin/Roles";
import Calendar from "./pages/Admin/Calendar";
// user pages
import UserHome from "./pages/User/Home";
import UserProfile from "./pages/User/Profile";
import AdminAccessFlows from "./pages/Admin/AccessFlows";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* user links */}
        <Route path="/user" >
          <Route index path="" element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        {/* admin links */}
        <Route path="/admin" element={<AdminIndex />} >
          <Route index element={<AdminHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reclamations" element={<AdminReclamations />} />
          <Route path="reclamationTypes" element={<AdminTypes />} />
          <Route path="roles" element={<AdminRoles />} />
          <Route path="accessFlows" element={<AdminAccessFlows />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}
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
import AuthGuard from "./components/AuthGuard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/login" element={<Login />} />
        {/* user links */}
        <Route path="/user" >
          <Route index path="" element={<AuthGuard><UserHome /></AuthGuard>} />
          <Route path="profile" element={<AuthGuard><UserProfile /></AuthGuard>} />
        </Route>
        {/* admin links */}
        <Route path="/admin" element={<AuthGuard><AdminIndex /></AuthGuard>} >
          <Route index element={<AuthGuard><AdminHome /></AuthGuard>} />
          <Route path="profile" element={<AuthGuard><AdminProfile /></AuthGuard>} />
          <Route path="users" element={<AuthGuard><AdminUsers /></AuthGuard>} />
          <Route path="reclamations" element={<AuthGuard><AdminReclamations /></AuthGuard>} />
          <Route path="reclamationTypes" element={<AuthGuard><AdminTypes /></AuthGuard>} />
          <Route path="roles" element={<AuthGuard><AdminRoles /></AuthGuard>} />
          <Route path="accessFlows" element={<AuthGuard><AdminAccessFlows /></AuthGuard>} />
          <Route path="calendar" element={<AuthGuard><Calendar /></AuthGuard>} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./Components/AuthGuard";
// user links
import About from "./Pages/About";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import MyReclamations from "./Pages/Reclamation/Reclamations";
import Reclamer from "./Pages/Reclamer";
import Profile from "./Pages/Profile";
import Reclammm from "./Pages/Reclamation/Reclamation";
// dashboard links
import Reclamations from "./Pages/Dashboard/Reclamations/Reclamations";
import ReclamationTypes from "./Pages/Dashboard/ReclamationTypes/ReclamationTypes";
import Roles from "./Pages/Dashboard/Roles/Roles";
import IndexDashboard from "./Pages/Dashboard/IndexDashboard";
import Admin from "./Pages/Dashboard/Admin";
import Calendar from "./Pages/Dashboard/Calendar";
import Users from "./Pages/Dashboard/users/Users";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
        <Route path="/about" element={<AuthGuard><About /></AuthGuard>} />
        <Route path="/login" element={<Login />} />
        <Route path="/reclamer" element={<AuthGuard><Reclamer /></AuthGuard>} />
        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/reclamations" element={<AuthGuard><MyReclamations /></AuthGuard>} />
        <Route path="/reclamations/:reclamId" element={<AuthGuard><Reclammm /></AuthGuard>} />
        {/* dashboard links */}
        <Route path="/dashboard" element={<AuthGuard><IndexDashboard /></AuthGuard>} >
          <Route index element={<AuthGuard><Admin /></AuthGuard>} />
          <Route path="users" element={<AuthGuard><Users /></AuthGuard>} />
          <Route path="reclamations" element={<AuthGuard><Reclamations /></AuthGuard>} />
          <Route path="reclamationTypes" element={<AuthGuard><ReclamationTypes /></AuthGuard>} />
          <Route path="roles" element={<AuthGuard><Roles /></AuthGuard>} />
          <Route path="calendar" element={<AuthGuard><Calendar /></AuthGuard>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
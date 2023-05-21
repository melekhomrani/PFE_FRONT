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
import ChangePasswordAdmin from "./pages/Admin/ChangePassword";
// user pages
import UserHome from "./pages/User/Home";
import UserProfile from "./pages/User/Profile";
import AdminAccessFlows from "./pages/Admin/AccessFlows";
import AuthGuard from "./components/AuthGuard";
import Reclamer from "./pages/Reclamer";
import ChangePasswordUser from "./pages/User/ChangePassword";
import UserDashHome from "./pages/userDash/userDashHome";
import UserIndex from "./pages/userDash/Index";

//user dashboard
import UserMesReclamations from "./pages/userDash/Reclamations";
import NeededReclamations from "./pages/userDash/NeededReclamsTab";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/login" element={<Login />} />
        <Route path="/reclamer" element={<AuthGuard><Reclamer /></AuthGuard>} />
        {/* user links */}
        <Route path="/user" >
          <Route index path="" element={<AuthGuard><UserHome /></AuthGuard>} />
          <Route path="profile" element={<AuthGuard><UserProfile /></AuthGuard>} />
          <Route path="password" element={<AuthGuard><ChangePasswordUser /></AuthGuard>} />
        </Route>
        {/* admin links */}
        <Route path="/admin" element={<AuthGuard><AdminIndex /></AuthGuard>} >
          <Route index element={<AuthGuard><AdminHome /></AuthGuard>} />
          <Route path="password" element={<AuthGuard><ChangePasswordAdmin /></AuthGuard>} />
          <Route path="profile" element={<AuthGuard><AdminProfile /></AuthGuard>} />
          <Route path="users" element={<AuthGuard><AdminUsers /></AuthGuard>} />
          <Route path="reclamations" element={<AuthGuard><AdminReclamations /></AuthGuard>} />
          <Route path="reclamationTypes" element={<AuthGuard><AdminTypes /></AuthGuard>} />
          <Route path="roles" element={<AuthGuard><AdminRoles /></AuthGuard>} />
          <Route path="accessFlows" element={<AuthGuard><AdminAccessFlows /></AuthGuard>} />
          <Route path="calendar" element={<AuthGuard><Calendar /></AuthGuard>} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
        <Route path="/userDash" element={<AuthGuard><UserIndex /></AuthGuard>} >
          <Route index element={<AuthGuard><UserDashHome/></AuthGuard>} />
          <Route path="password" element={<AuthGuard><ChangePasswordAdmin /></AuthGuard>} />
          <Route path="profile" element={<AuthGuard><AdminProfile /></AuthGuard>} />
          <Route path="mesReclamations" element={<AuthGuard><UserMesReclamations /></AuthGuard>} />
          <Route path="actionsNeeded" element={<AuthGuard><NeededReclamations /></AuthGuard>} />
          <Route path="calendar" element={<AuthGuard><Calendar /></AuthGuard>} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}
import { Box } from "@chakra-ui/react";
import ProfileComponent from "../../components/Profile";
import User from "../../interfaces/User";

const AdminProfile = () => {
  let userData: User = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    role: {
      id: 1,
      name: "Admin",
    }
  }
  const { isLoading, user } = { isLoading: false, user: userData }
  const username = user.firstName + " " + user.lastName;
  return (
    <>
      {
        user && <ProfileComponent user={user} isLoading={isLoading} />
      }
    </>
  );
};

export default AdminProfile;

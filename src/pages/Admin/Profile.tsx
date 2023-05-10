import { Box } from "@chakra-ui/react";
import ProfileComponent from "../../components/Profile";
import useMe from "../../hooks/useMe";
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
  const { isLoading: isLoadingUser, data: user } = useMe();
  console.log(user);
  return (
    <>
      {
        user && <ProfileComponent user={user} isLoading={isLoadingUser} />
      }
    </>
  );
};

export default AdminProfile;

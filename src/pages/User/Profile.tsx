import { Box } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProfileComponent from "../../components/Profile";
import User from "../../interfaces/User";

const UserProfile = () => {
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
  return (
    user &&
    <>
      <Header />
      <Box minH="77vh">
        <ProfileComponent user={user} isLoading={isLoading} />
      </Box>
      <Footer />
    </>
  );
};

export default UserProfile;

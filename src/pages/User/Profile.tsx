import { Box, Button, Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProfileComponent from "../../components/Profile";
import useMe from "../../hooks/useMe";
import User from "../../interfaces/User";

const UserProfile = () => {
  const { isLoading, data: user } = useMe()


  return (
    user &&
    <>
      <Header />
      <Box px="5" minH="77vh">
        <ProfileComponent user={user} isLoading={isLoading} />
      </Box>
      <Footer />
    </>
  );
};

export default UserProfile;

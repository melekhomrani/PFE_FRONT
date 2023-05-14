import { Box, Button, Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProfileComponent from "../../components/Profile";
import useMe from "../../hooks/useMe";
import User from "../../interfaces/User";

const UserProfile = () => {
  const { isLoading, data: user } = useMe()

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    user &&
    <>
      <Header />

      <Box minH="77vh">
        <Flex justify={"end"} pr="10">
          <Button onClick={() => handleLogout()} colorScheme="red" >
            Log out
          </Button>
        </Flex>
        <ProfileComponent user={user} isLoading={isLoading} />
      </Box>
      <Footer />
    </>
  );
};

export default UserProfile;

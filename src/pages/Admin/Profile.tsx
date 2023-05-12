import { Box, Flex } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa";
import ProfileComponent from "../../components/Profile";
import useMe from "../../hooks/useMe";
import User from "../../interfaces/User";

const AdminProfile = () => {
  const { isLoading: isLoadingUser, data: user } = useMe();
  !isLoadingUser && console.log(user);
  return (
    <>
      {isLoadingUser && <Flex minH="100vh" justify={"center"} align="center"><FaSpinner rotate={190} /></Flex>}
      {
        user && <ProfileComponent user={user} isLoading={isLoadingUser} />
      }
    </>
  );
};

export default AdminProfile;

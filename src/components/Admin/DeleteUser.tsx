import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Box,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import useDeleteUser from "../../hooks/useDeleteUser";
import User from "../../interfaces/User";

interface DeleteUserProps {
  onClose: () => void;
  userData: User;
}

function DeleteUser({ onClose, userData }: DeleteUserProps) {

  const toast = useToast();
  const mutation = useDeleteUser();
  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(userData.id);
      if (!toast.isActive("userDeleted")) {
        toast({
          id: "userDeleted",
          title: "User Deleted.",
          description: "User has been deleted successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
      onClose();
    } catch (error) {
      if (!toast.isActive("userNotDeleted")) {
        toast({
          id: "userNotDeleted",
          title: "Error.",
          description: "Unable to delete user.",
          status: "error",
          duration: 2500,
          isClosable: true,
        })
      }
    }
  }

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>Confirm deleting user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>Are you sure you want to delete this user?</Text>
            <Flex direction={"column"} justify="space-between" align={"flex-start"}>
              <Box mt="4" flex="1">
                <Box mb="2" fontSize="sm" fontWeight="semibold">Email</Box>
                <Box ps="1" fontSize="sm" color="gray.500">{userData.email}</Box>
              </Box>
              <Box mt="4" flex="1">
                <Box mb="2" fontSize="sm" fontWeight="semibold">First Name</Box>
                <Box ps="1" fontSize="sm" color="gray.500">{userData.firstName}</Box>
              </Box>
              <Box mt="4" flex="1">
                <Box mb="2" fontSize="sm" fontWeight="semibold">Last Name</Box>
                <Box ps="1" fontSize="sm" color="gray.500">{userData.lastName}</Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant={"outline"} colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete()} >Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteUser;
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import useDeleteType from "../../hooks/useDeleteType";
import Type from "../../interfaces/Type";
import User from "../../interfaces/User";

interface DeleteTypeProps {
  onClose: () => void;
  typeData: Type;
}

function DeleteType({ onClose, typeData }: DeleteTypeProps) {

  const toast = useToast();
  const mutation = useDeleteType();
  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(typeData.id);
      if (!toast.isActive("typeDeleted")) {
        toast({
          id: "typeDeleted",
          title: "Type deleted.",
          description: "Type has been deleted successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
      onClose();
    } catch (error: any) {
      if (!toast.isActive("typeNotDeleted")) {
        toast({
          id: "typeNotDeleted",
          title: "Error.",
          description: "Unable to delete type.",
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
            <Text fontWeight={"bold"}>Are you sure you want to delete this Type?</Text>
            <Flex direction={"column"} justify="space-between" align={"flex-start"}>
              <Box mt="4" flex="1">
                <Box mb="2" fontSize="sm" fontWeight="semibold">Type name</Box>
                <Box ps="1" fontSize="sm" color="gray.500">{typeData.typeName}</Box>
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

export default DeleteType;
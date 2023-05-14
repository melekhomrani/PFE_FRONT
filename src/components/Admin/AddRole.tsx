import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import useCreateRole from "../../hooks/useCreateRole";

interface AddRoleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Role {
  name: string
}

function AddRole({ isOpen, onClose }: AddRoleProps) {

  const toast = useToast();
  const mutation = useCreateRole();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const role: Role = {
      name: e.target.name.value,
    }
    try {
      await mutation.mutateAsync(role);
      if (!toast.isActive("roleCreated")) {
        toast({
          id: "roleCreated",
          title: "Role Created.",
          description: "Role has been created successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
      onClose();
    } catch (error: any) {
      console.log()
      if (!toast.isActive("roleNotCreated")) {
        toast({
          id: "roleNotCreated",
          title: "Error.",
          description: error.response.data.message,
          status: "error",
          duration: 2500,
          isClosable: true,
        })
      }
    }
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Role</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form
              id="addRoleForm"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <FormControl isRequired>
                <FormLabel>Role name</FormLabel>
                <Input autoFocus type="text" id="name" name="name" />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant={"outline"} colorScheme="red" onClick={onClose}>Cancel</Button>
            <Box w="2" />
            <Button colorScheme="blue" mr={3} type="submit" form="addRoleForm">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddRole;
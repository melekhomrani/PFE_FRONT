import { useState } from 'react'
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
import useUpdateRole from '../../hooks/useUpdateRole';
import Role from "../../interfaces/Role";

interface UpdateRoleProps {
  roleData: Role;
  onClose: () => void;
}

function UpdateRole({ roleData, onClose }: UpdateRoleProps) {

  const toast = useToast();
  // const mutation = useUpdateRole();
  const [role, setRole] = useState(roleData)
  const mutation = useUpdateRole();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const role: Role = {
      id: roleData.id,
      name: e.target.name.value,
    }
    try {
      await mutation.mutateAsync(role);
      if (!toast.isActive("roleUpdated")) {
        toast({
          id: "roleUpdated",
          title: "Role Updated.",
          description: "Role has been updated successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
      onClose();
    } catch (error) {
      if (!toast.isActive("roleNotUpdated")) {
        toast({
          id: "roleNotUpdated",
          title: "Error.",
          description: "Unable to update role.",
          status: "error",
          duration: 2500,
          isClosable: true,
        })
      }
    }
  };


  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="UpdateRoleForm"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <FormControl isRequired>
                <FormLabel>Role name</FormLabel>
                <Input autoFocus type="text" id="name" name="name" defaultValue={role.name} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant={"outline"} colorScheme="red" onClick={onClose}>Cancel</Button>
            <Box w="2" />
            <Button colorScheme="blue" mr={3} type="submit" form="UpdateRoleForm">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateRole;
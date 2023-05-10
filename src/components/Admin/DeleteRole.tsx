// create a modal to delete a role
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast, Text, Flex, Box } from "@chakra-ui/react"
import useDeleteRole from '../../hooks/useDeleteRole'
import Role from '../../interfaces/Role'

interface DeleteRoleProps {
  onClose: () => void;
  role: Role;
}

function DeleteRole({ onClose, role }: DeleteRoleProps) {

  const toast = useToast();
  const mutation = useDeleteRole();
  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(role.id);
      console.log(mutation.error)
      if (!toast.isActive("roleDeleted")) {
        toast({
          id: "roleDeleted",
          title: "Role Deleted.",
          description: "Role has been deleted successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
      onClose();
    } catch (error) {
      if (!toast.isActive("roleNotDeleted")) {
        toast({
          id: "roleNotDeleted",
          title: "Error.",
          description: "Unable to delete role.",
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
          <ModalHeader>Delete Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">
              Are you sure you want to delete{" " + role.name}?
            </Text>
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
  )
}

export default DeleteRole
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
  HStack,
  Center,
  Image,
  Select,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import useUpdateUser, { UserUpdate } from "../../hooks/useUpdateUser";
import { useState } from "react";
import User from "../../interfaces/User";
import Role from "../../interfaces/Role";

interface UpdateUserProps {
  userData: User
  onClose: () => void;
}

function UpdateUser({ userData, onClose }: UpdateUserProps) {

  const { isLoading: isLoadingRoles, data: roles } = useGetAllRoles()
  const [user, setUser] = useState(userData);
  const toast = useToast();

  const mutation = useUpdateUser();
  console.log(user);
  console.log(user.role?.name)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user: UserUpdate = {
      id: userData.id,
      email: e.target.email.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      role: e.target.role.value,
    };
    try {
      await mutation.mutateAsync(user);
      if (!toast.isActive("userUpdated")) {
        toast({
          id: "userUpdated",
          title: "User Updated.",
          description: "User has been updated successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
      onClose();
    }
    catch (error) {
      if (!toast.isActive("userNotUpdated")) {
        toast({
          id: "userNotUpdated",
          title: "Error.",
          description: "Unable to update user.",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Modal
        blockScrollOnMount
        isOpen={true}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="updateUserForm"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(event);
              }}
            >
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="email" name="email"
                  value={user.email}
                  onChange={(e: any) => setUser({ ...user, email: e.target.value })} />
              </FormControl>
              <HStack>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="first name" name="firstName"
                    value={user.firstName}
                    onChange={(e: any) => {
                      setUser({ ...user, firstName: e.target.value });
                      console.log(e.target)
                    }} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder="last name" name="lastName"
                    value={user.lastName}
                    onChange={(e: any) => setUser({ ...user, lastName: e.target.value })} />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  id="role"
                  defaultValue={user.role.id}
                  className="form-select"
                >
                  {roles.map((role: Role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="blue" type="submit" form="updateUserForm">
              save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateUser;
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
  Select,
  HStack,
  useToast,
} from "@chakra-ui/react";
import useGetAllRoles from '../../hooks/useGetAllRoles';
import Role from '../../interfaces/Role';
import useCreateUser, { User } from '../../hooks/useCreateUser';

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddUser({ isOpen, onClose }: AddUserProps) {
  const { isLoading, data: roles } = useGetAllRoles();
  const toast = useToast();
  const mutation = useCreateUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user: User = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.roleId.value,
    };
    mutation.mutate(user);
    if (mutation.isSuccess) {
      toast({
        title: "User Created.",
        description: "User has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      onClose();
    } else {
      toast({
        title: "User Creation Failed.",
        description: "User has not been created successfully",
        status: "error",
        duration: 2500,
        isClosable: true,
      })
    }
  };

  return (
    <>
      <Modal
        blockScrollOnMount
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="createUserForm"
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <HStack>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="first name" name="firstName" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder="last name" name="lastName" />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="email" name="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="password" name="password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  name="roleId"
                  id="roleId"
                  className="form-select"
                  placeholder='Select Role'
                >
                  {roles?.map((role: Role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" form="createUserForm">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUser;
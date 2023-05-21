import {
  Button,
  Box,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useDisclosure,
  ChakraProvider,
  Skeleton,
  Divider,
  Input,
  HStack,
  Select,
} from '@chakra-ui/react'
import useGetAllUsers from '../../hooks/useGetAllUsers';
import IUser from '../../interfaces/User';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';
import AddUser from '../../components/Admin/AddUser';
import UpdateUser from '../../components/Admin/UpdateUser';
import DeleteUser from '../../components/Admin/DeleteUser';
import useGetAllRoles from '../../hooks/useGetAllRoles';

// TODO: all done for users, now do the same for roles

interface User extends IUser {
  dateCreation: any;
  dateModification: any;
}

const Users = () => {
  let { isLoading, data: users } = useGetAllUsers();
  let { isLoading: isLoadingRoles, data: roles } = useGetAllRoles();
  users = users && users.sort((a: User, b: User) => {
    return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
  });
  const addNewUser = useDisclosure();
  const updateUser = useDisclosure();
  const deleteUser = useDisclosure();

  const [userToUpdate, setuserToUpdate] = useState<User | null>(null);
  const [userToDelete, setuserToDelete] = useState<User | null>(null);
  const [textFilter, setTextFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  if (users) {
    console.log(users);
  }

  let usersElem;
  if(users){
    usersElem =
    users?.filter(
      (user: User) =>
      user.role.name.toLowerCase().includes(roleFilter.toLowerCase())
    )
    .filter(
      (user: User) =>
        user.firstName.toLowerCase().includes(textFilter.toLowerCase()) ||
        user.lastName.toLowerCase().includes(textFilter.toLowerCase()) ||
        user.email.toLowerCase().includes(textFilter.toLowerCase()) ||
        user.role.name.toLowerCase().includes(textFilter.toLowerCase()) ||
        user.id.toString().includes(textFilter.toLowerCase())
    ).map((user: User) => (
      <Tr key={user.id}>
        <Td textAlign={"center"} isNumeric>{user.id}</Td>
        <Td textAlign={"center"}>{`${user.firstName} ${user.lastName}`}</Td>
        <Td textAlign={"center"}>{user.email}</Td>
        <Td textAlign={"center"}>{user.role.name}</Td>
        <Td textAlign={"center"}>
          <Button variant={"outline"} colorScheme={"blue"} onClick={() => setuserToUpdate(user)}>edit</Button>
          <> </>
          <Button variant={"outline"} colorScheme={"red"} onClick={() => setuserToDelete(user)} >delete</Button>
        </Td>
      </Tr>
    ))
  }
  

  return (
    <ChakraProvider>
      <Box>
        <Flex mb={"55"} justify={"space-between"} alignItems={"center"} >
          <Heading>Users</Heading>
          <Button leftIcon={<AiOutlineUserAdd />} onClick={addNewUser.onOpen} >New User</Button>
          <AddUser isOpen={addNewUser.isOpen} onClose={addNewUser.onClose} />
        </Flex>
        <HStack>
        <Input type="text" placeholder='Search' onChange={
          (e) => {
            setTextFilter(e.target.value);
          }
        } />
        <Select onChange={
          (e) => {
            setRoleFilter(e.target.value);
          }
        }>
          <option selected value="">All</option>
          {roles?.map((role: any) => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </Select>
        </HStack>
        <TableContainer boxShadow='base' p='6' rounded='md' bg='white' >
          <Table size={'xs'} variant={"simple"}>
            <Thead>
              <Tr>
                <Th textAlign={"center"} isNumeric>Id</Th>
                <Th textAlign={"center"}>Username</Th>
                <Th textAlign={"center"}>Email</Th>
                <Th textAlign={"center"}>Role</Th>
                <Th textAlign={"center"}>Actions</Th>
              </Tr>
            </Thead>
            <Divider />
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                </Tr>
              ) : usersElem}
            </Tbody>
          </Table>
        </TableContainer>
        {
          userToUpdate && <UpdateUser userData={userToUpdate} onClose={() => { updateUser.onClose; setuserToUpdate(null) }} />
        }
        {
          userToDelete && <DeleteUser userData={userToDelete} onClose={() => { deleteUser.onClose; setuserToDelete(null) }} />
        }
      </Box >
    </ChakraProvider >
  )
}

export default Users

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
} from '@chakra-ui/react'
import useGetAllUsers from '../../hooks/useGetAllUsers';
import IUser from '../../interfaces/User';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';
import AddUser from '../../components/Admin/AddUser';
import UpdateUser from '../../components/Admin/UpdateUser';
import DeleteUser from '../../components/Admin/DeleteUser';

// TODO: all done for users, now do the same for roles

interface User extends IUser {
  dateCreation: any;
  dateModification: any;
}

const Users = () => {
  let { isLoading, data: users } = useGetAllUsers();
  users = users && users.sort((a: User, b: User) => {
    return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
  });
  const addNewUser = useDisclosure();
  const updateUser = useDisclosure();
  const deleteUser = useDisclosure();

  const [userToUpdate, setuserToUpdate] = useState<User | null>(null);
  const [userToDelete, setuserToDelete] = useState<User | null>(null);

  if (users) {
    console.log(users);
  }

  return (
    <ChakraProvider>
      <Box>
        <Flex mb={"55"} justify={"space-between"} alignItems={"center"} >
          <Heading>Users</Heading>
          <Button leftIcon={<AiOutlineUserAdd />} onClick={addNewUser.onOpen} >New User</Button>
          <AddUser isOpen={addNewUser.isOpen} onClose={addNewUser.onClose} />
        </Flex>
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
              ) : (
                users?.map((user: User) => (
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
              )}
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

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
import User from '../../interfaces/User';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';
import AddUser from '../../components/Admin/AddUser';
import UpdateUser from '../../components/Admin/UpdateUser';
import DeleteUser from '../../components/Admin/DeleteUser';

const Users = () => {
  let { isLoading, data: users } = useGetAllUsers();
  const add = useDisclosure();
  const update = useDisclosure();

  const [currentUserEdit, setCurrentUserEdit] = useState<User | null>(null);
  const [currentUserDelete, setCurrentUserDelete] = useState<User | null>(null);


  return (
    <ChakraProvider>
      <Box>
        <Flex mb={"55"} justify={"space-between"} alignItems={"center"} >
          <Heading>Users</Heading>
          <Button leftIcon={<AiOutlineUserAdd />} onClick={add.onOpen} >New User</Button>
          <AddUser isOpen={add.isOpen} onClose={add.onClose} />
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
                      <Button variant={"outline"} colorScheme={"blue"} onClick={() => setCurrentUserEdit(user)}>edit</Button>
                      <> </>
                      <Button variant={"outline"} colorScheme={"red"} onClick={() => setCurrentUserDelete(user)} >delete</Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {
          currentUserEdit && <UpdateUser user={currentUserEdit} onClose={() => { update.onClose; setCurrentUserEdit(null) }} />
        }
        {
          currentUserDelete && <DeleteUser userData={currentUserDelete} onClose={() => { update.onClose; setCurrentUserDelete(null) }} />
        }
      </Box >
    </ChakraProvider >
  )
}

export default Users

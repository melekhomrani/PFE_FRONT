import { useState } from 'react';
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
  Skeleton,
} from '@chakra-ui/react'
import useGetAllRoles from '../../hooks/useGetAllRoles';
import { AiOutlineUserAdd } from 'react-icons/ai';
import IRole from '../../interfaces/Role';
import AddRole from '../../components/Admin/AddRole';
import DeleteRole from '../../components/Admin/DeleteRole';
import UpdateRole from '../../components/Admin/UpdateRole';

// TODO: all done for roles, now do the same for types

interface Role extends IRole {
  dateCreation: string;
  dateModification: string;
}

const Roles = () => {
  let { isLoading, isSuccess, isError, data: roles } = useGetAllRoles();
  const addNewRole = useDisclosure();
  const updateRole = useDisclosure();
  const deleteRole = useDisclosure();
  roles = roles && roles.sort((a: Role, b: Role) => {
    return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
  });
  const [roleToUpdate, setRoleToUpdate] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  return (
    <Box>
      <Box>
        <Flex mb={"55"} justifyContent={"space-between"} alignItems={"center"} >
          <Heading>Roles</Heading>
          <Button leftIcon={<AiOutlineUserAdd />} onClick={addNewRole.onOpen} >Add Role</Button>
          <AddRole isOpen={addNewRole.isOpen} onClose={addNewRole.onClose} />
        </Flex>
        <TableContainer boxShadow='base' p='6' rounded='md' bg='white' >
          <Table size={'md'} variant={"simple"}>
            <Thead>
              <Tr>
                <Th textAlign={"center"} isNumeric>Id</Th>
                <Th textAlign={"center"}>Name</Th>
                <Th textAlign={"center"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" mb="2" />
                  </Td>
                </>
              ) : (
                roles?.map((role: Role) => (
                  <Tr key={role.id}>
                    <Td textAlign={"center"} isNumeric>{role.id}</Td>
                    <Td textAlign={"center"}>{role.name}</Td>
                    <Td textAlign={"center"}>
                      <Button onClick={() => {
                        setRoleToUpdate(role);
                      }} variant="outline" colorScheme={"blue"} mr={"2"}>Edit</Button>
                      <Button variant="outline" colorScheme={"red"} onClick={() => { setRoleToDelete(role) }}>Delete</Button>
                    </Td>
                  </Tr>)
                )
              )
              }
            </Tbody>
          </Table>
        </TableContainer>
        {
          roleToUpdate && <UpdateRole roleData={roleToUpdate} onClose={() => { updateRole.onClose; setRoleToUpdate(null) }} />
        }
        {
          roleToDelete && <DeleteRole role={roleToDelete} onClose={() => { deleteRole.onClose; setRoleToDelete(null) }} />
        }
      </Box>
    </Box>
  )
}
export default Roles;
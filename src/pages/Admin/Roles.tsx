import { Link } from 'react-router-dom'
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
import Role from '../../interfaces/Role';
import UpdateRole from '../../components/Admin/UpdateRole';

const Roles = () => {
  const { isLoading, isSuccess, isError, data: roles } = useGetAllRoles();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  return (
    <Box>
      <Box maxW={{ base: "container.xsa", md: "container.sm" }}>
        <Flex mb={"55"} justifyContent={"space-between"} alignItems={"center"} >
          <Heading>Roles</Heading>
          <Button leftIcon={<AiOutlineUserAdd />} onClick={onOpen} >Add Role</Button>
          {/* <AddRole isOpen={isOpen} onClose={onClose} /> */}
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
                        setRoleToEdit(role);
                      }} colorScheme={"blue"} mr={"2"}>Edit</Button>
                      <Button colorScheme={"red"} onClick={() => { setRoleToDelete(role) }}>Delete</Button>
                    </Td>
                  </Tr>)
                )
              )
              }
            </Tbody>
          </Table>
        </TableContainer>
        {
          <UpdateRole onClose={onClose} role={roleToEdit} />
        }
      </Box>
    </Box>
  )
}
export default Roles;
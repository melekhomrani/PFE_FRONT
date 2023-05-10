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
import useGetAllTypes from '../../hooks/useGetAllTypes';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Type from '../../interfaces/Type';
import AddType from '../../components/Admin/AddType';


const Types = () => {
  //FIXME: add type
  //TODO: edit type
  //TODO: delete type

  const { isLoading, isSuccess, isError, data: types, error, refetch } = useGetAllTypes();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [typeToEdit, setTypeToEdit] = useState<Type | null>(null);
  const [typeToDelete, setTypeToDelete] = useState<Type | null>(null);

  return (
    <Box>
      <Box>
        {/* <NavBar /> */}
        <Flex mb={"55"} justifyContent={"space-between"} alignItems={"center"} >
          <Heading>Types</Heading>
          <Button leftIcon={<AiOutlineUserAdd />} onClick={onOpen} >Add Type</Button>
          <AddType isOpen={isOpen} onClose={onClose} />
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
                isSuccess && types.map((type: Type) => (
                  <Tr key={type.id}>
                    <Td textAlign={"center"} isNumeric>{type.id}</Td>
                    <Td textAlign={"center"}>{type.typeName}</Td>
                    <Td textAlign={"center"}>
                      <Button colorScheme={"blue"} mr={"2"} onClick={() => { setTypeToEdit(type) }}>Edit</Button>
                      <Button colorScheme={"red"} onClick={() => { setTypeToDelete(type) }}>Delete</Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Types
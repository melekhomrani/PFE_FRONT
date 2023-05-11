import React from 'react'
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
import { AiFillPlusSquare } from 'react-icons/ai';
import useGetAllAccessFlows from '../../hooks/useGetAllAccessFlows';

import AccessFlow from '../../interfaces/AccessFlow';


// const countRoles = (accessFlow: AccessFlow) => {
//   const counts: { [key: number]: { [key: string]: number } } = {};
//   console.log("AAAAAAAAAAAAAAAAA", accessFlow.approve)
//   const roles = [...accessFlow.approve, ...accessFlow.consult, ...accessFlow.create, ...accessFlow.notify, ...accessFlow.validate];
//   roles.forEach(role => {
//     if (!counts[accessFlow.id]) {
//       counts[accessFlow.id] = {};
//     }
//     if (!counts[accessFlow.id][role.name]) {
//       counts[accessFlow.id][role.name] = 0;
//     }
//     counts[accessFlow.id][role.name]++;
//   });
//   return counts;
// }

const AdminAccessFlows = () => {
  const { isLoading, isSuccess, data: accessFlows } = useGetAllAccessFlows();
  return (
    <Box>
      <Box>
        <Flex mb={"55"} justifyContent={"space-between"} alignItems={"center"} >
          <Heading>Access Flows</Heading>
          <Button leftIcon={<AiFillPlusSquare />} >Add Access Flow</Button>

        </Flex>
        <TableContainer boxShadow='base' p='6' rounded='md' bg='white' >
          <Table size={'md'} variant={"simple"}>
            <Thead>
              <Tr>
                <Th textAlign={"center"} isNumeric>Id</Th>
                <Th textAlign={"center"}>Type name</Th>
                <Th textAlign={"center"}>Approvers</Th>
                <Th textAlign={"center"}>Consultors</Th>
                <Th textAlign={"center"}>Creators</Th>
                <Th textAlign={"center"}>Notified</Th>
                <Th textAlign={"center"}>Validators</Th>
                <Th textAlign={"center"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                isLoading ? (
                  <>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                    <Td>
                      <Skeleton height="20px" mb={2} />
                    </Td>
                  </>
                ) : (
                  isSuccess && accessFlows.map((accessFlow: AccessFlow) => (
                    <Tr key={accessFlow.id}>
                      <Td textAlign={"center"}>{accessFlow.id}</Td>
                      <Td textAlign={"center"}>{accessFlow.reclamationType.typeName}</Td>
                      <Td textAlign={"center"}>{accessFlow.approve.length}</Td>
                      <Td textAlign={"center"}>{accessFlow.consult.length}</Td>
                      <Td textAlign={"center"}>{accessFlow.create.length}</Td>
                      <Td textAlign={"center"}>{accessFlow.notify.length}</Td>
                      <Td textAlign={"center"}>{accessFlow.validate.length}</Td>
                      <Td textAlign={"center"}>
                        <Button variant={"outline"} colorScheme="blue" mr={3}>
                          Edit
                        </Button>
                        <Button variant={"outline"} colorScheme="red">
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default AdminAccessFlows



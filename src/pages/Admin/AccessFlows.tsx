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
  Input,
} from '@chakra-ui/react'
import { AiFillPlusSquare } from 'react-icons/ai';
import useGetAllAccessFlows from '../../hooks/useGetAllAccessFlows';

import AccessFlow from '../../interfaces/AccessFlow';
import UpdateAccessFlow from '../../components/Admin/UpdateAccessFlow';


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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accessFlowToUpdate, setAccessFlowToUpdate] = useState<AccessFlow | null>(null);
  const [accessFlowToDelete, setAccessFlowToDelete] = useState<AccessFlow | null>(null);
  const [textFilter, setTextFilter] = useState<string>("");


  let accessFlowsElem;

  if (accessFlows) {
    accessFlowsElem = accessFlows?.filter(
      (accessFlow: AccessFlow) =>
        accessFlow.reclamationType.typeName.toLowerCase().includes(textFilter.toLowerCase())
    )
    .map((accessFlow: AccessFlow) => (
      <Tr key={accessFlow.id}>
        {/* <Td textAlign={"center"}>{accessFlow.id}</Td> */}
        <Td textAlign={"center"}>{accessFlow.reclamationType.typeName}</Td>
        <Td textAlign={"center"}>{accessFlow.create.length}</Td>
        <Td textAlign={"center"}>{accessFlow.consult.length}</Td>
        <Td textAlign={"center"}>{accessFlow.approve.length}</Td>
        <Td textAlign={"center"}>{accessFlow.notify.length}</Td>
        <Td textAlign={"center"}>{accessFlow.validate.length}</Td>
        <Td textAlign={"center"}>
          <Button variant={"outline"} onClick={() => setAccessFlowToUpdate(accessFlow)} colorScheme="blue" mr={3}>
            Edit
          </Button>
        </Td>
      </Tr>
    ))
  }

  // const counts = countRoles(accessFlowToUpdate);

  return (
    <Box>
      <Box>
        <Flex mb={"55"} justifyContent={"space-between"} alignItems={"center"} >
          <Heading>Access Flows</Heading>
          {/* <Button leftIcon={<AiFillPlusSquare />} >Add Access Flow</Button> */}

        </Flex>
        <Input placeholder="Search" onChange={(e) => setTextFilter(e.target.value)} />
        <TableContainer boxShadow='base' p='6' rounded='md' bg='white' >
          <Table size={'md'} variant={"simple"}>
            <Thead>
              <Tr>
                {/* <Th textAlign={"center"} isNumeric>Id</Th> */}
                <Th textAlign={"center"}>Type name</Th>
                <Th textAlign={"center"}>Creators</Th>
                <Th textAlign={"center"}>Consultors</Th>
                <Th textAlign={"center"}>Approvers</Th>
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
                  isSuccess && accessFlowsElem
                )
              }
            </Tbody>
          </Table>
        </TableContainer>
        {
          accessFlowToUpdate && <UpdateAccessFlow accessFlowData={accessFlowToUpdate} onClose={() => { onClose; setAccessFlowToUpdate(null) }} />
        }
      </Box>
    </Box>
  )
}

export default AdminAccessFlows



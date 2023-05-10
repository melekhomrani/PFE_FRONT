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
import useGetAllTypes from '../../hooks/useGetAllTypes';
import { AiFillPlusSquare } from 'react-icons/ai';
import Type from '../../interfaces/Type';
import AddType from '../../components/Admin/AddType';
import useGetAccessFlow from '../../hooks/useGetAccessFlow';
import useGetAllAccessFlows from '../../hooks/useGetAllAccessFlows';

import AccessFlow from '../../interfaces/AccessFlow';

const AdminAccessFlows = () => {
  const { isLoading, isSuccess, data: accessFlows } = useGetAllAccessFlows();
  !isLoading && console.log(accessFlows);
  const approveCount = accessFlows && accessFlows.map((accessFlow: AccessFlow) => accessFlow.approve.length);
  const consultCount = accessFlows && accessFlows.map((accessFlow: AccessFlow) => accessFlow.consult.length);
  const createCount = accessFlows && accessFlows.map((accessFlow: AccessFlow) => accessFlow.create.length);
  const notifyCount = accessFlows && accessFlows.map((accessFlow: AccessFlow) => accessFlow.notify.length);
  const validateCount = accessFlows && accessFlows.map((accessFlow: AccessFlow) => accessFlow.validate.length);
  console.log(approveCount);
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
                      <Td textAlign={"center"}>{approveCount}</Td>
                      <Td textAlign={"center"}>{consultCount}</Td>
                      <Td textAlign={"center"}>{createCount}</Td>
                      <Td textAlign={"center"}>{notifyCount}</Td>
                      <Td textAlign={"center"}>{validateCount}</Td>
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



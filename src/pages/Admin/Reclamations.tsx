import { Link } from 'react-router-dom'
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
  useDisclosure,
  Skeleton,
  HStack,
  Input,
  Select,
} from '@chakra-ui/react'
import useGetAllReclamations from "../../hooks/useGetAllReclamations";
import { useState } from 'react';
import Reclamation from '../../interfaces/Reclamation';
import ReviewReclamation from '../../components/Admin/Reclamation';
import useGetAllTypes from '../../hooks/useGetAllTypes';


const Reclamations = () => {
  const { isLoading, isSuccess, data } = useGetAllReclamations();
  const {isLoading: isLoadingTypes, isSuccess: isSuccessTypes, data: dataTypes} = useGetAllTypes();
  

  // sort by date 
  data?.sort((a: Reclamation, b: Reclamation) => {
    return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
  });

  const allReclamations = data;
  const [currentReclamation, setCurrentReclamation] = useState<Reclamation | null>(null);

  const addNewReclam = useDisclosure();
  const updateReclam = useDisclosure();
  const deleteReclam = useDisclosure();

  const [reclamToUpdate, setReclamToUpdate] = useState<Reclamation | null>(null);
  const [reclamToDelete, setReclamToDelete] = useState<Reclamation | null>(null);
  const [textFilter, setTextFilter] = useState<string>("");
  const [progressFilter, setProgressFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  let reclamationsElem;
  if (allReclamations) {
    reclamationsElem =
    allReclamations?.filter(
      (reclamation: Reclamation) =>
        reclamation.progress.toLowerCase().includes(progressFilter.toLowerCase())
    )
    .filter(
      (reclamation: Reclamation) =>
        reclamation.type.typeName.toLowerCase().includes(typeFilter.toLowerCase())
    )
    .filter(
      (reclamation: Reclamation) =>
        reclamation.subject.toLowerCase().includes(textFilter.toLowerCase()) ||
        reclamation.author.firstName.toLowerCase().includes(textFilter.toLowerCase()) ||
        reclamation.author.lastName.toLowerCase().includes(textFilter.toLowerCase()) ||
        reclamation.progress.toLowerCase().includes(textFilter.toLowerCase()) ||
        reclamation.type.typeName.toLowerCase().includes(textFilter.toLowerCase())
    )
    .map((reclamation: Reclamation) => (
      <Tr key={reclamation.id}>
        <Td textAlign={"center"}>{reclamation.subject}</Td>
        <Td textAlign={"center"}>{reclamation.author.firstName} {reclamation.author.lastName}</Td>
        <Td textAlign={"center"}>{reclamation.progress}</Td>
        <Td textAlign={"center"}>{reclamation.type.typeName}</Td>
        <Td textAlign={"center"}>
          <Button variant={"outline"} colorScheme="blue" size="sm" mr="2"
            onClick={() => {
              setCurrentReclamation(reclamation);
              console.log("clicked from view reclam")
            }}>View</Button>
          <Button variant={"outline"} colorScheme="red" size="sm" mr="2">Delete</Button>
        </Td>
      </Tr>)
    )
  }

  return (
    <Box>
      <Heading mb={"55"}>Reclamations</Heading>
      <HStack>
        <Input type="text" placeholder='Search' onChange={(e) => setTextFilter(e.target.value)} />
        <Select placeholder="Filter by progress" onChange={(e)=> setProgressFilter(e.target.value)}>
          <option value="">All</option>
          <option value="waiting">Waiting</option>
          <option value="processing">Processing</option>
          <option value="validated">Validated</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </Select>
        <Select placeholder="Filter by type" onChange={(e)=> setTypeFilter(e.target.value)}>
          <option value="">All</option>
          {isSuccessTypes && dataTypes?.map((type: any) => (
            <option key={type.id} value={type.typeName}>{type.typeName}</option>
          ))}
        </Select>
      </HStack>

      <TableContainer boxShadow='base' p='6' rounded='md' bg='white' >
        <Table size={'md'} variant={"simple"}>
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Object</Th>
              <Th textAlign={"center"}>Author name</Th>
              <Th textAlign={"center"}>progress</Th>
              <Th textAlign={"center"}>type name</Th>
              <Th textAlign={"center"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ?
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
                <Td>
                  <Skeleton height="20px" mb="2" />
                </Td>
                <Td>
                  <Skeleton height="20px" mb="2" />
                </Td>
              </>
              : isSuccess && reclamationsElem}
          </Tbody>
        </Table>
      </TableContainer>
      {
        currentReclamation && (
          < ReviewReclamation
            reclam={currentReclamation}
            isOpen={updateReclam.isOpen}
            onClose={() => { updateReclam.onClose; setCurrentReclamation(null) }}
          />
        )
      }
    </Box>
  );
}

export default Reclamations;
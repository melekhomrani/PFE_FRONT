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
} from '@chakra-ui/react'
import useGetAllReclamations from "../../hooks/useGetAllReclamations";
import { useState } from 'react';
import Reclamation from '../../interfaces/Reclamation';
import ReviewReclamation from '../../components/Admin/Reclamation';


const Reclamations = () => {
  const { isLoading, isSuccess, data, } = useGetAllReclamations();

  const allReclamations = data;
  const [currentReclamation, setCurrentReclamation] = useState<Reclamation | null>(null);

  const addNewReclam = useDisclosure();
  const updateReclam = useDisclosure();
  const deleteReclam = useDisclosure();

  const [reclamToUpdate, setReclamToUpdate] = useState<Reclamation | null>(null);
  const [reclamToDelete, setReclamToDelete] = useState<Reclamation | null>(null);

  return (
    <Box>
      <Heading mb={"55"}>Reclamations</Heading>

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
              : isSuccess && allReclamations?.map((reclamation: Reclamation) => (
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
              )}
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
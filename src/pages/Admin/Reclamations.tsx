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
  const { isLoading, isSuccess, isError, data, error, refetch } = useGetAllReclamations();

  const allReclamations = data;
  const [currentReclamation, setCurrentReclamation] = useState<Reclamation | null>(null);
  console.log(allReclamations)

  const viewReclam = useDisclosure();

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
                <Td>
                  <Skeleton height="20px" mb="2" />
                </Td>
                <Td>
                  <Skeleton height="20px" mb="2" />
                </Td>
              </>
            ) : (allReclamations?.map((reclamation: Reclamation) => (
              <Tr key={reclamation.id}>
                <Td textAlign={"center"}>{reclamation.subject}</Td>
                <Td textAlign={"center"}>{reclamation.author.firstName} {reclamation.author.lastName}</Td>
                <Td textAlign={"center"}>{reclamation.progress}</Td>
                <Td textAlign={"center"}>{reclamation.type.typeName}</Td>
                <Td textAlign={"center"}>
                  <Button colorScheme="blue" size="sm" mr="2"
                    onClick={() => {
                      setCurrentReclamation(reclamation);
                      console.log("clicked from view reclam")
                    }}>View</Button>
                </Td>
              </Tr>)
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {
        currentReclamation && (
          < ReviewReclamation
            reclam={currentReclamation}
            isOpen={viewReclam.isOpen}
            onClose={() => { viewReclam.onClose; setCurrentReclamation(null) }}
          />
        )
      }
    </Box>
  );
}

export default Reclamations;
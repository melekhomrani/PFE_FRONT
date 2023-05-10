// import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
// import Reclamation from "../../interfaces/Reclamation";

// interface ReclamationProps {
//   reclam: Reclamation | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ReviewReclamation = ({ reclam, isOpen, onClose }: ReclamationProps) => {
//   return (
//     <Box>
//       <Modal isOpen={true} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Reclamation</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* <VStack spacing="1rem"> */}
//             <Flex direction={"column"} justify="space-between" align={"flex-start"}>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Author</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam?.author.firstName} {reclam?.author.lastName}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Subject</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam?.subject}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Type</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam?.type.typeName}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Description</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam?.description}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Progress</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam?.progress}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Creation Date</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam?.dateCreation.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</Box>
//               </Box>
//             </Flex>
//             {/* </VStack> */}
//           </ModalBody>
//           <ModalFooter>
//             {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Close
//             </Button> */}
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   )
// }

// export default ReviewReclamation

import { useState } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
  Button,
} from "@chakra-ui/react";
import Reclamation from "../../interfaces/Reclamation";

interface ReclamationProps {
  reclam: Reclamation | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewReclamation = ({ reclam, isOpen, onClose }: ReclamationProps) => {
  const [selectedProgress, setSelectedProgress] = useState(reclam?.progress);

  const handleProgressChange = (e: any) => {
    setSelectedProgress(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // call API to update progress
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reclamation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="1rem">
              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="sm" fontWeight="bold">
                  Author
                </Box>
                <Box ps="1" fontSize="sm" color="gray.500">
                  {reclam?.author.firstName} {reclam?.author.lastName}
                </Box>
              </Flex>

              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="sm" fontWeight="bold">
                  Subject
                </Box>
                <Box ps="1" fontSize="sm" color="gray.500">
                  {reclam?.subject}
                </Box>
              </Flex>

              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="sm" fontWeight="bold">
                  Type
                </Box>
                <Box ps="1" fontSize="sm" color="gray.500">
                  {reclam?.type.typeName}
                </Box>
              </Flex>

              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="sm" fontWeight="bold">
                  Description
                </Box>
                <Box ps="1" fontSize="sm" color="gray.500">
                  {reclam?.description}
                </Box>
              </Flex>

              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="sm" fontWeight="bold">
                  Progress
                </Box>
                <Select value={selectedProgress} onChange={handleProgressChange}>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </Select>
              </Flex>

              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="sm" fontWeight="bold">
                  Creation Date
                </Box>
                <Box ps="1" fontSize="sm" color="gray.500">
                  {reclam?.dateCreation.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Box>
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReviewReclamation;
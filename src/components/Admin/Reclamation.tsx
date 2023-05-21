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
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam.author.firstName} {reclam.author.lastName}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Subject</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam.subject}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Type</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam.type.typeName}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Description</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam.description}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Progress</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam.progress}</Box>
//               </Box>
//               <Box mt="4" flex="1">
//                 <Box mb="2" fontSize="sm" fontWeight="bold">Creation Date</Box>
//                 <Box ps="1" fontSize="sm" color="gray.500">{reclam.dateCreation.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</Box>
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
  useToast,
  Text,
} from "@chakra-ui/react";
import Reclamation from "../../interfaces/Reclamation";
import Progress from "../../interfaces/EnumProgress";
import useUpdateReclamProgress, { UpdateReclamProgressProps } from "../../hooks/useUpdateReclamProgress";
import useGetCanSetState from "../../hooks/useGetCanSetState";
import { useAuthStore } from "../../context/AuthStore";

interface ReclamationProps {
  reclam: any;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewReclamation = ({ reclam, isOpen, onClose }: ReclamationProps) => {
  const {isLoading, error, data} = useGetCanSetState(reclam.id);
  const [selectedProgress, setSelectedProgress] = useState(reclam.progress);

  const mutation = useUpdateReclamProgress();
  const toast = useToast();

  const handleProgressChange = (e: any) => {
    setSelectedProgress(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(reclam.id, selectedProgress)
    const Params: UpdateReclamProgressProps = {
      reclamId: reclam.id,
      progress: selectedProgress,
    };
    try {
      await mutation.mutateAsync(Params);
      if (!toast.isActive("updateReclamationSuccess")) {
        toast({
          id: "updateReclamationSuccess",
          title: "Reclamation updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error: any) {
      if (!toast.isActive("updateReclamationFailed")) {
        toast({
          id: "updateReclamationFailed",
          title: "Reclamation update failed",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(error);
    }
  };

  console.log("reclam", reclam)

  return (
    <Box>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reclamation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="updateReclamationForm"
              onSubmit={(event) => {
                handleSubmit(event)
              }}>

              <VStack spacing="1rem">
                <Flex direction="column" align="flex-start" w="100%">
                  <Box mb="2" fontSize="sm" fontWeight="bold">
                    Author
                  </Box>
                  <Box ps="1" fontSize="sm" color="gray.500">
                    {reclam.author.firstName} {reclam.author.lastName}
                  </Box>
                </Flex>

                <Flex direction="column" align="flex-start" w="100%">
                  <Box mb="2" fontSize="sm" fontWeight="bold">
                    Type
                  </Box>
                  <Box ps="1" fontSize="sm" color="gray.500">
                    {reclam.type.typeName}
                  </Box>
                </Flex>

                <Flex direction="column" align="flex-start" w="100%">
                  <Box mb="2" fontSize="sm" fontWeight="bold">
                    Subject
                  </Box>
                  <Box ps="1" fontSize="sm" color="gray.500">
                    {reclam.subject}
                  </Box>
                </Flex>

                <Flex direction="column" align="flex-start" w="100%">
                  <Box mb="2" fontSize="sm" fontWeight="bold">
                    Description
                  </Box>
                  <Box ps="1" fontSize="sm" color="gray.500">
                    {reclam.description}
                  </Box>
                </Flex>
                { true &&
                <Flex direction="column" align="flex-start" w="100%">
                  <Box mb="2" fontSize="sm" fontWeight="bold">
                    Progress
                  </Box>
                  <Select defaultValue={reclam.progress} onChange={handleProgressChange} isDisabled={!data}>
                    <option key={Progress.waiting} value={Progress.waiting}>Waiting</option>
                    <option key={Progress.processing} value={Progress.processing}>In Progress</option>
                    <option key={Progress.validated} value={Progress.validated}>Validated</option>
                    <option key={Progress.canceled} value={Progress.canceled}>Cancled</option>
                    <option key={Progress.done} value={Progress.done}>Done</option>
                  </Select>
                </Flex>}
                <Text>Archive State: {reclam.archived}</Text>

                <Flex direction="column" align="flex-start" w="100%">
                  <Box mb="2" fontSize="sm" fontWeight="bold">
                    Creation Date
                  </Box>
                  <Box ps="1" fontSize="sm" color="gray.500">
                    {reclam.dateCreation.toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Box>
                </Flex>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
          { data &&
            <Button type="submit" form="updateReclamationForm" colorScheme="blue" mr={3}>
              Save
            </Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReviewReclamation;
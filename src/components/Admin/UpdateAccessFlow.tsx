import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Checkbox,
  SkeletonText,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import useGetAccessFlow from "../../hooks/useGetAccessFlow";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import useUpdateAccessFlow, { AccessFlow } from "../../hooks/useUpdateAccessFlow";
import Role from "../../interfaces/Role";
import Type from "../../interfaces/Type";
import AccessFlowData from "../../interfaces/AccessFlow";

// FIXME: remove items when uncheck

interface UpdateAccessFlowProps {
  accessFlowData: AccessFlowData;
  onClose: () => void;
}

function UpdateAccessFlow({ accessFlowData, onClose }: UpdateAccessFlowProps) {

  const { isLoading: isLoadingRoles, data: roles } = useGetAllRoles();
  // const { isLoading: isLoadingAccessFlow, isSuccess: isSuccessAccessFlow, data: accessFlow } = useGetAccessFlow(10);
  console.log(accessFlowData)
  const toast = useToast();
  const mutation = useUpdateAccessFlow();

  const [create, setCreate] = useState<Array<number>>(accessFlowData.create.map((item) => item.id));
  const [consult, setConsult] = useState<Array<number>>(accessFlowData.consult.map((item) => item.id));
  const [notify, setNotify] = useState<Array<number>>(accessFlowData.notify.map((item) => item.id));
  const [approve, setApprove] = useState<Array<number>>(accessFlowData.approve.map((item) => item.id));
  const [validate, setvalidate] = useState<Array<number>>(accessFlowData.validate.map((item) => item.id));

  const roleExists = (role: Role, roles: Role[]) => {
    return roles.some((item) => item.id === role.id);
  }
  const disabledBtn = () => {
    if (create.length === 0 || consult.length === 0 || notify.length === 0 || approve.length === 0 || validate.length === 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const accessFlow: AccessFlow = {
      id: accessFlowData.id,
      reclamationTypeId: accessFlowData.reclamationType.id,
      notifyId: notify,
      createId: create,
      consultId: consult,
      approveId: approve,
      validateId: validate,
    }
    const accessFlowId = accessFlowData.id;
    try {
      await mutation.mutateAsync({ accessFlowId, accessFlow });
      if (!toast.isActive("accessFlowUpdated")) {
        toast({
          id: "accessFlowUpdated",
          title: "Access Flow Updated",
          description: "Access Flow has been updated successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
      onClose();
    }
    catch (error: any) {
      if (!toast.isActive("accessFlowNotUpdated")) {
        toast({
          id: "accessFlowNotUpdated",
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    }
  };

  const handleCheck = (e: any, setState: Dispatch<SetStateAction<number[]>>) => {
    console.log(create.map((item) => typeof item))
    if (e.target.checked) {
      setState((prev) => [...prev, e.target.value]);
    }
    else if (!e.target.checked) {
      setState((prev) => [...prev.filter((item) => item !== e.target.value)]);
    }
  }

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Access Flow</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack justify={"start"} align="start" mb="5" pl="3">
              <Flex direction="column" align="flex-start" w="100%">
                <Box mb="2" fontSize="lg" fontWeight="">
                  Type Name:
                </Box>
                <Box ps="1" fontSize="md">
                  {accessFlowData.reclamationType.typeName}
                </Box>
              </Flex>
            </VStack>
            <form
              id="UpdateAccessFlowForm"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <FormControl>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <FormLabel>Roles can create: </FormLabel>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex gap={"10px"} wrap="wrap" direction={"row"} justify="space-evenly" align="center">
                        {isLoadingRoles ? <SkeletonText /> :
                          roles.map((role: any) => (
                            <Checkbox
                              key={role.id}
                              value={role.id}
                              onChange={(e) => handleCheck(e, setCreate)}
                              defaultChecked={
                                roleExists(role, accessFlowData.create)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <FormLabel>Roles can consult: </FormLabel>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex gap={"10px"} wrap="wrap" direction={"row"} justify="space-evenly" align="center">
                        {isLoadingRoles ? <SkeletonText /> :
                          roles.map((role: any) => (
                            <Checkbox
                              key={role.id}
                              value={role.id}
                              onChange={(e) => handleCheck(e, setConsult)}
                              defaultChecked={
                                roleExists(role, accessFlowData.consult)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <FormLabel>Roles can approve: </FormLabel>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex gap={"10px"} wrap="wrap" direction={"row"} justify="space-evenly" align="center">
                        {isLoadingRoles ? <SkeletonText /> :
                          roles.map((role: any) => (
                            <Checkbox
                              key={role.id}
                              value={role.id}
                              onChange={(e) => handleCheck(e, setApprove)}
                              defaultChecked={
                                roleExists(role, accessFlowData.approve)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <FormLabel>Roles will be notified: </FormLabel>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex gap={"10px"} wrap="wrap" direction={"row"} justify="space-evenly" align="center">
                        {isLoadingRoles ? <SkeletonText /> :
                          roles.map((role: any) => (
                            <Checkbox
                              key={role.id}
                              value={role.id}
                              onChange={(e) => handleCheck(e, setNotify)}
                              defaultChecked={
                                roleExists(role, accessFlowData.notify)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <FormLabel>Roles can validate: </FormLabel>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex gap={"10px"} wrap="wrap" direction={"row"} justify="space-evenly" align="center">
                        {isLoadingRoles ? <SkeletonText /> :
                          roles.map((role: any) => (
                            <Checkbox
                              key={role.id}
                              value={role.id}
                              onChange={(e) => handleCheck(e, setvalidate)}
                              defaultChecked={
                                roleExists(role, accessFlowData.validate)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant={"outline"} colorScheme="red" onClick={onClose}>Cancel</Button >
            <Box w="2" />
            <Button disabled={disabledBtn()} colorScheme="blue" type="submit" form="UpdateAccessFlowForm" isLoading={mutation.isLoading}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateAccessFlow;
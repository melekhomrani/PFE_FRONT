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
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import useGetAccessFlow from "../../hooks/useGetAccessFlow";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import useUpdateType, { UpdateType } from "../../hooks/useUpdateType";
import Role from "../../interfaces/Role";
import Type from "../../interfaces/Type";

interface UpdateTypeProps {
  typeData: Type;
  onClose: () => void;
}

function UpdateType({ typeData, onClose }: UpdateTypeProps) {

  const { isLoading: isLoadingRoles, data: roles } = useGetAllRoles();
  const { isLoading: isLoadingAccessFlow, isSuccess: isSuccessAccessFlow, data: accessFlow } = useGetAccessFlow(typeData.id);
  const toast = useToast();
  const mutation = useUpdateType();

  const [create, setCreate] = useState<Array<number>>([]);
  const [consult, setConsult] = useState<Array<number>>([]);
  const [notify, setNotify] = useState<Array<number>>([]);
  const [approve, setApprove] = useState<Array<number>>([]);
  const [validate, setvalidate] = useState<Array<number>>([]);

  const roleExists = (role: Role, roles: Role[]) => {
    return roles.some((item) => item.id === role.id);
  }
  // const disabledBtn = () => {
  //   if (create.length === 0 || consult.length === 0 || notify.length === 0 || approve.length === 0 || validate.length === 0) {
  //     return true;
  //   }
  //   return false;
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newReclamType: UpdateType = {
      id: typeData.id,
      typeName: e.target.typeName.value,
      notify: notify,
      create: create,
      consult: consult,
      approve: approve,
      validate: validate,
    }
    try {
      await mutation.mutateAsync(newReclamType);
      if (!toast.isActive("typeCreated")) {
        toast({
          id: "typeUpdated",
          title: "Type Updated.",
          description: "Type has been updated successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
      onClose();
    }
    catch (error) {
      if (!toast.isActive("typeNotCreated")) {
        toast({
          id: "typeNotUpdated",
          title: "Type Not Updated.",
          description: "Type has not been updated successfully",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    }
  };

  const handleCheck = (e: any, setState: Dispatch<SetStateAction<number[]>>) => {
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
          <ModalHeader>Update Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="updateTypeForm"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <FormControl isRequired>
                <FormLabel>Type name: </FormLabel>
                <Input autoFocus type="text" defaultValue={typeData.typeName} id="name" name="typeName" />
              </FormControl>
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
                          isSuccessAccessFlow && roles.map((role: any) => (
                            <Checkbox
                              isDisabled={true}
                              key={role.id}
                              value={role.id}
                              defaultChecked={
                                roleExists(role, accessFlow.create)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                      <Text color={"blue"} opacity="0.5" ps="2" mt="2" >
                        Please edit access flow in &nbsp;
                        <Link style={{ textDecoration: "underline" }} to="/admin/accessFlows">access flow</Link>
                        &nbsp;
                        section
                      </Text>
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
                          isSuccessAccessFlow && roles.map((role: any) => (
                            <Checkbox
                              isDisabled={true}
                              key={role.id}
                              value={role.id}
                              defaultChecked={
                                roleExists(role, accessFlow.consult)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                      <Text color={"blue"} opacity="0.5" ps="2" mt="2" >
                        Please edit access flow in &nbsp;
                        <Link style={{ textDecoration: "underline" }} to="/admin/accessFlows">access flow</Link>
                        &nbsp;
                        section
                      </Text>
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
                          isSuccessAccessFlow && roles.map((role: any) => (
                            <Checkbox
                              isDisabled={true}
                              key={role.id}
                              value={role.id}
                              defaultChecked={
                                roleExists(role, accessFlow.notify)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                      <Text color={"blue"} opacity="0.5" ps="2" mt="2" >
                        Please edit access flow in &nbsp;
                        <Link style={{ textDecoration: "underline" }} to="/admin/accessFlows">access flow</Link>
                        &nbsp;
                        section
                      </Text>
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
                          isSuccessAccessFlow && roles.map((role: any) => (
                            <Checkbox
                              isDisabled={true}
                              key={role.id}
                              value={role.id}
                              defaultChecked={
                                roleExists(role, accessFlow.approve)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                      <Text color={"blue"} opacity="0.5" ps="2" mt="2" >
                        Please edit access flow in &nbsp;
                        <Link style={{ textDecoration: "underline" }} to="/admin/accessFlows">access flow</Link>
                        &nbsp;
                        section
                      </Text>
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
                          isSuccessAccessFlow && roles.map((role: any) => (
                            <Checkbox
                              isDisabled={true}
                              key={role.id}
                              value={role.id}
                              defaultChecked={
                                roleExists(role, accessFlow.validate)
                              }
                            >{role.name}</Checkbox>
                          ))
                        }
                      </Flex>
                      <Text color={"blue"} opacity="0.5" ps="2" mt="2" >
                        Please edit access flow in &nbsp;
                        <Link style={{ textDecoration: "underline" }} to="/admin/accessFlows">access flow</Link>
                        &nbsp;
                        section
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant={"outline"} colorScheme="red" onClick={onClose}>Cancel</Button >
            <Box w="2" />
            <Button colorScheme="blue" type="submit" form="updateTypeForm" isLoading={mutation.isLoading}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateType;
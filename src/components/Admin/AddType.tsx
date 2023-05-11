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
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import useCreateType, { Type } from "../../hooks/useCreateType";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import Role from "../../interfaces/Role";

interface AddTypeProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddType({ isOpen, onClose }: AddTypeProps) {

  const { isLoading: isLoadingRoles, data: roles } = useGetAllRoles();

  const toast = useToast();
  const mutation = useCreateType();

  const [create, setCreate] = useState<Array<number>>([]);
  const [consult, setConsult] = useState<Array<number>>([]);
  const [notify, setNotify] = useState<Array<number>>([]);
  const [approve, setapprove] = useState<Array<number>>([]);
  const [validate, setvalidate] = useState<Array<number>>([]);

  const disabledBtn = () => {
    if (create.length === 0 || consult.length === 0 || notify.length === 0 || approve.length === 0 || validate.length === 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newReclamType: Type = {
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
          id: "typeCreated",
          title: "Type Created.",
          description: "Type has been created successfully",
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
          id: "typeNotCreated",
          title: "Type Not Created.",
          description: "Type has not been created successfully",
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="createTypeForm"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <FormControl isRequired>
                <FormLabel>Type name: </FormLabel>
                <Input autoFocus type="text" id="name" name="typeName" />
              </FormControl>
              <FormControl>
                <Accordion>
                  <AccordionItem>
                    <AccordionButton>
                      <FormLabel>Roles can create: </FormLabel>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex gap={"10px"} wrap="wrap" direction={"row"} justify="space-evenly" align="center">
                        {isLoadingRoles ? <SkeletonText /> :
                          roles.map((role: any) => (
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setCreate)}>{role.name}</Checkbox>
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
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setConsult)}>{role.name}</Checkbox>
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
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setNotify)}>{role.name}</Checkbox>
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
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setapprove)}>{role.name}</Checkbox>
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
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setvalidate)}>{role.name}</Checkbox>
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
            <Button isDisabled={disabledBtn()} colorScheme="blue" type="submit" form="createTypeForm" isLoading={mutation.isLoading}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddType;
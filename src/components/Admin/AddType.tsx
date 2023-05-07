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
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import useCreateType from "../../hooks/useCreateType";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import Role from "../../interfaces/Role";

interface AddTypeProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddType({ isOpen, onClose }: AddTypeProps) {


  const [create, setCreate] = useState<Array<number>>([]);
  const [consult, setConsult] = useState<Array<number>>([]);
  const [notify, setNotify] = useState<Array<number>>([]);
  const [approbateur, setApprobateur] = useState<Array<number>>([]);
  const [validateur, setValidateur] = useState<Array<number>>([]);
  const toast = useToast();
  const mutation = useCreateType();
  // const { isLoading: isLoadingRoles, data: roles } = useGetAllRoles();
  const isLoadingRoles = false
  const roles: Role[] = [
    {
      id: 1,
      name: "admin",
    },
    {
      id: 2,
      name: "user",
    },
    {
      id: 3,
      name: "approver",
    },
    {
      id: 4,
      name: "validator",
    },
    {
      id: 5,
      name: "cosultor",
    }
  ]

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newReclamType = {
      typeName: e.target.typeName.value,
      notify: notify,
      create: create,
      consult: consult,
      approbateur: approbateur,
      validateur: validateur,
    }
    mutation.mutate(newReclamType);
    if (mutation.isSuccess) {
      toast({
        title: "Type Created.",
        description: "Type has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      onClose();
    } else {
      toast({
        title: "An error occurred.",
        description: "Unable to create type",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
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
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setApprobateur)}>{role.name}</Checkbox>
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
                            <Checkbox key={role.id} value={role.id} onChange={(e) => handleCheck(e, setValidateur)}>{role.name}</Checkbox>
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
            <Button type="submit" form="createTypeForm" isLoading={mutation.isLoading}>
              Submit
            </Button>
            <br />
            {mutation.isError && <Text color="red">Error</Text>}
            {mutation.isSuccess && <Text color="green">Success</Text>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddType;
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Toast, useToast, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Select, Text, Textarea, VStack, Flex } from "@chakra-ui/react";
import { useAuthStore } from "../context/AuthStore";
import logo from "../assets/logoRec.png"
import { Link } from 'react-router-dom';
import useCreateReclamation, { Reclamation } from "../hooks/useCreateReclamation";
import useGetAllTypes from "../hooks/useGetAllTypes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useGetAllowedTypes from "../hooks/useGetAllowedTypes";
import setTitle from "../hooks/useSetTitle";

export default function Reclamer() {
  setTitle("Reclamer - Esprit CRM");
  const user = useAuthStore(state => state.user);
  const toast = useToast();
  const allowedTypes = useGetAllowedTypes();
  allowedTypes && console.log("allowedTypes", allowedTypes)
  const mutation = useCreateReclamation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const content: Reclamation = {
        typeId: e.target.type.value,
        object: e.target.object.value,
        description: e.target.description.value
      }
      await mutation.mutateAsync(content);
      if (!toast.isActive("createReclamationSuccess")) {
        toast({
          id: "createReclamationSuccess",
          title: "Reclamation created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      // reset form
      e.target.reset();
    } catch (error) {
      if (!toast.isActive("createReclamationError")) {
        toast({
          id: "createReclamationError",
          title: "Error",
          description: "Unable to create reclamation, please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }
  return (
    <>
      <Header />
      <Flex justify={"center"} alignItems="center" maxW="container.sm" mx="auto" minH="78vh">
        <Box bg="#f5f8f9" p="8" borderRadius="md" boxShadow="md" border="1px" borderColor="gray.300">
          <Link to="/">
            <Image marginTop="3" src={logo} maxW="xs" />
          </Link>
          <form onSubmit={handleSubmit}>
            <VStack marginTop="10">
              <Text>Hello {user?.firstName} what is the problem ?</Text>
              <FormControl isRequired>
                <FormLabel>Type: </FormLabel>
                <Select placeholder={allowedTypes.isLoading ? "Loading..." : "Select type"} name="type">
                  {allowedTypes.isLoading && <option>Chargement...</option>}
                  {
                    allowedTypes.isSuccess && allowedTypes.data && allowedTypes.data?.map((type: any, index: number) => (
                      <option key={index} value={type.id}>{type.typeName}</option>
                    ))
                  }
                  {
                    allowedTypes.isError && <option>Unable to load types</option>
                  }
                  {
                    allowedTypes.isSuccess && allowedTypes.data && allowedTypes.data?.length === 0 && <option>No types available</option>
                  }
                </Select>
                <FormErrorMessage>Error</FormErrorMessage>
              </FormControl>
              <FormControl isDisabled={allowedTypes.error ? true : false} isRequired>
                <FormLabel>Object: </FormLabel>
                <Input type="text" placeholder="Object" name="object" />
              </FormControl>
              <FormControl isDisabled={allowedTypes.error ? true : false} isRequired>
                <FormLabel>Description: </FormLabel>
                <Textarea placeholder={`${user?.firstName} Please describe your problem here`} name="description" />
              </FormControl>
              <HStack>
                <Link to="/">
                  <Button colorScheme="red" leftIcon={<CloseIcon boxSize="3" />} isLoading={mutation.isLoading}>Cancel</Button>
                </Link>
                <Button type="submit" colorScheme="green" rightIcon={<CheckIcon />} isLoading={mutation.isLoading ? true : false} loadingText="Submitting...">Submit</Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Flex>
      <Footer />
    </>
  )
}
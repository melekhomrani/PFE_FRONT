import { Box, Flex, Text, Avatar, Divider, Button, VStack, FormControl, FormLabel, Input, HStack, SkeletonText, useToast, FormErrorMessage } from "@chakra-ui/react";
import useUpdatePassword from "../hooks/useUpdatePassword";
import User from "../interfaces/User";
import { useState } from "react";

interface UserProps {
  user: User;
  isLoading: boolean;
}

const ChangePassword = ({ isLoading, user }: UserProps) => {

  const toast = useToast();
  const mutation = useUpdatePassword();
  const [passwordMatch, setpasswordMatch] = useState(true)

  console.log("user", user)

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.form.newPassword.value
    const newPasswordComfirm = e.target.form.newPasswordComfirm.value
    console.log("##########################")
    console.info("newPassword'", newPassword, "'")
    console.log("newPasswordComfirm'", newPasswordComfirm, "'")
    if (newPassword === newPasswordComfirm) {
      setpasswordMatch(true)
    }
    else {
      setpasswordMatch(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const Params = {
      userId: user.id,
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    };
    try {
      console.log("Params", Params)
      await mutation.mutateAsync(Params);
      const message = mutation.data;
      console.log("message", message)
      if (!toast.isActive("updatePasswordSuccess")) {
        toast({
          id: "updatePasswordSuccess",
          title: "Password updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (!toast.isActive("updatePasswordError")) {
        toast({
          id: "updatePasswordError",
          title: "Error",
          description: "An error has occurred, please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Flex bg="white" justifyContent={"center"} alignItems="center" minH={"76vh"}>
      <Box
        display={{ base: "block", md: "flex" }}
        flexDirection="column"
        justifyContent="flex-start"
        maxW="90vw" minW={"50vw"}
        bgColor={"green"} bg="#f5f8f9" p="8" borderRadius="md"
        boxShadow="md" border={"1px"} borderColor="gray.300"
      >
        <Flex mb={"5"} >
          <Text fontSize="xl" fontWeight="bold" >Change Password</Text>
        </Flex>
        <Flex justify={"center"} align="center" >
          <SkeletonText noOfLines={10} isLoaded={!isLoading}>
            <VStack spacing={4} mt={4}>
              <form
                id="updatePasswordForm"
                onChange={(event) => {
                  console.log("tbadel mel form")
                  handlePasswordChange(event)
                }}
                onSubmit={(event) => {
                  handleSubmit(event);
                }}>
                <FormControl isRequired>
                  <FormLabel>Current Password</FormLabel>
                  <Input type="password" placeholder="New password" id="oldPassword" name="oldPassword" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" placeholder="New password" id="newPassword" name="newPassword" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" isInvalid={!passwordMatch} placeholder="New password" id="newPasswordComfirm" name="newPasswordComfirm" />
                  <Text color="red.500" display={!passwordMatch ? "block" : "none"} fontSize="sm" mt="1">Password comfirmation doesn't match</Text>
                </FormControl>
                <Button isDisabled={!passwordMatch} type="submit" form="updatePasswordForm" colorScheme="red" mt="3" size="lg">
                  Change Password
                </Button>
              </form>
            </VStack>
          </SkeletonText>
        </Flex>
      </Box>
    </Flex >
  );
};

export default ChangePassword;

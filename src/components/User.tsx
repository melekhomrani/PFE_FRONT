import { Box, Flex, Text, Avatar, Divider, Button, VStack, FormControl, FormLabel, Input, HStack, SkeletonText } from "@chakra-ui/react";
import { colors } from "../constants";
import User from "../interfaces/User";

interface UserProps {
  user: User;
  isLoading: boolean;
}

const User = ({ isLoading, user }: UserProps) => {
  const username = user.firstName + " " + user.lastName;
  return (
    <Box bg="white" p="8">
      <Box
        display={{ base: "block", md: "flex" }}
        justifyContent={"space-between"}
        alignItems="center" px={4} py={6}
        bgColor={"green"} bg="#f5f8f9" p="8" borderRadius="md"
        boxShadow="md" border={"1px"} borderColor="gray.300"
      >
        <Box flex="1" maxW="xl" mx={{ base: "auto", lg: "5" }} mb={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Personal Information
          </Text>
          <Divider />
          <SkeletonText noOfLines={10} isLoaded={!isLoading}>
            <VStack spacing={4} mt={4}>
              <Box w="full">
                <Text mb={1} fontWeight="bold">
                  Name:
                </Text>
                <Text fontSize="lg">{username}</Text>
              </Box>
              <Box w="full">
                <Text mb={1} fontWeight="bold">
                  Email:
                </Text>
                <Text fontSize="lg">johndoe@example.com</Text>
              </Box>
              <Box w="full">
                <Text mb={1} fontWeight="bold">
                  Phone:
                </Text>
                <Text fontSize="lg">+1 (123) 456-7890</Text>
              </Box>
              <Box w="full">
                <Text mb={1} fontWeight="bold">
                  Address:
                </Text>
                <Text fontSize="lg">123 Main St, Anytown, USA</Text>
              </Box>
            </VStack>
          </SkeletonText>
        </Box>
        <Box flex="1" maxW="xl" mx={{ base: "auto", lg: "5" }}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Change Password
          </Text>
          <Divider />
          <SkeletonText noOfLines={10} isLoaded={!isLoading}>
            <VStack spacing={4} mt={4}>
              <FormControl isRequired>
                <FormLabel>Current Password</FormLabel>
                <Input type="password" placeholder="New password" name="password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Password</FormLabel>
                <Input type="password" placeholder="New password" name="password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Password</FormLabel>
                <Input type="password" placeholder="New password" name="password" />
              </FormControl>
              <Button colorScheme="red" size="lg">
                Change Password
              </Button>
            </VStack>
          </SkeletonText>
        </Box>
      </Box>
    </Box>
  );
};

export default User;

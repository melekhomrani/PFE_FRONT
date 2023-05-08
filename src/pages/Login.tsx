import { Box, Button, Heading, Input, VStack, FormControl, FormLabel, Text, Spinner, FormErrorMessage, Flex } from "@chakra-ui/react";
import Header from "../components/Header";

function Login() {
  return (
    <Box>
      <Header />
      <Flex justify="center" align="center" minH="77vh">
        <Box maxW="container.sm" mx="auto" px="6">
          <VStack spacing="8" mx="auto" maxW="container.sm" px="6">
            <Box>
              <Heading as="h1" size="3xl" mb="6" textAlign="center" color="#ed1c24">
                Login
              </Heading>
              <Text fontSize="xl" mb="12" textAlign="center" color="black">
                Welcome back! Login to your account to manage your reclamation.
              </Text>
            </Box>
            <Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Button colorScheme="red" size="lg" w="full" mt="4">
                Login
              </Button>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Login
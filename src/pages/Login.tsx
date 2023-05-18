import { Box, Button, Heading, Input, VStack, FormControl, FormLabel, Text, Spinner, FormErrorMessage, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useLogin from "../hooks/useLogin";

function Login() {
  const navigate = useNavigate()

  const localStorageToken = localStorage.getItem('token')
  const { isLoading, data, error, mutateAsync } = useLogin()
  if (localStorageToken) {
    navigate(-1)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await mutateAsync({ email: e.target.email.value, password: e.target.password.value })
      .then((res) => {
        localStorage.setItem("token", res?.data.token)
        console.log(res?.data.token)
        navigate(-1)
      }).catch((err: any) => {
        console.log(err)
      })
  }


  return (
    <Box>
      <Header />
      <Flex justify="center" align="center" minH="77vh">
        <Box maxW="90vw" mx="auto" display={{ base: "block", md: "flex" }}
          justifyContent={"space-between"}
          alignItems="center" px={4} py={6}
          bgColor={"green"} bg="#f5f8f9" p="8" borderRadius="md"
          boxShadow="md" border={"1px"} borderColor="gray.300">
          <VStack spacing="8" mx="auto" maxW="container.sm" px="6">
            <Box>
              <Heading as="h1" size="3xl" mb="6" textAlign="center" color="#ed1c24">
                Login
              </Heading>
              <Text fontSize="xl" mb="12" textAlign="center" color="black">
                Welcome back! Login to your account to manage your reclamation.
              </Text>
            </Box>
            <VStack as="form" spacing="2" onSubmit={handleSubmit}>
              <FormControl id="email" isInvalid={error ? true : false} isRequired>
                <FormLabel>Email:</FormLabel>
                <Input type="email" name="email" placeholder="exemple@esprit.tn" required />
              </FormControl>
              <FormControl id="password" isInvalid={error ? true : false} isRequired>
                <FormLabel>Password:</FormLabel>
                <Input type="password" name="password" placeholder="Mot de passe" required />
                <FormErrorMessage>Email and/or password incorrect</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="red" isDisabled={!isLoading ? false : true}>{!isLoading ? "Se connecter" : <Spinner color="white" />}</Button>
            </VStack>
            <Link to="#"><Text fontSize="sm">Forget Password?</Text></Link>
          </VStack>
        </Box>
      </Flex >
    </Box >
  )
}

export default Login
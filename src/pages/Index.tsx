import { Box, Button, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MyLink from '../components/MyLink'
import useIsAdmin from '../hooks/useIsAdmin'
import setTitle from '../hooks/useSetTitle'

function Home() {
  //TODO: get user role from context
  const { isSuccess, isLoading, data: isAdmin } = useIsAdmin()
  const adminRole = "admin"
  const userRole = "user"
  setTitle("Home - Esprit CRM")

  return (
    <>
      <Header />
      <Flex align="center" justify="center" minH="77vh">
        <Box maxW="container.md" mx="auto" px="6">
          <Heading as="h1" size="3xl" mb="6" textAlign="center" color="#ed1c24">
            Welcome to Esprit CRM
          </Heading>
          <Text fontSize="xl" mb="12" textAlign="center" color="black">
            Our Complaint Management System helps you streamline the complaint management process and improve customer satisfaction. With our easy-to-use platform, you can manage customer complaints or requests for compensation, assign them to the appropriate teams or individuals, and track their progress.
          </Text>
          <Flex justify={"center"}>
          <VStack>
            <Flex justify="center" direction={{ base: "column", md: "row" }} gap="5">
              <MyLink to="/reclamer" >
                <Button colorScheme={"red"} color="white" size="lg" px="8">
                  Submit complaint
                </Button>
              </MyLink>
              {
                !isLoading && isSuccess &&
                <MyLink to={isAdmin ? "/admin" : "/userDash"}>
                  <Button colorScheme={"red"} color="white" size="lg" px="8">
                    Dashboard
                  </Button>
                </MyLink>
              }
            </Flex>
            <VStack>
            <Button size="lg" px="8" colorScheme="red" isDisabled>Other Services</Button>
            <Text cursor="not-allowed">Coming soon...</Text>
            </VStack>
            </VStack>
          </Flex>
        </Box>
      </Flex>
      <Box m="4" />
      <Footer />
    </>
  )
}

export default Home
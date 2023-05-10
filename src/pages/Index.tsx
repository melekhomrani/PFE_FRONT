import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MyLink from '../components/MyLink'

function Home() {
  //TODO: get user role from context
  const adminRole = "admin"
  const userRole = "user"

  return (
    <>
      <Header />
      <Flex align="center" justify="center" minH="77vh">
        <Box maxW="container.md" mx="auto" px="6">
          <Heading as="h1" size="3xl" mb="6" textAlign="center" color="#ed1c24">
            Welcome to Esprit Reclamation Management System
          </Heading>
          <Text fontSize="xl" mb="12" textAlign="center" color="black">
            Our Reclamation Management System helps you streamline the complaint management process and improve customer satisfaction. With our easy-to-use platform, you can manage customer complaints or requests for compensation, assign them to the appropriate teams or individuals, and track their progress.
          </Text>
          <Flex justify="center">
            <MyLink to={!userRole ? "/user" : "/admin"}>
              <Button colorScheme={"red"} color="white" size="lg" px="8">
                Get Started
              </Button>
            </MyLink>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </>
  )
}

export default Home
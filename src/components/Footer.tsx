import { Flex, Text } from '@chakra-ui/react'

function Footer() {
  return (
    <Flex justify="center" alignItems="center" bg="red" py="4" h="10vh" >
      <Flex align="center" justify="center">
        <Text fontSize="md" color="white" textAlign="center">
          Esprit School of engineering - Tunisia - 2023
        </Text>
      </Flex>
    </Flex>
  )
}

export default Footer
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Logo from "../assets/logoRec.png";
import { BiUserCircle } from "react-icons/bi";

function Header() {
  //TODO: get user from context
  const user = true
  return (
    <Flex bg="#f5f8f9" py="8" align={"center"} justify="space-between" px="8" h="13vh">
      <Link to={"/"}>
        <Box maxW="container.sm">
          <Image src={Logo} alt="Esprit Logo" maxW="150px" />
        </Box>
      </Link>
      <Link to={"/profile"}>
        <Button fontSize="md" color={!user ? "white" : "red"} colorScheme={user ? "white" : "red"}>
          {user ? <BiUserCircle size={28} /> : "login"}
        </Button>
      </Link>
    </Flex>
  )
}

export default Header
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { useState } from 'react'
import Logo from "../assets/logoRec.png";
import { BiUserCircle } from "react-icons/bi";
import MyLink from './MyLink';
import { colors } from '../constants'

function Header() {
  //TODO: get user from context
  const user = true
  // TODO: get user role from context
  const [role, setRole] = useState("faza okhra")
  const isAdmin = role === "admin"
  return (
    <Flex bg={colors.headerBG} py="8" align={"center"} justify="space-between" px="8" h="12vh" mb="1vh">
      <MyLink to={"/"}>
        <Box maxW="container.sm">
          <Image src={Logo} alt="Esprit Logo" maxW="150px" />
        </Box>
      </MyLink>
      <MyLink to={isAdmin ? "/admin/profile" : "/user/profile"}>
        <Button fontSize="md" color={!user ? "white" : "red"} colorScheme={user ? "white" : "red"}>
          {user ? <BiUserCircle size={28} /> : "login"}
        </Button>
      </MyLink>
    </Flex>
  )
}

export default Header
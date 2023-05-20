import { useState } from 'react'
import Logo from "../assets/logoRec.png";
import { BiLogOutCircle, BiUserCircle } from "react-icons/bi";
import MyLink from './MyLink';
import { colors } from '../constants'
import useMe from '../hooks/useMe';
import useIsAdmin from '../hooks/useIsAdmin';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';

const DropDownMenu = (user: any) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const name = `${user?.user?.firstName} ${user?.user?.lastName}`

  const [isOpen, setIsOpen] = useState(false);
  console.log(user)
  return (
    <Box>
      <Menu isLazy>
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {user && <Avatar size="sm" bgColor={"red"} color="white" name={name} />}
          {!user && "username"}
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} to="/user/profile" gap={2}>
            <BiUserCircle color='red' size={20} />
            Profile
          </MenuItem>
          <MenuItem as={Link} to="/user/password" gap={2}>
            <AiOutlineSetting color='red' size={20} />
            Change Password
          </MenuItem>
          <MenuItem gap={2} onClick={() => handleLogout()}>
            <BiLogOutCircle color='red' size={20} />
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box >
  );
};

function Header() {
  const location = useLocation();
  // const isLoginPage = location.pathname === '/login';
  const { isLoading, data: user } = useMe()
  return (
    <Flex bg={colors.headerBG} py="8" align={"center"} justify="space-between" px="8" h="12vh" mb="1vh">
      <MyLink to={"/"}>
        <Box maxW="container.sm">
          <Image src={Logo} alt="Esprit Logo" maxW="150px" />
        </Box>
      </MyLink>
      {!isLoading && <DropDownMenu user={user} />}
    </Flex>
  )
}

export default Header
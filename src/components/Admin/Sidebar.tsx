import Logo from "../../assets/logoRec.png";
import { Menu, Sidebar, useProSidebar } from "react-pro-sidebar"
import { Box, Image, Text, Button, Center, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineUsergroupAdd } from "react-icons/ai"
import { RiDashboardFill } from "react-icons/ri"
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { BsCalendar4Week } from "react-icons/bs"
import { BiLogOutCircle } from "react-icons/bi"
import { FaUserCircle } from "react-icons/fa"
import Item from "./SidebarItem";
import { useSidebarStore } from "../../context/SidebarStore";

const MySidebar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const { collapseSidebar, collapsed } = useProSidebar();
  const setCollapsed = useSidebarStore(state => state.setCollapsed)
  return (
    <Box as="main" minH={"100vh"} background={"red"} transitionDuration={"1700"} zIndex="10000">
      <Sidebar style={{ height: "100vh", padding: 0 }}>
        <Box background={"red"} height={"100vh"} >
          <Flex h={"100%"} justify="space-around" direction="column">
            <Flex
              cursor={"pointer"}
              ps="20px"
              pt="10px"
              m="1"
              align={"center"}
              justify={"center"}
              bgColor="white"
              onClick={() => {
                collapseSidebar(!collapsed)
                setCollapsed(!collapsed)
              }}
            >
              <Image
                textAlign={"center"}
                _hover={{ cursor: "pointer" }}
                src={Logo} w={"3xs"} marginBottom="5" />
            </Flex>
            <Menu style={{ background: "red" }}>
              <Box p={collapsed ? "" : "10px"} bgColor="red">
                <Item
                  title="Dashboard"
                  to=" "
                  icon={<RiDashboardFill />}
                />
                <Item
                  title="Profile"
                  to="profile"
                  icon={<FaUserCircle />}
                />
                <Item
                  title="Users"
                  to="users"
                  icon={<AiOutlineUsergroupAdd />}
                />
                <Item
                  title="Reclamations"
                  to="reclamations"
                  icon={<AiOutlineFileAdd />}
                />
                <Item
                  title="Reclamation Types"
                  to="reclamationTypes"
                  icon={<AiOutlineFileAdd />}
                />
                <Item
                  title="Roles"
                  to="roles"
                  icon={<MdOutlineAdminPanelSettings />}
                />
                <Item
                  title="Calendar"
                  to="calendar"
                  icon={<BsCalendar4Week />}
                />
              </Box>
            </Menu>
            <Box marginTop={4}>
              <Center>
                <Button
                  background={"white"}
                  color={"black"}
                  // width={"140px"}
                  display={"flex"}
                  gap={3}
                  onClick={() => handleLogout()}
                  leftIcon={<BiLogOutCircle />}
                >{!collapsed ? "Logout" : ""}
                </Button>
              </Center>
            </Box>
          </Flex>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default MySidebar;
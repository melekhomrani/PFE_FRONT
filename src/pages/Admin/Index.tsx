import { Box, Flex } from '@chakra-ui/react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import MySidebar from '../../components/Admin/Sidebar'
import { useAuthStore } from '../../context/AuthStore'
import { useSidebarStore } from '../../context/SidebarStore'
import setTitle from '../../hooks/useSetTitle'

function AdminIndex() {
  setTitle("Admin Dashboard - Esprit CRM")
  const user = useAuthStore(state => state.user)
  const { collapsed } = useSidebarStore(state => state)

  if (user && user.role.name !== "Admin") {
    return <Navigate to="/" />
  }
  return (
    <Flex minH="100vh" maxW={"100vw"} overflow="hidden">
      <Box pos={"fixed"} zIndex="10000">
        <ProSidebarProvider>
          <MySidebar />
        </ProSidebarProvider>
      </Box>
      <Box flex={1} >
        <Box flex={1} p={"30px 20px"} marginLeft={{ base: "70px", md: collapsed ? "78px" : "250px" }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default AdminIndex
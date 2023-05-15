import { Box, Flex } from '@chakra-ui/react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import MySidebar from '../../components/Admin/Sidebar'
import { useAuthStore } from '../../context/AuthStore'
import { useSidebarStore } from '../../context/SidebarStore'

function UserIndex() {
  const user = useAuthStore(state => state.user)
  const { collapsed } = useSidebarStore(state => state)

  if (user && user.role.name !== "Admin") {
    return <Navigate to="/" />
  }
  return (
    <Flex minH="100vh" overflow="hidden">
      <Box flex={1} >
        <Box flex={1}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default UserIndex
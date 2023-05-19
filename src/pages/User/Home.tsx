import { Box } from '@chakra-ui/react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import setTitle from '../../hooks/useSetTitle'

function UserHome() {
  setTitle("User Home - Esprit CRM");
  return (
    <>
      <Header />
      <Box minH="77vh">
        User Home
      </Box>
      <Footer />
    </>
  )
}

export default UserHome
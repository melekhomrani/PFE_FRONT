import { Box } from '@chakra-ui/react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

function UserHome() {
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
import { Box } from '@chakra-ui/react'
import React from 'react'
import ChangePassword from '../../components/ChangePassword'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useMe from '../../hooks/useMe'

function ChangePasswordUser() {
  const { isLoading, isSuccess, data } = useMe()
  return (
    <>
      <Header />
      {!isLoading && isSuccess && <ChangePassword isLoading={isLoading} user={data} />}
      <Box m="4" />
      <Footer />

    </>
  )
}

export default ChangePasswordUser
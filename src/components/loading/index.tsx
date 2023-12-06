import { Box, Center, Spinner } from '@chakra-ui/react'
import React from 'react'

export default function Loading() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Center style={{ marginTop: '30%' }}>
          <Spinner />
        </Center>
    </Box>
  )
}

import { Box, Center, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Metamask } from '../component/organisms/Metamask'
import { MintButton } from '../component/organisms/MintButton'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MINT Sandbox App</title>
        <meta name="description" content="Mint site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        backgroundImage={'https://source.unsplash.com/random'}
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Center>
          <VStack
            bg="rgba(0,0,0,0.3)"
            h="100vh"
            w="100vw"
            justifyContent="center"
          >
            <Metamask />
            <MintButton />
          </VStack>
        </Center>
      </Box>
    </>
  )
}

export default Home

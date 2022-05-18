import { Box, Center, Flex, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../component/layout/Header'

import { Metamask } from '../component/organisms/Metamask'
import { MintButton } from '../component/organisms/MintButton'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Oh! The Elephant!</title>
        <meta name="description" content="Oh! The Elephant! Mint site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Box
        backgroundImage={'https://source.unsplash.com/random'}
        backgroundPosition="center"
        backgroundSize="cover"
      > */}
      <Header />
      <Center>
        <Flex
          // bg="rgba(0,0,0,0.3)"
          bg="white"
          h="90vh"
          w="100vw"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box p="4">
            <Image
              src="/gif/1sec.gif"
              width={{ base: '300px', md: '370px' }}
              height={{ base: '250px', md: '320px' }}
              alt="gif"
            ></Image>
          </Box>
          <Flex
            m={{ base: '2', md: '8' }}
            bg="gray.300"
            width={{ base: '300px', md: '300px' }}
            borderRadius="xl"
            height={{ base: '240px', md: '300px' }}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Metamask />
            <MintButton />
          </Flex>
        </Flex>
      </Center>
    </>
  )
}

export default Home

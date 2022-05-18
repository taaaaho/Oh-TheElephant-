import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        <HStack
          // bg="rgba(0,0,0,0.3)"
          bg="white"
          h="90vh"
          w="100vw"
          justifyContent="center"
        >
          <Box p="4">
            <Image
              src="/gif/1sec.gif"
              width="370px"
              height="320px"
              alt="gif"
            ></Image>
          </Box>
          <Flex
            p="4"
            bg="gray.100"
            borderRadius="xl"
            height="380px"
            direction="column"
            justifyContent="space-around"
          >
            <Metamask />
            <MintButton />
          </Flex>
        </HStack>
      </Center>
      {/* </Box> */}
    </>
  )
}

export default Home

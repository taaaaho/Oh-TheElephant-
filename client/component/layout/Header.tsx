import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useContext } from 'react'
import { MetamaskContext } from '../../context/metamask'
import useMetamask from '../../hooks/useMetamask'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export const Header: React.FC = () => {
  const { network, account } = useContext(MetamaskContext)
  const { connectMetamask } = useMetamask()
  const handleConnectClick = async () => {
    await connectMetamask()
  }
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      top="0"
      py="2"
      px="6"
      justifyContent="space-between"
      bgColor="white"
    >
      <Box>
        <HStack flexDirection="row" alignItems="center">
          <Image
            src="/01.png"
            height="37px"
            width="32px"
            alt="oh! the elephant!"
          ></Image>
          <Text
            fontWeight="semibold"
            fontSize={{ base: 'md', md: 'xl' }}
            fontFamily="monospace"
          >
            Oh! The Elephant!
          </Text>
        </HStack>
      </Box>
      <Box
        bg="gray.800"
        borderRadius="xl"
        m="2"
        px="3"
        py="2"
        onClick={handleConnectClick}
      >
        <Text
          fontWeight="semibold"
          fontSize={{ base: 'sm', md: 'md' }}
          color="white"
        >
          {network ? (
            <HStack>
              <Text mr="4">
                {account &&
                  `${account.slice(0, 4)}...${account.slice(
                    account.length - 3,
                    account.length
                  )}`}
              </Text>
              <Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
            </HStack>
          ) : (
            'Connect Wallet'
          )}
        </Text>
      </Box>
    </Flex>
  )
}

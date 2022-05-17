import { Box, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { MetamaskContext } from '../../context/metamask'

declare var window: any

export const Metamask: React.FC = () => {
  // Metamask connect check
  const [metaMaskFlag, setMetaMaskFlag] = useState(false)
  const { account, network } = useContext(MetamaskContext)

  useEffect(() => {
    const tmpFlag = window.ethereum && window.ethereum.isMetaMask
    setMetaMaskFlag(tmpFlag)
  }, [])

  return (
    <Box>
      {metaMaskFlag ? (
        account ? (
          network ? (
            <Box textAlign="center">
              <Text color="white" fontWeight="semibold">
                This is {process.env.NETWORK} Testnet NFT mint page
              </Text>
              <Text color="white" fontWeight="semibold">
                You can receive NFT by free
              </Text>
              <Text color="white" fontWeight="semibold">
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
            </Box>
          ) : (
            <Box>
              <Text color="white" fontWeight="semibold">
                Please Change {process.env.NETWORK} Test Network
              </Text>
            </Box>
          )
        ) : (
          <Text color="white" fontWeight="semibold">
            Please connect metamask
          </Text>
        )
      ) : (
        <Text color="white" fontWeight="semibold">
          Install Metamask for NFT Mint
        </Text>
      )}
    </Box>
  )
}

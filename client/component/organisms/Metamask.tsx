import { Box, Text } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { MetamaskContext } from '../../context/metamask'

declare var window: any

export const Metamask: React.FC = () => {
  // Metamask connect check
  const [metaMaskFlag, setMetaMaskFlag] = useState(false)
  const { account, network, metamask } = useContext(MetamaskContext)

  const [totalSupply, setTotalSupply] = useState(0)
  const fetchTotalSupply = useCallback(async () => {
    const total = await metamask.contract?.totalSupply()
    if (total) {
      setTotalSupply(total.toNumber())
    }
  }, [metamask])

  useEffect(() => {
    if (metamask && metamask.provider && metamask.provider._network) {
      if (metamask.provider._network.name != process.env.NETWORK) {
        return
      }
      fetchTotalSupply()
    }
  }, [fetchTotalSupply, metamask, metamask.provider])

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
              <Text color="gray.800" fontWeight="semibold">
                {(process.env.NETWORK as string)[0].toUpperCase() +
                  (process.env.NETWORK as string).slice(1)}{' '}
                Testnet NFT
              </Text>
              <Text color="gray.800" fontWeight="semibold">
                You can receive NFT by free
              </Text>
              <Text color="gray.800" fontWeight="semibold">
                Remaining {network ? `${40 - totalSupply} / 40` : '- / -'}
              </Text>
              {/* <Text color="gray.800" fontWeight="semibold">
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text> */}
            </Box>
          ) : (
            <Box>
              <Text color="gray.800" fontWeight="semibold">
                Please Change {process.env.NETWORK} Test Network
              </Text>
            </Box>
          )
        ) : (
          <Text color="gray.800" fontWeight="semibold">
            Please connect metamask
          </Text>
        )
      ) : (
        <Text color="gray.800" fontWeight="semibold">
          Install Metamask for NFT Mint
        </Text>
      )}
    </Box>
  )
}

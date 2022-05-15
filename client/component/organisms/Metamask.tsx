import { Box, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

declare var window: any

export const Metamask: React.FC = () => {
  // Metamask connect check
  const [metaMaskFlag, setMetaMaskFlag] = useState(false)
  const [account, setAccount] = useState(null)
  const [network, setNetwork] = useState(false)

  useEffect(() => {
    const tmpFlag = window.ethereum && window.ethereum.isMetaMask
    setMetaMaskFlag(tmpFlag)

    connectMetamask()
  }, [])

  const connectMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const network = await provider.getNetwork()
    if (network.name === process.env.NETWORK) {
      setNetwork(true)
    } else {
      alert(
        `ネットワークを ${process.env.NETWORK} テストネットワークに切り替えてください`
      )
    }

    // for network change event
    provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })

    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])
    setAccount(accounts[0])
  }

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
                {account}
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

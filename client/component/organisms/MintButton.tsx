import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Button, Text, useToast, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { MetamaskContext } from '../../context/metamask'
import useMetamask, { Metamask } from '../../hooks/useMetamask'

declare var window: any

// eslint-disable-next-line react/display-name
export const MintButton: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)
  const [contract, setContract] = useState<ethers.Contract>()
  const toast = useToast()

  const { provider, network } = useContext(MetamaskContext)
  const { connectMetamask } = useMetamask()

  const handleMintClick = async () => {
    await mint()
  }
  const handleConnectClick = async () => {
    const metamask: Metamask = await connectMetamask()
    setContract(metamask.contract)

    if (metamask.provider._network.name != process.env.NETWORK) {
      return
    }
    const total = await metamask.contract?.totalSupply()
    setTotalSupply(total.toNumber())
  }

  const mint = async () => {
    setIsLoading(true)

    try {
      const res = await contract?.mint()
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (Object.keys(provider).length === 0) {
      return
    }

    // for network change event
    provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })

    // Listning Event
    const filters = contract?.filters['Minted']
    if (filters !== undefined) {
      provider.once('block', () => {
        contract?.on(filters(), (author: string) => {
          toast({
            title: 'Mint succeed',
            description: 'Check your NFT',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          setIsLoading(false)
        })
      })
    }
  }, [contract, provider, toast])

  return (
    <VStack>
      <Button
        colorScheme="purple"
        _focus={{ outline: 'none' }}
        onClick={network ? handleMintClick : handleConnectClick}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {network ? 'Mint' : 'Connect Metamast'}
      </Button>
      <Text color="white" fontWeight="semibold">
        Remaining {network ? `${40 - totalSupply} / 40` : '- / -'}
      </Text>
    </VStack>
  )
})

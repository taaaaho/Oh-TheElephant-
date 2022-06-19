import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { Button, Text, useToast, VStack } from '@chakra-ui/react'
import { MetamaskContext } from '../../context/metamask'
import useMetamask from '../../hooks/useMetamask'
import { ethers } from 'ethers'

declare var window: any

// eslint-disable-next-line react/display-name
export const MintButton: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  // const [totalSupply, setTotalSupply] = useState(0)
  const toast = useToast()

  const { network, metamask } = useContext(MetamaskContext)
  const { connectMetamask } = useMetamask()

  const handleMintClick = async () => {
    await mint()
  }
  const handleConnectClick = async () => {
    await connectMetamask()
  }

  const mint = async () => {
    setIsLoading(true)
    const options = { value: ethers.utils.parseEther('0.001') }
    console.log('mint start', metamask.contract)
    try {
      const res = await metamask.contract?.mint({
        value: ethers.utils.parseEther('0.001'),
      })
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
    }
  }

  // const fetchTotalSupply = useCallback(async () => {
  //   const total = await metamask.contract?.totalSupply()
  //   if (total) {
  //     setTotalSupply(total.toNumber())
  //   }
  // }, [metamask])

  // useEffect(() => {
  //   if (metamask && metamask.provider && metamask.provider._network) {
  //     if (metamask.provider._network.name != process.env.NETWORK) {
  //       return
  //     }
  //     fetchTotalSupply()
  //   }
  // }, [fetchTotalSupply, metamask, metamask.provider])

  useEffect(() => {
    if (
      !metamask ||
      Object.keys(metamask).length === 0 ||
      Object.keys(metamask.provider).length === 0
    ) {
      return
    }

    // for network change event
    metamask.provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })

    // Listning Event
    const filters = metamask.contract?.filters['Minted']
    if (filters !== undefined) {
      metamask.provider.once('block', () => {
        metamask.contract?.on(filters(), (author: string) => {
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
  }, [metamask, metamask.contract, metamask.provider, toast])

  return (
    <VStack>
      <Button
        colorScheme="black"
        _focus={{ outline: 'none' }}
        onClick={network ? handleMintClick : handleConnectClick}
        isLoading={isLoading}
        disabled={isLoading}
        isFullWidth
      >
        {network ? 'Mint' : 'Connect Metamast'}
      </Button>
      {/* <Text color="gray.800" fontWeight="semibold">
        Remaining {network ? `${40 - totalSupply} / 40` : '- / -'}
      </Text> */}
    </VStack>
  )
})

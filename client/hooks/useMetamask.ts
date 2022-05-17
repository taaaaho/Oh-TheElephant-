import { ethers } from 'ethers'
import { useContext, useState } from 'react'

import { MetamaskContext } from '../context/metamask'
import artifact from '../artifacts/NFT.json'

declare var window: any

export type Metamask = {
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner
  contract: ethers.Contract
}

const useMetamask = (): {
  connectMetamask: () => Promise<Metamask>
} => {
  const {
    account,
    setAccount,
    network,
    setNetwork,
    provider,
    setProvider,
    signer,
    setSigner,
  } = useContext(MetamaskContext)
  const connectMetamask = async (): Promise<Metamask> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    setProvider(provider)

    const signer = provider.getSigner()
    setSigner(signer)

    const contract = new ethers.Contract(
      process.env.MINT_CONTRACT as string,
      artifact.abi,
      signer
    )

    const network = await provider.getNetwork()
    if (network.name === process.env.NETWORK) {
      setNetwork(true)
    } else {
      alert(
        `ネットワークを ${process.env.NETWORK} テストネットワークに切り替えてください`
      )
    }

    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])
    setAccount(accounts[0])

    return { provider, signer, contract }
  }
  return { connectMetamask }
}

export default useMetamask

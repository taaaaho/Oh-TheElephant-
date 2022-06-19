import { ethers } from 'ethers'
import { useContext, useState } from 'react'

import { MetamaskContext } from '../context/metamask'
import artifact from '../artifacts/Sandbox1.json'

declare var window: any

export type Metamask = {
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner
  contract: ethers.Contract
}

const useMetamask = (): {
  connectMetamask: () => Promise<Metamask>
} => {
  const { account, setAccount, network, setNetwork, metamask, setMetamask } =
    useContext(MetamaskContext)
  const connectMetamask = async (): Promise<Metamask> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()
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

    setMetamask({ provider, signer, contract })
    return { provider, signer, contract }
  }
  return { connectMetamask }
}

export default useMetamask

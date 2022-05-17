import { ethers } from 'ethers'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

export type Context = {
  account: string
  setAccount: Dispatch<SetStateAction<string>>
  network: boolean
  setNetwork: Dispatch<SetStateAction<boolean>>
  provider: Web3Provider
  setProvider: Dispatch<SetStateAction<Web3Provider>>
  signer: JsonRpcSigner
  setSigner: Dispatch<SetStateAction<JsonRpcSigner>>
}

export const MetamaskContext = createContext({} as Context)

type Props = {
  children: ReactNode
}

declare var window: any

const MetamaskProvider: React.FC<Props> = (props) => {
  const [account, setAccount] = useState('')
  const [network, setNetwork] = useState(false)
  const [provider, setProvider] = useState<Web3Provider>({} as Web3Provider)
  const [signer, setSigner] = useState<JsonRpcSigner>({} as JsonRpcSigner)
  const { children } = props
  return (
    <MetamaskContext.Provider
      value={{
        account,
        setAccount,
        network,
        setNetwork,
        provider,
        setProvider,
        signer,
        setSigner,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}

export default MetamaskProvider

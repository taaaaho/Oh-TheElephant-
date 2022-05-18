import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { Metamask } from '../hooks/useMetamask'

export type Context = {
  account: string
  setAccount: Dispatch<SetStateAction<string>>
  network: boolean
  setNetwork: Dispatch<SetStateAction<boolean>>
  metamask: Metamask
  setMetamask: Dispatch<SetStateAction<Metamask>>
}

export const MetamaskContext = createContext({} as Context)

type Props = {
  children: ReactNode
}

declare var window: any

const MetamaskProvider: React.FC<Props> = (props) => {
  const [account, setAccount] = useState('')
  const [network, setNetwork] = useState(false)
  // const [provider, setProvider] = useState<Web3Provider>({} as Web3Provider)
  // const [signer, setSigner] = useState<JsonRpcSigner>({} as JsonRpcSigner)
  const [metamask, setMetamask] = useState<Metamask>({} as Metamask)
  const { children } = props
  return (
    <MetamaskContext.Provider
      value={{
        account,
        setAccount,
        network,
        setNetwork,
        // provider,
        // setProvider,
        // signer,
        // setSigner,
        metamask,
        setMetamask,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}

export default MetamaskProvider

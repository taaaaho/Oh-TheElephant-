import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import MetamaskProvider from '../context/metamask'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MetamaskProvider>
        <Component {...pageProps} />
      </MetamaskProvider>
    </ChakraProvider>
  )
}

export default MyApp

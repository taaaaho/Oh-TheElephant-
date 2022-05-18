import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import MetamaskProvider from '../context/metamask'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MetamaskProvider>
        <Component {...pageProps} />
      </MetamaskProvider>
    </ChakraProvider>
  )
}

export default MyApp

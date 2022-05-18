import { extendTheme } from '@chakra-ui/react'

const overrides = {
  colors: {
    black: {
      50: '#111',
      100: '#111',
      200: '#111',
      300: '#111',
      400: '#111',
      500: '#111',
      600: '#111',
      700: '#111',
      800: '#111',
      900: '#111',
    },
    white: {
      500: '#FFF',
    },
  },
  fontSizes: {
    xxs: '0.625rem',
  },
}

export default extendTheme(overrides)

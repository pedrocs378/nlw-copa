import { extendTheme } from 'native-base'

import * as components from './components'

export const theme = extendTheme({
  colors: {
    gray: {
      900: '#09090A',
      800: '#121214',
      700: '#202024',
      600: '#323238',
      300: '#8D8D99',
      200: '#C4C4CC',
      100: '#e1e1e6',
    },
    green: {
      50: '#20ff8f',
      100: '#00f77b',
      200: '#00cf68',
      300: '#05a254',
      400: '#047c3f',
      500: '#066234',
      600: '#074928',
      700: '#066234',
      800: '#051c11',
      900: '#020805',
    },
    yellow: {
      400: '#F7DD43',
      700: '#BBA317',
    },
    red: {
      50: '#fabeb8',
      100: '#f49e97',
      200: '#ec8177',
      300: '#e1665a',
      400: '#db4437',
      500: '#cd3c2f',
      600: '#b33c31',
      700: '#9b3b32',
      800: '#833932',
      900: '#6e3530',
    },
    white: '#FFFFFF',
  },
  fontConfig: {
    Roboto: {
      400: {
        normal: 'Roboto_400Regular',
      },
      500: {
        normal: 'Roboto_500Medium',
      },
      700: {
        normal: 'Roboto_700Bold',
      },
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    medium: 'Roboto',
  },
  components,
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56,
  },
})

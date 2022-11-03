import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { IntlProvider } from 'react-intl'
import { Box, NativeBaseProvider, StatusBar } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { AuthProvider } from './src/contexts/auth-context'

import { Routes } from './src/routes/routes'

import { theme } from './src/styles/theme'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-displaynames/polyfill'
import '@formatjs/intl-displaynames/locale-data/pt'

const fonts = {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
}

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts(fonts)

  const handleRootLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex="1" onLayout={handleRootLayout}>
        <StatusBar
          animated
          barStyle="default"
          backgroundColor="transparent"
          translucent
        />

        <IntlProvider locale="pt-BR">
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </IntlProvider>
      </Box>
    </NativeBaseProvider>
  )
}

import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { Box, NativeBaseProvider, StatusBar } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { SignIn } from './src/screens/sign-in'

import { theme } from './src/styles/theme'

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

        <SignIn />
      </Box>
    </NativeBaseProvider>
  )
}

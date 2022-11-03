import { NavigationContainer } from '@react-navigation/native'
import { Center, Spinner } from 'native-base'

import { useAuth } from '../contexts/auth-context'

import { SignIn } from '../screens/sign-in'

import { AppRoutes } from './app.routes'

export function Routes() {
  const { user, isAppLoading } = useAuth()

  const isAuthenticated = !!user

  if (isAppLoading) {
    return (
      <Center bg="gray.800" flex="1">
        <Spinner color="yellow.400" size="lg" />
      </Center>
    )
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}

import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../contexts/auth-context'

import { SignIn } from '../screens/sign-in'

import { AppRoutes } from './app.routes'

export function Routes() {
  const { user } = useAuth()

  const isAuthenticated = !!user

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}

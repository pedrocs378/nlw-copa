import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

import { api } from '../lib/axios'

WebBrowser.maybeCompleteAuthSession()

type User = {
  name: string
  avatarUrl: string
}

type AuthContextData = {
  user: User | undefined
  isUserLoading: boolean
  isAppLoading: boolean

  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type UserResponseData = {
  user: {
    name: string
    avatarUrl: string
    sub: string
  }
}

type AuthProviderProps = React.PropsWithChildren

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<User>()

  const [, , prompAsync] = Google.useAuthRequest({
    clientId:
      '592360545546-cjf8n837kooit03skkdka6eduqg4eoq8.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  async function signInWithGoogle(accessToken: string) {
    const authResponse = await api.post('/users', {
      access_token: accessToken,
    })

    const token = authResponse.data.token

    await AsyncStorage.setItem('@nlwcopa:token', token)

    const userResponse = await api.get<UserResponseData>('/me')

    const loggedUser = userResponse.data.user

    setUser(loggedUser)
  }

  const signIn = useCallback(async () => {
    try {
      setIsUserLoading(true)

      const result = await prompAsync()

      if (result.type === 'success') {
        await signInWithGoogle(result.authentication.accessToken)

        setUser({
          name: 'Pedro Cesar',
          avatarUrl: 'https://github.com/pedrocs378.png',
        })
      }
    } catch (error) {
      console.log(error)

      throw error
    } finally {
      setIsUserLoading(false)
    }
  }, [prompAsync])

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@nlwcopa:token')

    setUser(undefined)
  }, [])

  useEffect(() => {
    async function checkLoggedUser() {
      try {
        setIsAppLoading(true)

        const token = await AsyncStorage.getItem('@nlwcopa:token')

        if (token) {
          const response = await api.get<UserResponseData>('/me')

          setUser(response.data.user)
        }
      } finally {
        setIsAppLoading(false)
      }
    }

    checkLoggedUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isUserLoading, isAppLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

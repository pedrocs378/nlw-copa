import { createContext, useCallback, useContext, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

type User = {
  name: string
  avatarUrl: string
}

type AuthContextData = {
  user: User | undefined
  isUserLoading: boolean

  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = React.PropsWithChildren

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<User>()

  const [, , prompAsync] = Google.useAuthRequest({
    clientId:
      '592360545546-cjf8n837kooit03skkdka6eduqg4eoq8.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  async function signInWithGoogle(accessToken: string) {
    console.log(
      '🚀 ~ file: auth-context.tsx ~ line 44 ~ signInWithGoogle ~ accessToken',
      accessToken,
    )
    // TODO
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
    setUser(undefined)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isUserLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

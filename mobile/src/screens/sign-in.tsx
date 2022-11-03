import { Button, Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import { useAuth } from '../contexts/auth-context'

import Logo from '../assets/logo.svg'

export function SignIn() {
  const { isUserLoading, signIn } = useAuth()

  async function handleSignIn() {
    await signIn()
  }

  return (
    <Center flex="1" px="7" bg="gray.800">
      <Logo width={212} height={40} />

      <Button
        colorScheme="red"
        leftIcon={<Icon as={Fontisto} name="google" />}
        mt="12"
        isLoading={isUserLoading}
        onPress={handleSignIn}
      >
        Entrar com google
      </Button>

      <Text mt="4" textAlign="center">
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua
        conta.
      </Text>
    </Center>
  )
}

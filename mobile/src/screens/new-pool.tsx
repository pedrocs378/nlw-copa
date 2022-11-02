import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Heading, Input, Text } from 'native-base'

import { Background } from '../components'

import Logo from '../assets/logo.svg'

export function NewPool() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background title="Criar novo bolão" alignItems="center">
        <Logo />

        <Heading textAlign="center" mt="8">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input placeholder="Qual nome do seu bolão?" mt="8" />

        <Button mt="2">Criar meu bolão</Button>

        <Text textAlign="center" mt="4">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </Background>
    </TouchableWithoutFeedback>
  )
}

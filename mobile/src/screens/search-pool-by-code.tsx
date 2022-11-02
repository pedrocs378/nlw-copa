import { useNavigation } from '@react-navigation/native'
import { Button, Heading, Input } from 'native-base'

import { Background } from '../components'

export function SearchPoolByCode() {
  const navigation = useNavigation()

  return (
    <Background title="Buscar por código" onBack={navigation.goBack}>
      <Heading textAlign="center">
        Encontrue um bolão através de seu código único
      </Heading>

      <Input mt="8" placeholder="Qual o código do bolão?" />

      <Button mt="2">Buscar bolão</Button>
    </Background>
  )
}

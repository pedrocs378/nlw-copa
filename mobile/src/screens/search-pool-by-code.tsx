import { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { Button, Heading, Input, useToast } from 'native-base'

import { api } from '../lib/axios'

import { Background } from '../components'

export function SearchPoolByCode() {
  const [isJoining, setIsJoining] = useState(false)
  const [code, setCode] = useState('')

  const navigation = useNavigation()
  const toast = useToast()

  async function handleJoinOnPool() {
    if (!code.trim()) {
      return toast.show({
        title: 'Informe um código para buscar o bolão',
        duration: 5000,
        bg: 'red.400',
        placement: 'top',
      })
    }

    try {
      setIsJoining(true)

      await api.post('/pools/join', {
        code,
      })

      toast.show({
        title: 'Agora você está participando deste bolão.',
        duration: 5000,
        placement: 'top',
        bg: 'green.400',
      })

      navigation.goBack()
    } catch (error) {
      setIsJoining(false)

      if (error instanceof AxiosError) {
        const message = error.response.data.message

        toast.show({
          title: message ?? 'Não foi possivel se juntar a esse bolão',
          duration: 5000,
          placement: 'top',
          bg: 'red.400',
        })
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background title="Buscar por código" onBack={navigation.goBack}>
        <Heading textAlign="center">
          Encontrue um bolão através de seu código único
        </Heading>

        <Input
          mt="8"
          autoCapitalize="characters"
          maxLength={6}
          placeholder="Qual o código do bolão?"
          returnKeyType="send"
          value={code}
          onChangeText={setCode}
          onSubmitEditing={handleJoinOnPool}
        />

        <Button mt="2" isLoading={isJoining} onPress={handleJoinOnPool}>
          Buscar bolão
        </Button>
      </Background>
    </TouchableWithoutFeedback>
  )
}

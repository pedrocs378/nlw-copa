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
    if (!code) return

    try {
      setIsJoining(true)

      await api.post('/pools/join', {
        code,
      })

      toast.show({
        title:
          'Agora você está participando deste bolão. Vá para a aba "Meus bolões para visualizar"',
        duration: 5000,
        placement: 'top',
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response.data.message

        toast.show({
          title: message ?? 'Não foi possivel se juntar a esse bolão',
          duration: 5000,
          placement: 'top',
        })
      }
    } finally {
      setIsJoining(false)
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

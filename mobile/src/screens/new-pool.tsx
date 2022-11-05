import { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { AxiosError } from 'axios'
import { Button, Heading, Input, Text, useToast } from 'native-base'

import { api } from '../lib/axios'

import { Background } from '../components'

import Logo from '../assets/logo.svg'

export function NewPool() {
  const [isSubmitingPool, setIsSubmitingPool] = useState(false)
  const [poolName, setPoolName] = useState('')

  const toast = useToast()

  async function handleCreatePool() {
    if (!poolName.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        bg: 'red.400',
        duration: 5000,
        placement: 'top',
      })
    }

    try {
      setIsSubmitingPool(true)

      const response = await api.post('/pools', {
        title: poolName,
      })

      const code: string = response.data.code

      await Clipboard.setStringAsync(code)

      setPoolName('')

      Keyboard.dismiss()

      toast.show({
        title: `Bolão criado e o código "${code}" foi copiado para sua área de transferência`,
        bg: 'green.400',
        duration: 5000,
        placement: 'top',
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message: string | undefined = error.response.data.message

        toast.show({
          title: message ?? 'Não foi possivel criar o bolão',
          bg: 'red.400',
          duration: 5000,
          placement: 'top',
        })
      }
    } finally {
      setIsSubmitingPool(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background title="Criar novo bolão" alignItems="center">
        <Logo />

        <Heading textAlign="center" mt="8">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          placeholder="Qual nome do seu bolão?"
          mt="8"
          returnKeyType="send"
          value={poolName}
          onChangeText={setPoolName}
          onSubmitEditing={handleCreatePool}
        />

        <Button mt="2" isLoading={isSubmitingPool} onPress={handleCreatePool}>
          Criar meu bolão
        </Button>

        <Text textAlign="center" mt="4">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </Background>
    </TouchableWithoutFeedback>
  )
}

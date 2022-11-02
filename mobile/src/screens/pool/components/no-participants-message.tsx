import { Text } from 'native-base'

export function NoParticipantsMessage() {
  return (
    <Text textAlign="center" lineHeight="xl">
      Esse bolão ainda não tem participantes, que tal{' '}
      <Text color="yellow.400" textDecorationLine="underline">
        compartilhar o código
      </Text>{' '}
      do bolão com alguém? Use o código <Text bold>JP3640</Text>
    </Text>
  )
}

import { Text } from 'native-base'

type NoParticipantsMessageProps = {
  code: string
}

export function NoParticipantsMessage({ code }: NoParticipantsMessageProps) {
  return (
    <Text textAlign="center" lineHeight="xl">
      Esse bolão ainda não tem participantes, que tal{' '}
      <Text color="yellow.400" textDecorationLine="underline">
        compartilhar o código
      </Text>{' '}
      do bolão com alguém? Use o código <Text bold>{code}</Text>
    </Text>
  )
}

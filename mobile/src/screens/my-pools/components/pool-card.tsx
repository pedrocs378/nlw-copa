import { useCallback } from 'react'
import { Avatar, Box, Heading, Text } from 'native-base'

import { CardPressable } from '../../../components'

type PoolCardProps = {
  onPress?: () => void
  pool: {
    title: string
    ownerName: string
    participants: API.Participant[]
  }
}

export function PoolCard({ pool, onPress }: PoolCardProps) {
  const getNameInitials = useCallback((name: string) => {
    const splittedName = name.split(' ')

    if (splittedName.length > 1) {
      const firstName = splittedName[0].toUpperCase()
      const secondName = splittedName[1].toUpperCase()

      return `${firstName[0]}${secondName[0]}`
    } else if (splittedName.length === 1) {
      const firstName = splittedName[0].toUpperCase()

      return `${firstName[0]}${firstName[1]}`
    } else {
      return '--'
    }
  }, [])

  return (
    <CardPressable justify="space-between" mb="3" onPress={onPress}>
      <Box>
        <Heading lineHeight="xl" fontSize="md">
          {pool.title}
        </Heading>
        <Text lineHeight="xl" fontSize="xs">
          Criado por {pool.ownerName}
        </Text>
      </Box>

      <Avatar.Group max={4}>
        {pool.participants.map((participant) => {
          return (
            <Avatar
              key={participant.id}
              source={{ uri: participant.user.avatarUrl }}
            >
              {getNameInitials(participant.user.name)}
            </Avatar>
          )
        })}
      </Avatar.Group>
    </CardPressable>
  )
}

import { Avatar, Box, Heading, Text } from 'native-base'

import { CardPressable } from '../../../components'

type PoolCardProps = {
  onPress?: () => void
}

export function PoolCard({ onPress }: PoolCardProps) {
  return (
    <CardPressable justify="space-between" onPress={onPress}>
      <Box>
        <Heading lineHeight="xl" fontSize="md">
          Bolao do Pedrao
        </Heading>
        <Text lineHeight="xl" fontSize="xs">
          Criado por Pedro César
        </Text>
      </Box>

      <Avatar.Group max={4}>
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }}>
          PC
        </Avatar>
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }}>
          PC
        </Avatar>
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }}>
          PC
        </Avatar>
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }}>
          PC
        </Avatar>
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }}>
          PC
        </Avatar>
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }}>
          PC
        </Avatar>
      </Avatar.Group>
    </CardPressable>
  )
}

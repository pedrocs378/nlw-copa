import { Avatar, Box, Flex, Heading, Text } from 'native-base'

type PoolHeaderProps = {
  poolTitle: string
  code: string
  poolOwner: string
  participants: API.Participant[]
}

export function PoolHeader({ poolTitle, code, participants }: PoolHeaderProps) {
  return (
    <Flex flexDir="row" align="center" justify="space-between">
      <Box>
        <Heading lineHeight="xl" fontSize="lg">
          {poolTitle}
        </Heading>

        <Text lineHeight="xl" fontSize="xs">
          Código: <Text bold>{code}</Text>
        </Text>
        {/* <Text lineHeight="xl" fontSize="xs">
          Criado por {poolOwner}
        </Text> */}
      </Box>

      <Avatar.Group max={4} space={-2} _avatar={{ size: 'sm' }}>
        {participants.map((participant) => {
          return (
            <Avatar
              key={participant.id}
              source={{ uri: participant.user.avatarUrl }}
            >
              PC
            </Avatar>
          )
        })}
      </Avatar.Group>
    </Flex>
  )
}

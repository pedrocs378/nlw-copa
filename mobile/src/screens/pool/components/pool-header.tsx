import { Avatar, Box, Flex, Heading, Text } from 'native-base'

export function PoolHeader() {
  return (
    <Flex flexDir="row" align="center" justify="space-between">
      <Box>
        <Heading lineHeight="xl" fontSize="lg">
          Bolao do Pedrao
        </Heading>
        <Text lineHeight="xl" fontSize="xs">
          Criado por Pedro Cesar
        </Text>
      </Box>

      <Avatar.Group max={4} space={-2} _avatar={{ size: 'sm' }}>
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
    </Flex>
  )
}

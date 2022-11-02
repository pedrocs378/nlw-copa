import { Avatar, Badge, Box, Heading, HStack, Text } from 'native-base'

import { CardPressable } from '../../../components'

export function RankingCard() {
  return (
    <CardPressable justify="space-between">
      <HStack space="3" alignItems="center">
        <Avatar source={{ uri: 'https://github.com/pedrocs378.png' }} size="md">
          PC
        </Avatar>

        <Box>
          <HStack space="1" alignItems="center">
            <Heading fontSize="md">Pedro César</Heading>

            <Text fontSize="xs">(você)</Text>
          </HStack>

          <Text>36 ponto(s)</Text>
        </Box>
      </HStack>

      <Badge colorScheme="yellow" rounded="full" variant="solid">
        1º
      </Badge>
    </CardPressable>
  )
}

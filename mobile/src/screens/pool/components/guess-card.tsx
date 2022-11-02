import { Feather } from '@expo/vector-icons'
import { Flex, Heading, HStack, Icon, Input, Text } from 'native-base'

import { Flag, CardPressable } from '../../../components'

export function GuessCard() {
  return (
    <CardPressable flexDir="column">
      <Heading fontSize="sm">Brasil Vs. Argentina</Heading>

      <Text fontSize="xs">22 de Novembro de 2022 às 16:00h</Text>

      <Flex
        mt="4"
        flexDir="row"
        w="full"
        align="center"
        justify="space-between"
      >
        <HStack space="3" alignItems="center">
          <Input
            w="9"
            px="3"
            size="sm"
            variant="filled"
            keyboardType="number-pad"
            maxLength={2}
          />

          <Flag source={{ uri: 'https://github.com/pedrocs378.png' }} />
        </HStack>

        <Icon as={Feather} name="x" size="lg" />

        <HStack space="3" alignItems="center">
          <Flag source={{ uri: 'https://github.com/pedrocs378.png' }} />

          <Input
            w="9"
            px="3"
            size="sm"
            variant="filled"
            keyboardType="number-pad"
            maxLength={2}
          />
        </HStack>
      </Flex>
    </CardPressable>
  )
}

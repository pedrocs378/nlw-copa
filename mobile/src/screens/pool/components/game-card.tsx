import { FormattedDisplayName } from 'react-intl'
import { Feather } from '@expo/vector-icons'
import CountryFlag from 'react-native-country-flag'
import { Button, Flex, Heading, HStack, Icon, Input, Text } from 'native-base'

import { CardPressable } from '../../../components'

type Guess = {
  firstTeamPoints: number
  secondTeamPoints: number
}

type GameCardProps = {
  date: string
  hasFinished?: boolean
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guess: Guess | null
}

export function GameCard({
  date,
  hasFinished = false,
  firstTeamCountryCode,
  secondTeamCountryCode,
  guess,
}: GameCardProps) {
  return (
    <CardPressable flexDir="column" mb="3">
      <Heading fontSize="sm">
        <FormattedDisplayName type="region" value={firstTeamCountryCode} /> Vs.{' '}
        <FormattedDisplayName type="region" value={secondTeamCountryCode} />
      </Heading>

      <Text fontSize="xs">{date}</Text>

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
            defaultValue="0"
            isReadOnly={!!guess}
          />

          <CountryFlag isoCode={firstTeamCountryCode} size={24} />
        </HStack>

        <Icon as={Feather} name="x" size="lg" />

        <HStack space="3" alignItems="center">
          <CountryFlag isoCode={secondTeamCountryCode} size={24} />

          <Input
            w="9"
            px="3"
            size="sm"
            variant="filled"
            keyboardType="number-pad"
            maxLength={2}
            defaultValue="0"
            isReadOnly={!!guess}
          />
        </HStack>
      </Flex>

      {!guess && (
        <Button
          mt="4"
          size="sm"
          colorScheme={hasFinished ? 'gray' : 'green'}
          isDisabled={hasFinished}
          rightIcon={!hasFinished && <Icon as={Feather} name="check" />}
        >
          {hasFinished ? 'Tempo esgotado' : 'Confirmar palpite'}
        </Button>
      )}
    </CardPressable>
  )
}

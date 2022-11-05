import { useEffect, useState } from 'react'
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
  isLoading?: boolean
  onConfirmGuess?: (firstTeamPoints: number, secondTeamPoints: number) => void
}

export function GameCard({
  date,
  hasFinished = false,
  firstTeamCountryCode,
  secondTeamCountryCode,
  guess,
  isLoading = false,
  onConfirmGuess,
}: GameCardProps) {
  const [firstTeamPoints, setFirstTeamPoints] = useState(0)
  const [secondTeamPoints, setSecondTeamPoints] = useState(0)

  useEffect(() => {
    if (guess) {
      setFirstTeamPoints(guess.firstTeamPoints)
      setSecondTeamPoints(guess.secondTeamPoints)
    }
  }, [guess])

  return (
    <CardPressable flexDir="column" mb="3">
      <Heading fontSize="sm">
        <FormattedDisplayName type="region" value={firstTeamCountryCode} /> vs.{' '}
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
            px="2"
            size="sm"
            variant="filled"
            keyboardType="number-pad"
            returnKeyType="next"
            maxLength={2}
            isReadOnly={!!guess}
            value={String(firstTeamPoints)}
            onChangeText={(value) => setFirstTeamPoints(Number(value))}
          />

          <CountryFlag isoCode={firstTeamCountryCode} size={24} />
        </HStack>

        <Icon as={Feather} name="x" size="lg" />

        <HStack space="3" alignItems="center">
          <CountryFlag isoCode={secondTeamCountryCode} size={24} />

          <Input
            w="9"
            px="2"
            size="sm"
            variant="filled"
            keyboardType="numeric"
            returnKeyType="send"
            maxLength={2}
            isReadOnly={!!guess}
            value={String(secondTeamPoints)}
            onChangeText={(value) => setSecondTeamPoints(Number(value))}
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
          isLoading={isLoading}
          onPress={() => onConfirmGuess?.(firstTeamPoints, secondTeamPoints)}
        >
          {hasFinished ? 'Tempo esgotado' : 'Confirmar palpite'}
        </Button>
      )}
    </CardPressable>
  )
}

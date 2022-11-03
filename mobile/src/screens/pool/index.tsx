import { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import {
  Button,
  Divider,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from 'native-base'

import { Background } from '../../components'

import { PoolHeader } from './components/pool-header'
import { RankingCard } from './components/ranking-card'
import { NoParticipantsMessage } from './components/no-participants-message'
import { GuessCard } from './components/guess-card'
import { TabButton } from './components/tab-button'

type PoolTab = 'guesses' | 'ranking'

export function Pool() {
  const [poolTab, setPoolTab] = useState<PoolTab>('guesses')

  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background
        title="Bolao do Pedrao"
        onBack={navigation.goBack}
        RightButtonElement={
          <IconButton icon={<Icon as={Octicons} name="share" />} />
        }
      >
        <ScrollView>
          <PoolHeader />

          <Divider my="4" />

          <NoParticipantsMessage />

          <Button.Group bg="gray.700" p="1" rounded="sm">
            <TabButton
              isActive={poolTab === 'guesses'}
              onPress={() => setPoolTab('guesses')}
            >
              Seus palpites
            </TabButton>
            <TabButton
              isActive={poolTab === 'ranking'}
              onPress={() => setPoolTab('ranking')}
            >
              Ranking do grupo
            </TabButton>
          </Button.Group>

          {poolTab === 'guesses' && (
            <VStack mt="4" space="3">
              <GuessCard />
              <GuessCard />
              <GuessCard />
            </VStack>
          )}

          {poolTab === 'ranking' && (
            <VStack mt="4" space="3">
              <Text textAlign="center">
                O ranking desse bolão ainda não foi formado, aguarde os
                resultados
              </Text>

              <RankingCard />
              <RankingCard />
              <RankingCard />
            </VStack>
          )}
        </ScrollView>
      </Background>
    </TouchableWithoutFeedback>
  )
}

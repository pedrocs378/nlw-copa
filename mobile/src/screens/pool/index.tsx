import { useEffect, useState } from 'react'
import {
  Keyboard,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import {
  Button,
  Divider,
  FlatList,
  Icon,
  IconButton,
  Text,
  useToast,
  VStack,
} from 'native-base'

import { api } from '../../lib/axios'

import { Background, Loader } from '../../components'

import { PoolHeader } from './components/pool-header'
import { RankingCard } from './components/ranking-card'
import { NoParticipantsMessage } from './components/no-participants-message'
import { GameCard } from './components/game-card'
import { TabButton } from './components/tab-button'

type PoolTab = 'guesses' | 'ranking'

type Participant = {
  id: string
  user: {
    name: string
    avatarUrl: string
  }
}

type PoolData = {
  id: string
  code: string
  title: string
  participants: Participant[]
  owner: {
    name: string
  }
}

type Guess = {
  id: string
  firstTeamPoints: number
  secondTeamPoints: number
}

type GameData = {
  id: string
  date: string
  formattedDate: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guess: Guess | null
}

type PoolResponse = {
  pool: PoolData
}

type GamesResponse = {
  games: GameData[]
}

type PoolProps = MyPoolsScreenProps<'pool'>

export function Pool({ route }: PoolProps) {
  const { poolId } = route.params

  const [poolTab, setPoolTab] = useState<PoolTab>('guesses')

  const [isLoadingPoolAndGames, setIsLoadingPoolAndGames] = useState(false)
  const [pool, setPool] = useState<PoolData>()
  const [games, setGames] = useState<GameData[]>([])

  const toast = useToast()
  const navigation = useNavigation()

  async function handleCopyCode() {
    if (!pool) return

    await Clipboard.setStringAsync(pool.code)

    toast.show({
      title: `${pool.code} foi copiado para sua área de transferência`,
      duration: 5000,
    })
  }

  function renderGameItem({ item }: ListRenderItemInfo<GameData>) {
    return (
      <GameCard
        date={item.formattedDate}
        hasFinished={new Date() > new Date(item.date)}
        firstTeamCountryCode={item.firstTeamCountryCode}
        secondTeamCountryCode={item.secondTeamCountryCode}
        guess={item.guess}
      />
    )
  }

  useEffect(() => {
    async function loadPoolAndGames() {
      try {
        setIsLoadingPoolAndGames(true)

        const [poolResponse, gamesResponse] = await Promise.all([
          api.get<PoolResponse>(`/pools/${poolId}`),
          api.get<GamesResponse>(`/pools/${poolId}/games`),
        ])

        const dateFormat = new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: '2-digit',
        }).format

        const hourFormat = new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }).format

        const gamesData = gamesResponse.data.games.map((game) => {
          const date = new Date(game.date)

          const formattedDate = `${dateFormat(date)} às ${hourFormat(date)}h`

          return { ...game, formattedDate }
        })

        setPool(poolResponse.data.pool)
        setGames(gamesData)
      } finally {
        setIsLoadingPoolAndGames(false)
      }
    }

    loadPoolAndGames()
  }, [poolId])

  return isLoadingPoolAndGames ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {pool ? (
        <Background
          title={pool.title}
          onBack={navigation.goBack}
          RightButtonElement={
            <IconButton
              onPress={handleCopyCode}
              icon={<Icon as={Octicons} name="share" pl="0.5" />}
            />
          }
        >
          <PoolHeader
            poolTitle={pool.title}
            poolOwner={pool.owner.name}
            participants={pool.participants}
          />

          <Divider my="4" />

          {pool.participants.length === 0 && <NoParticipantsMessage />}

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
            <FlatList
              mt="4"
              data={games}
              keyExtractor={(game) => game.id}
              renderItem={renderGameItem}
            />
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
        </Background>
      ) : (
        <></>
      )}
    </TouchableWithoutFeedback>
  )
}

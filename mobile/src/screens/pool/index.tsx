import { useCallback, useEffect, useState } from 'react'
import {
  Keyboard,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { Button, Divider, FlatList, Text, useToast, VStack } from 'native-base'

import { api } from '../../lib/axios'

import { Background, Loader } from '../../components'

import {
  PoolHeader,
  RankingCard,
  NoParticipantsMessage,
  GameCard,
  TabButton,
  ShareCode,
} from './components'

type PoolTab = 'guesses' | 'ranking'

type PoolResponse = {
  pool: API.Pool
}

type GamesResponse = {
  games: API.Game[]
}

type PoolProps = MyPoolsScreenProps<'pool'>

export function Pool({ route }: PoolProps) {
  const { poolId } = route.params

  const [poolTab, setPoolTab] = useState<PoolTab>('guesses')

  const [isLoadingPoolAndGames, setIsLoadingPoolAndGames] = useState(false)
  const [pool, setPool] = useState<API.Pool>()
  const [games, setGames] = useState<API.Game[]>([])

  const [isGameIdLoading, setIsGameIdLoading] = useState('')

  const toast = useToast()
  const navigation = useNavigation()

  const loadPool = useCallback(async () => {
    const response = await api.get<PoolResponse>(`/pools/${poolId}`)

    setPool(response.data.pool)
  }, [poolId])

  const loadGames = useCallback(async () => {
    const response = await api.get<GamesResponse>(`/pools/${poolId}/games`)

    const dateFormat = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: '2-digit',
    }).format

    const hourFormat = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format

    const gamesData = response.data.games.map((game) => {
      const date = new Date(game.date)

      const formattedDate = `${dateFormat(date)} às ${hourFormat(date)}h`

      return { ...game, formattedDate }
    })

    setGames(gamesData)
  }, [poolId])

  const handleCreateGuess = useCallback(
    async (
      gameId: string,
      firstTeamPoints: number,
      secondTeamPoints: number,
    ) => {
      try {
        setIsGameIdLoading(gameId)

        await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
          firstTeamPoints,
          secondTeamPoints,
        })

        await loadGames()

        toast.show({
          title: 'Palpite enviado',
          duration: 5000,
          placement: 'top',
          bg: 'green.400',
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response.data.message

          toast.show({
            title: message ?? 'Não foi possivel enviar este palpite',
            duration: 5000,
            placement: 'top',
            bg: 'red.400',
          })
        }
      } finally {
        setIsGameIdLoading('')
      }
    },
    [poolId, toast, loadGames],
  )

  function renderGameItem({ item }: ListRenderItemInfo<API.Game>) {
    return (
      <GameCard
        date={item.formattedDate}
        hasFinished={new Date() > new Date(item.date)}
        firstTeamCountryCode={item.firstTeamCountryCode}
        secondTeamCountryCode={item.secondTeamCountryCode}
        guess={item.guess}
        isLoading={isGameIdLoading === item.id}
        onConfirmGuess={(firstTeamPoints, secondTeamPoints) =>
          handleCreateGuess(item.id, firstTeamPoints, secondTeamPoints)
        }
      />
    )
  }

  useEffect(() => {
    async function loadPoolAndGames() {
      try {
        setIsLoadingPoolAndGames(true)

        await Promise.all([loadPool(), loadGames()])
      } finally {
        setIsLoadingPoolAndGames(false)
      }
    }

    loadPoolAndGames()
  }, [loadPool, loadGames])

  return isLoadingPoolAndGames ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {pool ? (
        <Background
          title={pool.title}
          onBack={navigation.goBack}
          RightButtonElement={<ShareCode code={pool.code} />}
        >
          {pool.participants.length > 0 ? (
            <>
              <PoolHeader
                poolTitle={pool.title}
                code={pool.code}
                poolOwner={pool.owner.name}
                participants={pool.participants}
              />

              <Divider my="4" />

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
            </>
          ) : (
            <NoParticipantsMessage code={pool.code} />
          )}
        </Background>
      ) : (
        <></>
      )}
    </TouchableWithoutFeedback>
  )
}

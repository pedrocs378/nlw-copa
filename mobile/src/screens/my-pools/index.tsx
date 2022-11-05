import { useCallback, useEffect, useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Button, Divider, FlatList, Icon } from 'native-base'

import { api } from '../../lib/axios'

import { Background, Loader } from '../../components'

import { EmptyPools } from './components/empty-pools'
import { PoolCard } from './components/pool-card'

type PoolsResponse = {
  pools: API.Pool[]
}

export function MyPools() {
  const [isLoadingPools, setIsLoadingPools] = useState(false)
  const [pools, setPools] = useState<API.Pool[]>([])

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  function handleNavigateToSearchPool() {
    navigation.navigate('myPoolsStack', {
      screen: 'searchPoolByCode',
    })
  }

  const handleNavigateToPool = useCallback(
    (poolId: string) => {
      navigation.navigate('myPoolsStack', {
        screen: 'pool',
        params: {
          poolId,
        },
      })
    },
    [navigation],
  )

  function renderPoolItem({ item }: ListRenderItemInfo<API.Pool>) {
    return (
      <PoolCard
        onPress={() => handleNavigateToPool(item.id)}
        pool={{
          title: item.title,
          ownerName: item.owner.name,
          participants: item.participants,
        }}
      />
    )
  }

  useEffect(() => {
    async function loadPools() {
      try {
        setIsLoadingPools(true)

        const response = await api.get<PoolsResponse>('/pools')

        setPools(response.data.pools)
      } finally {
        setIsLoadingPools(false)
      }
    }

    if (isFocused) {
      loadPools()
    }
  }, [isFocused])

  return (
    <Background title="Meus bolões">
      <Button
        leftIcon={<Icon as={Feather} name="search" />}
        onPress={handleNavigateToSearchPool}
      >
        Buscar bolão por código
      </Button>

      <Divider my="4" />

      {isLoadingPools ? (
        <Loader />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(pool) => pool.id}
          renderItem={renderPoolItem}
          ListEmptyComponent={<EmptyPools />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Background>
  )
}

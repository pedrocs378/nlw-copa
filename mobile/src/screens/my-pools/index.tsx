import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Button, Divider, Icon, VStack } from 'native-base'

import { Background } from '../../components'

import { EmptyPools } from './components/empty-pools'
import { PoolCard } from './components/pool-card'

export function MyPools() {
  const navigation = useNavigation()

  function handleNavigateToSearchPool() {
    navigation.navigate('searchPoolByCode')
  }

  const handleNavigateToPool = useCallback(
    (poolId: string) => {
      console.log(poolId)
      navigation.navigate('pool')
    },
    [navigation],
  )

  return (
    <Background title="Meus bolões">
      <Button
        leftIcon={<Icon as={Feather} name="search" />}
        onPress={handleNavigateToSearchPool}
      >
        Buscar bolão por código
      </Button>

      <Divider my="4" />

      <EmptyPools />

      <VStack space="3">
        <PoolCard onPress={() => handleNavigateToPool('123')} />
        <PoolCard />
        <PoolCard />
        <PoolCard />
      </VStack>
    </Background>
  )
}

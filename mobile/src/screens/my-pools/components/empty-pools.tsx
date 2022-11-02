import { useNavigation } from '@react-navigation/native'
import { Center, Pressable, Text } from 'native-base'

export function EmptyPools() {
  const navigation = useNavigation()

  function handleNavigateToSearchPool() {
    navigation.navigate('searchPoolByCode')
  }

  function handleNavigateToNewPool() {
    navigation.navigate('newPool')
  }

  return (
    <Center flexDir="row" flexWrap="wrap">
      <Text>Você ainda não está participando de nenhum bolão, que tal</Text>
      <Pressable onPress={handleNavigateToSearchPool}>
        <Text color="yellow.400" textDecorationLine="underline">
          buscar um por código
        </Text>
      </Pressable>{' '}
      <Text>ou</Text>{' '}
      <Pressable onPress={handleNavigateToNewPool}>
        <Text color="yellow.400" textDecorationLine="underline">
          criar um novo
        </Text>
      </Pressable>
    </Center>
  )
}

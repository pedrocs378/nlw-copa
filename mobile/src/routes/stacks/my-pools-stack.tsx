import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MyPools } from '../../screens/my-pools'
import { Pool } from '../../screens/pool'
import { SearchPoolByCode } from '../../screens/search-pool-by-code'

const { Navigator, Screen } = createNativeStackNavigator()

export function MyPoolsStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="myPools" component={MyPools} />
      <Screen name="searchPoolByCode" component={SearchPoolByCode} />
      <Screen name="pool" component={Pool} />
    </Navigator>
  )
}

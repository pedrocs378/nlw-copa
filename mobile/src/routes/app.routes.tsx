import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Icon, useSx, useTheme } from 'native-base'

import { MyPoolsStack } from './stacks/my-pools-stack'

import { NewPool } from '../screens/new-pool'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors } = useTheme()

  const tabBarLabelStyles = useSx()
  const tabBarItemStyles = useSx()
  const tabBarStyles = useSx()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: tabBarStyles({
          h: '16',
          borderTopColor: 'gray.700',
        }),
        tabBarItemStyle: tabBarItemStyles({
          bg: 'gray.700',
        }),
        tabBarLabelStyle: tabBarLabelStyles({
          fontSize: 'md',
          fontWeight: 'medium',
        }),
      }}
    >
      <Screen
        name="newPool"
        component={NewPool}
        options={{
          title: 'Novo Bolão',
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="pluscircleo" color={color} size="md" />
          ),
        }}
      />
      <Screen
        name="myPoolsStack"
        component={MyPoolsStack}
        options={{
          title: 'Meus Bolões',
          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialIcons}
              name="sports-soccer"
              color={color}
              size="lg"
            />
          ),
        }}
      />
    </Navigator>
  )
}

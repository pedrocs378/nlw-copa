type MyPoolsStackParmList = {
  myPools: undefined
  searchPoolByCode: undefined
  pool: {
    poolId: string
  }
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      newPool: undefined
      myPoolsStack: import('@react-navigation/native').NavigatorScreenParams<MyPoolsStackParmList>
    }
  }

  type MyPoolsScreenProps<T extends keyof MyPoolsStackParmList> =
    import('@react-navigation/native-stack').NativeStackScreenProps<
      MyPoolsStackParmList,
      T
    >
}

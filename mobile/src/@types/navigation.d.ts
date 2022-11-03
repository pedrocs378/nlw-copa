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
}

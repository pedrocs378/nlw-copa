import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const api = axios.create({
  baseURL: 'http://192.168.0.103:3333',
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@nlwcopa:token')

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

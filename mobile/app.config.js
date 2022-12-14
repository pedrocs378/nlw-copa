require('dotenv').config()

const envs = process.env

module.exports = {
  name: 'NLW Copa',
  slug: 'nlw-copa',
  version: '1.0.0',
  scheme: 'nlw-copa',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#000'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    ...envs
  }
}
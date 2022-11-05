import { Share } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { Icon, IconButton } from 'native-base'

type ShareCodeProps = {
  code: string
}

export function ShareCode({ code }: ShareCodeProps) {
  async function handleShareCode() {
    await Share.share({
      message: code,
      title: `Compartilhar código ${code}`,
    })
  }

  return (
    <IconButton
      onPress={handleShareCode}
      icon={<Icon as={Octicons} name="share" pl="0.5" />}
    />
  )
}

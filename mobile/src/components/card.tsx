import { GestureResponderEvent } from 'react-native'
import { Flex, IFlexProps, Pressable } from 'native-base'

type CardPressableProps = IFlexProps & {
  onPress?: (event: GestureResponderEvent) => void
}

export function CardPressable({
  children,
  onPress,
  ...rest
}: CardPressableProps) {
  return (
    <Pressable _pressed={{ opacity: onPress && 0.8 }} onPress={onPress}>
      <Flex
        flexDir="row"
        align="center"
        bg="gray.700"
        rounded="sm"
        p="4"
        borderBottomWidth="2"
        borderBottomColor="yellow.400"
        {...rest}
      >
        {children}
      </Flex>
    </Pressable>
  )
}

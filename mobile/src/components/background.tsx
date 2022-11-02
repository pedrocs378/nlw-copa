import { Entypo } from '@expo/vector-icons'
import { Box, Flex, Heading, IBoxProps, Icon, IconButton } from 'native-base'

type BackgroundProps = IBoxProps & {
  title: string
  onBack?: () => void
}

export function Background({
  children,
  title,
  onBack,
  ...rest
}: BackgroundProps) {
  return (
    <Box flex="1" bg="gray.800">
      <Flex
        flexDir="row"
        align="center"
        bg="gray.700"
        // py="5"
        h="24"
        px="2"
        safeAreaTop
      >
        {onBack && (
          <IconButton
            onPress={onBack}
            icon={<Icon as={Entypo} name="chevron-thin-left" />}
          />
        )}

        <Heading
          flex="1"
          textAlign="center"
          fontSize="md"
          fontWeight="medium"
          color="white"
        >
          {title}
        </Heading>

        {onBack && <Box w="8" />}
      </Flex>

      <Box flex="1" px="5" py="8" {...rest}>
        {children}
      </Box>
    </Box>
  )
}

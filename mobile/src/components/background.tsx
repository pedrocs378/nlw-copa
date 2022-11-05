import { Entypo } from '@expo/vector-icons'
import { Box, Flex, Heading, IBoxProps, Icon, IconButton } from 'native-base'

type BackgroundProps = IBoxProps & {
  title: string
  RightButtonElement?: JSX.Element
  onBack?: () => void
}

const HeaderEmptyBox = () => <Box w="8" />

export function Background({
  children,
  title,
  onBack,
  RightButtonElement,
  ...rest
}: BackgroundProps) {
  return (
    <Box flex="1" bg="gray.800">
      <Flex
        flexDir="row"
        align="center"
        bg="gray.700"
        h="24"
        px="2"
        safeAreaTop
      >
        {onBack ? (
          <IconButton
            onPress={onBack}
            icon={<Icon as={Entypo} name="chevron-thin-left" />}
          />
        ) : (
          <HeaderEmptyBox />
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

        {RightButtonElement ?? <HeaderEmptyBox />}
      </Flex>

      <Box flex="1" px="5" py="6" {...rest}>
        {children}
      </Box>
    </Box>
  )
}

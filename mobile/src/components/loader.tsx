import { Center, Spinner } from 'native-base'

export function Loader() {
  return (
    <Center bg="gray.800" flex="1">
      <Spinner color="yellow.400" size="lg" />
    </Center>
  )
}

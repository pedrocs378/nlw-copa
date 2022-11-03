import { Button, IButtonProps } from 'native-base'

type TabButtonProps = IButtonProps & {
  isActive?: boolean
}

export function TabButton({ isActive = false, ...rest }: TabButtonProps) {
  return (
    <Button
      {...rest}
      flex="1"
      _text={{ textTransform: 'none' }}
      size="sm"
      colorScheme="gray"
      variant={isActive ? 'subtle' : 'unstyled'}
    />
  )
}

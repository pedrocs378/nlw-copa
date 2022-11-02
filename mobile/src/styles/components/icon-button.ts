export const IconButton = {
  defaultProps: {
    colorScheme: 'gray',
  },
  variants: {
    ghost: (props) => ({
      _icon: {
        color: `${props.colorScheme as string}.300`,
      },
      _pressed: {
        bg: `${props.colorScheme as string}.600`,
      },
    }),
  },
}

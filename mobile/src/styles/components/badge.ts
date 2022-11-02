export const Badge = {
  baseStyle: {
    px: '3',
  },
  variants: {
    solid: (props) => ({
      bg: `${props.colorScheme as string}.400`,
      border: '0',

      _text: {
        color: 'gray.900',
        fontWeight: 'bold',
      },
    }),
    subtle: (props) => ({
      bg: `${props.colorScheme as string}.600`,
      border: '0',

      _text: {
        color: `${props.colorScheme as string}.300`,
        fontWeight: 'bold',
      },
    }),
  },
}

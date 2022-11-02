export const Button = {
  baseStyle: () => ({
    w: 'full',

    _disabled: {
      opacity: 0.6,
    },
    _loading: {
      opacity: 0.6,
    },

    _text: {
      textTransform: 'uppercase',
      fontSize: 'sm',
      fontWeight: 'bold',
    },
  }),
  defaultProps: {
    colorScheme: 'yellow',
    size: 'lg',
  },
  variants: {
    solid: (props) => ({
      bg: `${props.colorScheme as string}.400`,
      _pressed: {
        bg: `${props.colorScheme as string}.700`,
      },
      _icon: {
        color: props.colorScheme === 'yellow' ? 'gray.900' : 'white',
      },
      _text: {
        color: props.colorScheme === 'yellow' ? 'gray.900' : 'white',
      },
      _spinner: {
        color: props.colorScheme === 'yellow' ? 'gray.900' : 'white',
      },
    }),
    subtle: (props) => ({
      bg: `${props.colorScheme as string}.600`,
      _pressed: {
        bg: `${props.colorScheme as string}.700`,
      },
      _icon: {
        color: `${props.colorScheme as string}.100`,
      },
      _text: {
        color: `${props.colorScheme as string}.100`,
      },
      _spinner: {
        color: `${props.colorScheme as string}.100`,
      },
    }),
  },
  sizes: {
    sm: {
      _text: {
        fontSize: 'sm',
      },
    },
    lg: {
      py: '4',
      px: '4',
      _text: {
        fontSize: 'sm',
      },
    },
  },
}

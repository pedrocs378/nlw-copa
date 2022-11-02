export const Input = {
  baseStyle: {
    px: '4',
    fontSize: 'md',
    color: 'gray.100',
  },
  defaultProps: {
    placeholderTextColor: 'gray.300',
    cursorColor: 'gray.100',
    size: 'md',
  },
  variants: {
    filled: {
      bg: 'gray.800',
      borderColor: 'gray.600',

      _focus: {
        bg: 'gray.800',
        borderColor: 'gray.600',
      },
    },
    outline: {
      bg: 'gray.700',
      borderColor: 'gray.600',

      _focus: {
        bg: 'gray.700',
        borderColor: 'gray.300',
      },
    },
  },
  sizes: {
    sm: {
      h: 9,
      fontSize: 'xs',
    },
    md: {
      fontSize: 'md',
      h: 14,
    },
  },
}

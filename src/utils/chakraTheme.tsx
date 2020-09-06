import { theme as cTheme } from '@chakra-ui/core'

const fonts = { ...cTheme.fonts, mono: `'Menlo', monospace` }

const breakpoints = ['30em', '48em', '62em', '80em']

const chakraTheme = {
  ...cTheme,
  colors: {
    ...cTheme.colors,
    // black: '#16161D'
  },
  fonts,
  breakpoints,
  icons: {
    ...cTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
}

export default chakraTheme

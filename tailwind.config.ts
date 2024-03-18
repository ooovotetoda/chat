import type { Config } from 'tailwindcss'

export default {
content: [],
  theme: {
    extend: {
      spacing: {
        '19': '4rem',
        'chat': 'calc(100vh - 48px - 48px)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'pixel': ['Pixelify Sans', 'sans-serif'],
      },
    },

  },
  plugins: [],
} satisfies Config


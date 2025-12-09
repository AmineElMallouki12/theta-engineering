import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6e6f5',
          100: '#cccceb',
          200: '#9999d7',
          300: '#6666c3',
          400: '#3333af',
          500: '#0000A0', // Base navy blue (lighter)
          600: '#000080', // Medium navy
          700: '#000068', // Original navy
          800: '#000052',
          900: '#00003d', // Darkest navy
        },
      },
    },
  },
  plugins: [],
}
export default config


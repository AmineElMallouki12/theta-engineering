import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6e9f5',
          100: '#ccd3eb',
          200: '#99a7d7',
          300: '#667bc3',
          400: '#334faf',
          500: '#051A53',
          600: '#051A53',
          700: '#051A53',
          800: '#051A53',
          900: '#051A53',
        },
      },
    },
  },
  plugins: [],
}
export default config


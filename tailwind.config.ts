import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf8f4',
          100: '#f5efe6',
          200: '#ebe0cf',
          300: '#d9c6a7',
          400: '#c2a478',
          500: '#a88759',
          600: '#8c6e45',
          700: '#6f5637',
          800: '#53402a',
          900: '#382c1d',
        },
        ink: {
          DEFAULT: '#2a2623',
          soft: '#5a534d',
          mute: '#8b857f',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;

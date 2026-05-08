import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a3c5e',
          50: '#f0f5fa',
          100: '#dce8f4',
          200: '#b9d1e9',
          300: '#8cb4d8',
          400: '#5a90c2',
          500: '#3572ab',
          600: '#285990',
          700: '#214876',
          800: '#1a3c5e',
          900: '#162f4a',
          950: '#0d1e31',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#e8a020',
          50: '#fdf8ec',
          100: '#faefd0',
          200: '#f5dc9c',
          300: '#f0c567',
          400: '#ebad3a',
          500: '#e8a020',
          600: '#cc7e10',
          700: '#a95f10',
          800: '#8a4c14',
          900: '#713f15',
          950: '#3e2007',
          foreground: '#ffffff',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

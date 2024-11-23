/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // You can add more custom colors here
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        // Add more custom fonts here
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        'xxs': '.625rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '11': '2.75rem',
        '48': '12rem',
        'screen-75': '75vh',
      },
      scale: {
        '175': '1.75',
        '185': '1.85',
        '195': '1.95',
      },
    },
    // Screen breakpoints
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    ('@tailwindcss/forms'), // Optional but recommended for better form styling
    ('@tailwindcss/typography'), // Optional for blog/article content
    ('@tailwindcss/aspect-ratio'), // Optional for responsive media
  ],
  // Enable dark mode
  darkMode: 'class',
}
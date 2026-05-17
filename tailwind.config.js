/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        zalando: ['"Zalando Sans Expanded"', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#241006',
          'dark-black': '#331806',
          'off-black': '#5a2a0c',
          'pale-black': '#75390f',
          'light-black': '#9a5420',
          white: '#ffffff',
          'light-white': '#fffaf6',
          'dim-white': '#fff3ea',
          'off-white': '#fff7f1',
          'light-gray': '#d99a72',
          'off-gray': '#ffd9c2',
          red: '#ff7a1a',
          orange: '#ff7a1a',
          green: '#ff7a1a',
        },
      },
      borderRadius: {
        '40': '40px',
      },
    },
  },
  plugins: [],
}

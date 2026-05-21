/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaria: {
          50:  '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        risco: {
          alto:    '#DC2626',
          atencao: '#F59E0B',
          estavel: '#16A34A',
        },
        fundo: '#F9FAFB',
        texto: '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        cartao: '1rem',
      },
      boxShadow: {
        cartao: '0 4px 14px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}

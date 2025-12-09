// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBED',
          100: '#FFF8DC',
          200: '#F5ECD7',
          300: '#E8DCC8',
          400: '#D4C7AF',
          500: '#B8A890',
        },
        brown: {
          50: '#F5F3F0',
          100: '#E8E3DC',
          200: '#C8BFB4',
          300: '#8B8378',
          400: '#5C574F',
          500: '#2D2A26',
        },
        terracotta: {
          50: '#FDF5F1',
          100: '#F9E8E0',
          200: '#E8B69A',
          300: '#D4845C',
          400: '#C67750',
          500: '#B0643D',
        },
        sage: {
          50: '#F2F7EE',
          100: '#E3EFDB',
          200: '#A8C99A',
          300: '#7BA862',
          400: '#6A9554',
          500: '#5A7F48',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      }
    }
  }
}
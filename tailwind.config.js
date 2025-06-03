/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      colors: {
        // 그레이 계열
        black: '#463E53',
        grey100: '#5E566C',
        grey75: '#80778F',
        grey50: '#9E98A9',
        grey25: '#D5D1DB',
        grey10: '#F1EFF5',
        white: '#FFFFFF',

        // 레드 계열
        red150: '#BC0000',
        red100: '#FF0000',
        red75: '#FF9B9B',
        red50: '#FFC6C6',
        red25: '#FFE0E0',
        red10: '#FFF7F7',

        // 그린 계열
        green150: '#00C727',
        green100: '#01FC32',
        green75: '#6DFF8A',
        green50: '#A3FFB5',
        green25: '#D2FFDB',
        green10: '#F7FFF9',

        // 민트 계열
        mint150: '#00D186',
        mint100: '#00FFA3',
        mint75: '#6EFFCB',
        mint50: '#ADFFE2',
        mint25: '#D2FFEF',
        mint10: '#F0FFFA',

        // 블루 계열
        blue150: '#211EDC',
        blue100: '#4A46FF',
        blue75: '#B3B2FF',
        blue50: '#D8D7FF',
        blue25: '#EEEDFF',
        blue10: '#F9F9FF',

        // 옐로우 계열
        yellow150: '#E5BE00',
        yellow100: '#FFD815',
        yellow75: '#FFE979',
        yellow50: '#FFF4BC',
        yellow25: '#FFFAE3',
        yellow10: '#FFFEF7',
      },
    },
  },
  plugins: [],
};

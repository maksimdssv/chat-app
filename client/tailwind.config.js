/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        main: '#586670',
        message: {
          received: '#BECBD9',
          sent: '#F0CBB3',
        },
        chat: {
          header: '#BECBD9',
          body: '#D7DFE7',
        },
        button: '#428BCA',
        section: '#F8F8F8',
        online: '#20D63E',
      },
      textColor: {
        main: '#1D1D1D',
        date: '#8C8C8C',
        secondary: '#AEAEAE',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/line-clamp'),
  ],
};

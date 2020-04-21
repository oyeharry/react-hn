const fallbackFonts = 'sans-serif';
const breakpoints = ['40em', '52em', '64em', '80em'];

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const Theme = {
  colors: {
    primary: {
      main: '#EE6F2E',
      dark: '#9F4C1E',
      light: '#F0C0A7',
    },
    white: '#FFF',
    black: '#FFF',
    text: {
      primary: '#333',
    },
    springWood: '#F6F6F0',
    blackSqueeze: '#E6E6E0',
    frenchGray: '#BDBCBD',
    gray: {
      300: '#f3f3f3',
      400: '#4a4a4a',
      500: '#d8d8d8',
      600: '#828282',
      700: '#575757',
      800: '#595959',
      900: '#1a1a1a',
    },
  },
  fonts: {
    primary: `Arial, ${fallbackFonts}`,
  },
  fontSizes: [2, 4, 8, 10, 12, 14, 16, 18, 22, 24, 26, 28, 32, 38, 42, 48, 64],
  fontWeights: [],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints,
  sizes: ['40em', '52em', '64em', '80em'],
};

export default Theme;

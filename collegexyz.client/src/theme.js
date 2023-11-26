// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h2: {
      fontWeight: 800,
      fontSize: '3.75rem', // 60px
    },
    body1: {
      fontSize: '1.25rem', // 20px
    },
    // Other custom styles
  },
  palette: {
    primary: {
      main: '#009A6A', // Replace with your primary color
    },
    // Other colors...
  },
  components: {
    // Custom component styles...
  },
});

export default theme;

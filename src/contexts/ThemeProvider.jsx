import { ThemeProvider as _ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  //   components: {
  //     MuiButton: {
  //       defaultProps: {
  //         disableRipple: true,
  //       },
  //     },
  //   },
});

export default function ThemeProvider({ children }) {
  return (
    <_ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </_ThemeProvider>
  );
}

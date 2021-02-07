// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

interface Props {
  children: React.ReactNode;
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const ThemeProvider = (props: Props) => {
  const { children } = props;
  return (
    <MaterialThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MaterialThemeProvider>
  );
};

export default ThemeProvider;

// Router
import { BrowserRouter as Router } from 'react-router-dom';
// Theme
import ThemeProvider from './ThemeProvider';

interface Props {
  children: React.ReactNode;
}

const Providers = (props: Props) => {
  const { children } = props;
  return (
    <Router>
      <ThemeProvider>{children}</ThemeProvider>
    </Router>
  );
};

export default Providers;

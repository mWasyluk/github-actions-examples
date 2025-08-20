import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './contexts/AlertContext';
import { TodosProvider } from './contexts/TodosContext';
import './index.css';
import theme from './styles/theme';

function Index() {
  const [key, setKey] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <TodosProvider key={key} onReset={() => setKey(key + 1)}>
          <App />
        </TodosProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index />
);

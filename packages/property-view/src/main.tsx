import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import { theme } from './theme';
import { StrictMode } from 'react';

/**
 * Customize form so each control has more space
 */


const rootEl = document.getElementById('root');

if (!rootEl) throw new Error('Failed to find the root element');

createRoot(rootEl).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>,
);

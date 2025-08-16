import '@fontsource-variable/genos';
import '@fontsource/lato';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#136bcfff',
            dark: '#0d488bff',
            contrastText: '#fff'
        },
        success: {
            main: '#1fb15cff',
            dark: '#14743cff',
            contrastText: '#fff'
        },
        danger: {
            main: '#e74c3c',
            dark: '#993126ff',
            contrastText: '#fff'
        },
        warning: {
            main: '#f1c40f',
            dark: '#977b0aff',
            contrastText: '#000'
        },
        background: {
            default: '#1D1D1D',
            dark: '#0f0f0fff',
            paper: '#252525',
            light: '#2c2c2cff'
        },
        text: {
            primary: '#ecf0f1',
            secondary: '#b0b0b0'
        }
    },
    typography: {
        fontFamily: 'Lato, sans-serif',
        fontSize: 16,
        h2: {
            fontSize: 32
        },
        title: {
            fontFamily: 'Genos Variable',
            fontSize: 40,
            fontWeight: 600,
        },
        caption: {
            fontSize: 12,
        }
    },
    shape: {
        borderRadius: 8
    }
});

export default theme;

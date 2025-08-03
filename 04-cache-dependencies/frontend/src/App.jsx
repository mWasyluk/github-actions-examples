import { Box } from '@mui/material';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import TodoView from './components/TodoView';

export default function App() {
    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                minWidth: '100vh',
            }}
        >
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                overflowY: 'true'
            }}>
                <SideBar />
                <TodoView />
            </Box>

            <Footer />
        </Box>
    );
}

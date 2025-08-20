import { Box } from '@mui/material';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import TodoView from './components/TodoView';
import useDimensions from './hooks/useDimensions';

export default function App() {
    const { width, height } = useDimensions();

    return (
        <Box
            sx={{
                bgcolor: 'background.dark',
                display: 'flex',
                flexDirection: 'column',
                height: height,
                width: width,
            }}
        >
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
            }}>
                <SideBar />
                <TodoView />
            </Box>

            <Footer />
        </Box>
    );
}

import CachedIcon from '@mui/icons-material/Cached';
import { Box, Typography } from '@mui/material';
import { useTodos } from '../contexts/TodosContext';
import TextButton from './TextButton';
import TextInput from './TextInput';

export default function SideBar() {
    const { secret, setSecret, clearAll } = useTodos();

    return (
        <Box
            component="aside"
            sx={{
                width: 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 2,
            }}
        >
            <Typography variant="h5" component="h1" typography={"title"}>
                TodosApp
            </Typography>

            <Typography variant="body2" align='center'>
                Reading all the Todos persisted on the server is publically available, but changing them
                is restricted with administrator previleges. All changes made in the Todo list
                without the valid administrator secret will only be available locally which means you are
                the only person who can see them.
            </Typography>

            <TextInput
                label="secret"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
            />

            <TextButton icon={<CachedIcon />} onClick={clearAll}>
                Reverse all changes
            </TextButton>
        </Box>
    );
}

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import { useTodos } from '../contexts/TodosContext';
import { linkify } from '../utils/todoUtils';
import PriorityBadge from './PriorityBadge';

export default function TodoItem({ todo }) {
    const {
        toggleTodo,
        deleteTodo,
        showForm
    } = useTodos();

    return (
        <ListItem disablePadding sx={{ position: 'relative', mb: 1 }}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {todo.isDone && (
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(0,0,0,0.3)',
                            zIndex: 1
                        }}
                    />
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', mb: 1, zIndex: 2 }}>
                    <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        checked={todo.isDone}
                        onChange={() => toggleTodo(todo.id)}
                        color="success"
                        sx={{ p: 0 }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            ml: 1,
                            flexGrow: 1,
                            textDecoration: todo.isDone ? 'line-through' : 'none',
                            color: todo.isDone ? 'text.secondary' : 'text.primary'
                        }}
                    >
                        {todo.title}
                    </Typography>
                    <PriorityBadge priority={todo.priority} />
                    {todo.origin === 'server' && (
                        <CloudDoneOutlinedIcon sx={{ ml: 1 }} color="info" />
                    )}
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ position: 'relative', zIndex: 2, minHeight: '1em' }}
                >
                    {linkify(todo.description) || '\u00A0'}
                </Typography>

                <Box sx={{ position: 'absolute', bottom: 8, right: 8, zIndex: 2 }}>
                    <IconButton
                        onClick={() => showForm(todo.id)}
                    >
                        <ModeEditRoundedIcon color="primary" />
                    </IconButton>

                    <IconButton
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <DeleteIcon color="danger" />
                    </IconButton>
                </Box>
            </Box>
        </ListItem>
    );
}

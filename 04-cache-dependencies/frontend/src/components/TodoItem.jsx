import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Checkbox, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useTodos } from '../contexts/TodosContext';
import { linkify } from '../utils/todoUtils';
import Button from './Button';
import PriorityBadge from './PriorityBadge';

export default function TodoItem({ todo }) {
    const {
        toggleTodo,
        deleteTodo,
        showForm
    } = useTodos();

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }

    return (
        <ListItem
            onClick={toggleOptions}
            sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                borderRadius: 1,
                mb: 1,
                p: 2,
                flexDirection: 'column',
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

            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%' }}>
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

            {todo.description && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ position: 'relative', zIndex: 2, mt: 1, width: '100%' }}
                >
                    {linkify(todo.description)}
                </Typography>
            )}

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    alignSelf: 'end',
                    height: showOptions ? 32 : 0,
                    opacity: showOptions ? 1 : 0,
                    bottom: -5,
                    transition: 'opacity 200ms ease, height 200ms ease',
                }}
            >
                {showOptions && (
                    <>
                        <Button
                            startIcon={<ModeEditRoundedIcon sx={{ width: 28, height: 28 }} />}
                            onClick={() => showForm(todo.id)}
                            rounded
                            transparent
                            variantcolor="primary"
                            sx={{ minWidth: 0, width: 36, height: 36 }}
                        >
                        </Button>

                        <Button
                            startIcon={<DeleteIcon sx={{ width: 28, height: 28 }} />}
                            onClick={() => deleteTodo(todo.id)}
                            rounded
                            transparent
                            variantcolor="danger"
                            sx={{ minWidth: 0, width: 36, height: 36 }}
                        >
                        </Button>
                    </>
                )}
            </Box>
        </ListItem>
    );
}

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Container } from '@mui/material';
import { useMemo } from 'react';
import { useTodos } from '../contexts/TodosContext';
import { sortByPriorityAndTitle } from '../utils/todoUtils';
import Button from './Button';
import TodoList from './TodoList';

export default function TodoView() {
    const { todos, loading, showForm } = useTodos();

    const todosMemo = useMemo(() => {
        if (loading) return {}

        const sorted = sortByPriorityAndTitle(todos);

        const ip = [];
        const d = [];
        sorted.forEach(t => {
            if (t.isDone) {
                d.push(t);
            } else {
                ip.push(t);
            }
        })

        return {
            inProgress: ip,
            done: d
        }
    }, [todos, loading])

    const addButton = (
        <Button
            variantcolor="success"
            startIcon={<AddOutlinedIcon />}
            onClick={() => showForm()}
        >
            Add
        </Button>
    );

    return (
        <Container
            component="main"
            maxWidth="false"
            sx={{ py: 3, width: '100%', height: '100%' }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}>
                <TodoList title={"To do"} badge={addButton} todos={todosMemo.inProgress} loading={loading} />
                <TodoList title={"Done"} todos={todosMemo.done} loading={loading} />
            </Box>
        </Container>
    );
}

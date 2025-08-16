import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box } from '@mui/material';
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
            variantcolor="primary"
            startIcon={<AddOutlinedIcon />}
            onClick={() => showForm()}
        >
            Add
        </Button>
    );

    return (
        <Box
            component="main"
            sx={{
                width: '1',
                overflowY: 'auto',
                backgroundColor: 'background.default',
                borderRadius: '0 0 0 10px',
                py: 3,
                px: 2,
            }}
        >
            <TodoList title={"To do"} badge={addButton} todos={todosMemo.inProgress} loading={loading} style={{ mb: 2 }} />
            <TodoList title={"Done"} todos={todosMemo.done} loading={loading} />
        </Box>
    );
}

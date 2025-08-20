import { Box, CircularProgress, Divider, List, Typography } from '@mui/material';
import { useMemo } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ title = '', badge = null, todos = [], loading = false, style }) {
    const content = useMemo(() => {
        if (loading) {
            return <CircularProgress size="3rem" />
        }

        if (todos.length === 0) {
            return <Typography variant={"body2"} >No todos to display</Typography>
        }

        return (
            <List>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />
                ))}
            </List>
        )
    }, [todos, loading])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            ...style
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                <Typography variant={"h2"} component={"h2"} >{title}</Typography>
                {badge && badge}
            </Box>

            <Divider color='white' sx={{ height: 2, borderRadius: 1 }} />

            {content}
        </Box >
    );
}

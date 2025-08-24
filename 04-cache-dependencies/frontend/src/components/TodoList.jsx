import { Box, CircularProgress, Divider, List, Typography } from '@mui/material';
import { useLocale } from '../contexts/LocaleContext';
import TodoItem from './TodoItem';

export default function TodoList({ title = '', badge = null, todos = [], loading = false, style }) {
    const { t } = useLocale();

    var content;
    if (loading) {
        content = <CircularProgress size="3rem" />
    } else if (todos.length === 0) {
        content = <Typography variant={"body2"} >{t.todoList.noTodo}</Typography>
    } else {
        content = (
            <List>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />
                ))}
            </List>
        )
    }

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

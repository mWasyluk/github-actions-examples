import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { useEffect, useState } from 'react';
import Button from './Button';
import PriorityInput from './PriorityInput';
import TextInput from './TextInput';

export default function TodoForm({
    open,
    onClose,
    onSubmit,
    todo = null
}) {
    const isEditMode = Boolean(todo && todo.id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('minor');

    // initialize form when opening or todo changes
    useEffect(() => {
        if (todo) {
            setTitle(todo.title || '');
            setDescription(todo.description || '');
            setPriority(todo.priority || 'minor');
        } else {
            setTitle('');
            setDescription('');
            setPriority('minor');
        }
    }, [todo, open]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!title.trim()) return;
        const payload = {
            ...(todo?.id ? { id: todo.id } : {}),
            title: title.trim(),
            description: description.trim(),
            priority
        };
        onSubmit(payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? 'Edit Todo' : 'Add New Todo'} {(todo && todo.origin === 'server') && '(server)'}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="todo-form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
                >
                    <TextInput
                        label="Title*"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        backgroundColor="background.light"
                        placeholder="What do you need to do?"
                    />
                    <TextInput
                        label="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        backgroundColor="background.light"
                        placeholder="How do you need to do this?"
                        multiline
                        rows={3}
                    />
                    <PriorityInput value={priority} onChange={setPriority} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variantcolor="danger" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="todo-form"
                    variantcolor={title.trim() ? 'success' : 'disabled'}
                    startIcon={<SaveOutlinedIcon />}
                >
                    {isEditMode ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

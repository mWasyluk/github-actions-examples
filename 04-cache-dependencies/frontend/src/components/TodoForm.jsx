import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import Button from './Button';
import PriorityInput from './PriorityInput';
import TextInput from './TextInput';

export default function TodoForm({
    open,
    onClose,
    onSubmit,
    todo = null
}) {
    const { t } = useLocale();

    const isEditMode = Boolean(todo && todo.id);
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('minor');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || '');
            setTitleError(false);
            setDescription(todo.description || '');
            setPriority(todo.priority || 'minor');
        } else {
            setTitle('');
            setTitleError(false);
            setDescription('');
            setPriority('minor');
        }
    }, [todo, open]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!title.trim()) {
            setTitleError(true);
            return;
        }
        const payload = {
            ...(todo?.id ? { id: todo.id } : {}),
            title: title.trim(),
            description: description.trim(),
            priority
        };
        onSubmit(payload);
        onClose();
    };

    useEffect(() => {
        setTitleError(false);
    }, [title])

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? t.form.editTitle : t.form.addTitle} {(todo && todo.origin === 'server') && `(${t.form.serverLabel.toLowerCase()})`}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="todo-form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
                >
                    <TextInput
                        label={`${t.todo.title}*`}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        backgroundColor="background.light"
                        placeholder={t.form.titlePlaceholder}
                        error={titleError}
                    />
                    <TextInput
                        label={t.todo.description}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        backgroundColor="background.light"
                        placeholder={t.form.descPlaceholder}
                        multiline
                        rows={3}
                    />
                    <PriorityInput value={priority} onChange={setPriority} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variantcolor="danger" onClick={onClose}>
                    {t.buttons.cancel}
                </Button>
                <Button
                    type="submit"
                    form="todo-form"
                    variantcolor={title.trim() ? 'success' : 'disabled'}
                    startIcon={<SaveOutlinedIcon />}
                >
                    {isEditMode ? t.buttons.update : t.buttons.save}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

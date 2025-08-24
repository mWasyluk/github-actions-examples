import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
    deleteTodo as deleteTodoApi,
    getTodos,
    postTodo,
    putTodo
} from '../api/todosApi';
import ConfirmationDialog from '../components/ConfirmationDialog';
import TodoForm from '../components/TodoForm';
import {
    mapServerTodo,
    mapToServerPayload
} from '../utils/todoUtils';
import { ALERT_SEVERITIES, useAlert } from './AlertContext';
import { useLocale } from './LocaleContext';

const TodosContext = createContext(null);

const LS_KEY = "todosAppState";

export function TodosProvider({ children, onReset = () => { } }) {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState(null);
    const [secret, setSecret] = useState('');
    const [form, setForm] = useState({ open: false });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, onConfirm: () => { } });

    const { showAlert } = useAlert();
    const { t } = useLocale();
    const localCounter = useRef(1);

    // Initialization: merge localStorage and server data
    useEffect(() => {
        async function initialize() {
            let localTodos = [];
            try {
                const raw = localStorage.getItem(LS_KEY);
                localTodos = raw ? JSON.parse(raw).todos : [];
            } catch {
                showAlert(t.notifications.error.notReadLocal, ALERT_SEVERITIES.ERROR);
            }

            let serverTodos = [];
            try {
                const data = await getTodos();
                serverTodos = data.map(mapServerTodo);
            } catch {
                showAlert(t.notifications.error.notReadServer, ALERT_SEVERITIES.ERROR);
            }


            const localIds = localTodos.map(t => t.id);

            const allTodos = [
                ...localTodos,
                ...serverTodos.filter(t => !localIds.includes(t.id))
            ]

            const merged = allTodos.map(lt => {
                if (lt.origin === 'local') {
                    return lt;
                }
                const serverTodo = serverTodos.find(st => st.id === lt.id);
                if (!serverTodo) {
                    return null;
                }
                return { ...serverTodo, isDone: lt.isDone };
            }).filter(t => t);


            setTodos(merged);

            // setup localCounter based on merged
            merged.forEach(t => {
                if (t.origin === 'local' && t.id.startsWith('local-')) {
                    const num = parseInt(t.id.replace('local-', ''), 10);
                    if (!isNaN(num) && num >= localCounter.current) {
                        localCounter.current = num + 1;
                    }
                }
            });
        }
        initialize();
    }, []);

    useEffect(() => {
        if (!Array.isArray(todos)) return;

        try {
            localStorage.setItem(LS_KEY, JSON.stringify({ todos }));
        } catch {
            showAlert(t.notifications.error.notSavedLocal, ALERT_SEVERITIES.ERROR)
        } finally {
            setLoading(false);
        }
    }, [todos]);

    const addTodo = async ({ title, description, priority }) => {
        console.log('addTodo: ', { title, description, priority });
        if (!secret) {
            // local only
            const tempId = `local-${localCounter.current++}`;
            const localTodo = { id: tempId, title, description, priority, isDone: false, origin: 'local' };
            setTodos(prev => [...prev, localTodo]);
            showAlert(t.notifications.success.savedLocal, ALERT_SEVERITIES.SUCCESS);
        } else {
            // server only
            try {
                const data = await postTodo(secret, { title, description, priority: mapToServerPayload({ title, description, priority }).priority });
                const serverTodo = mapServerTodo(data);
                setTodos(prev => [...prev, serverTodo]);
                showAlert(t.notifications.success.savedServer, ALERT_SEVERITIES.SUCCESS);
            } catch (err) {
                var msg;
                if (err.response?.status === 401) {
                    msg = t.notifications.error.unauthorized;
                } else {
                    msg = t.notifications.error.unknown;
                }
                showAlert(msg, ALERT_SEVERITIES.ERROR);
            }
        }
    };

    const toggleTodo = async (id) => {
        setTodos(prev => prev.map(t =>
            t.id === id ? { ...t, isDone: !t.isDone } : t
        ));
    };

    const editTodo = async (id, newState) => {
        if (!secret || newState.origin === 'local') {
            // local only
            console.log(newState)
            setTodos(prev => prev.map(t => t.id === id ? { ...newState } : t));
            showAlert(t.notifications.success.savedLocal, ALERT_SEVERITIES.SUCCESS);
        } else {
            // server only
            try {
                const data = await putTodo(secret, id, mapToServerPayload(newState));
                const serverTodo = mapServerTodo(data);
                setTodos(prev => prev.map(t => t.id === id ? { ...newState, serverTodo } : t));
                showAlert(t.notifications.success.savedServer, ALERT_SEVERITIES.SUCCESS);
            } catch (err) {
                var msg;
                if (err.response?.status === 401) {
                    msg = t.notifications.error.unauthorized;
                } else {
                    msg = t.notifications.error.unknown;
                }
                showAlert(msg, ALERT_SEVERITIES.ERROR);
            }
        }
    }

    const deleteTodo = async id => {
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            showAlert(t.notifications.error.unknown, ALERT_SEVERITIES.ERROR);
            return;
        }

        const serverMatch = todo.origin === 'server';
        if (serverMatch && !secret) {
            showAlert(t.notifications.error.noSecret, ALERT_SEVERITIES.ERROR);
            return;
        }

        async function handleDelete() {
            if (!serverMatch) {
                setTodos(prev => prev.filter(t => t.id !== id));
                showAlert(t.notifications.success.savedLocal, ALERT_SEVERITIES.SUCCESS);
            } else {
                // server only
                try {
                    await deleteTodoApi(secret, id);
                    setTodos(prev => prev.filter(t => t.id !== id));
                    showAlert(t.notifications.success.savedServer, ALERT_SEVERITIES.SUCCESS);
                } catch (err) {
                    var msg;
                    if (err.response?.status === 401) {
                        msg = t.notifications.error.unauthorized;
                    } else {
                        msg = t.notifications.error.unknown;
                    }
                    showAlert(msg, ALERT_SEVERITIES.ERROR);
                }
            }
        }

        setConfirmDialog({ open: true, onConfirm: handleDelete });
    };

    const clearAll = () => {
        function handleClear() {
            localStorage.clear();
            onReset();
        }

        setConfirmDialog({ open: true, onConfirm: handleClear });
    }

    const showForm = (id) => {
        var todo = id ? todos.find(t => t.id === id) : null;

        if (id && !todo) {
            showAlert(t.notifications.error.unknown, ALERT_SEVERITIES.ERROR);
            return;
        }

        if (todo && todo.origin === 'server' && !secret) {
            showAlert(t.notifications.error.noSecret, ALERT_SEVERITIES.ERROR);
            return;
        }

        setForm({
            open: true,
            todo,
            onSubmit: id ? (props) => editTodo(id, { ...todo, ...props }) : addTodo
        })
    }

    return (
        <TodosContext.Provider
            value={{
                loading,
                todos,
                secret,
                setSecret,
                toggleTodo,
                deleteTodo,
                clearAll,
                showForm,
            }}
        >
            {children}
            <TodoForm open={form.open} onSubmit={form.onSubmit} todo={form.todo} onClose={() => setForm({ ...form, open: false })} />
            <ConfirmationDialog
                open={confirmDialog.open}
                title={t.dialogs.delete.title}
                description={t.dialogs.delete.description}
                onClose={() => setConfirmDialog({ open: false })}
                onConfirm={() => confirmDialog.onConfirm()}
            />
        </TodosContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodosContext);
    if (!context) throw new Error('useTodosContext must be used within TodosProvider');
    return context;
}

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
    deleteTodo as deleteTodoApi,
    getTodos,
    postTodo,
    putTodo
} from '../api/todosApi';
import ConfirmationDialog from '../components/ConfirmationDialog';
import TodoForm from '../components/TodoForm';
import eng from '../locales/eng';
import {
    mapServerTodo,
    mapToServerPayload
} from '../utils/todoUtils';
import { ALERT_SEVERITIES, useAlert } from './AlertContext';

const TodosContext = createContext(null);

export function TodosProvider({ children, onReset = () => { } }) {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState(null);
    const [secret, setSecret] = useState('');
    const [form, setForm] = useState({ open: false });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, onConfirm: () => { } });

    const { showAlert } = useAlert();
    const localCounter = useRef(1);

    // Initialization: merge localStorage and server data
    useEffect(() => {
        async function initialize() {
            let localTodos = [];
            try {
                const raw = localStorage.getItem('todosAppState');
                localTodos = raw ? JSON.parse(raw).todos : [];
            } catch {
                showAlert(eng.notifications.readLocalError, ALERT_SEVERITIES.ERROR);
            }

            let serverTodos = [];
            try {
                const data = await getTodos();
                serverTodos = data.map(mapServerTodo);
            } catch {
                showAlert(eng.notifications.readServerError, ALERT_SEVERITIES.ERROR);
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
            localStorage.setItem(
                'todosAppState',
                JSON.stringify({ todos })
            );
        } catch {
            showAlert(eng.notifications.saveLocalError, ALERT_SEVERITIES.ERROR)
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
            showAlert(eng.notifications.savedLocal, ALERT_SEVERITIES.SUCCESS);
        } else {
            // server only
            try {
                const data = await postTodo(secret, { title, description, priority: mapToServerPayload({ title, description, priority }).priority });
                const serverTodo = mapServerTodo(data);
                setTodos(prev => [...prev, serverTodo]);
                showAlert(eng.notifications.savedServer, ALERT_SEVERITIES.SUCCESS);
            } catch (err) {
                var msg;
                if (err.response?.status === 404) {
                    msg = eng.notifications.notFoundServer;
                } else if (err.response?.status === 401) {
                    msg = eng.notifications.unauthorizedServer;
                } else {
                    msg = eng.notifications.badRequestServerError;
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
            showAlert(eng.notifications.savedLocal, ALERT_SEVERITIES.SUCCESS);
        } else {
            // server only
            try {
                const data = await putTodo(secret, id, mapToServerPayload(newState));
                const serverTodo = mapServerTodo(data);
                setTodos(prev => prev.map(t => t.id === id ? { ...newState, serverTodo } : t));
                showAlert(eng.notifications.savedServer, ALERT_SEVERITIES.SUCCESS);
            } catch (err) {
                var msg;
                if (err.response?.status === 404) {
                    msg = eng.notifications.notFoundServer;
                } else if (err.response?.status === 401) {
                    msg = eng.notifications.unauthorizedServer;
                } else {
                    msg = eng.notifications.badRequestServerError;
                }
                showAlert(msg, ALERT_SEVERITIES.ERROR);
            }
        }
    }

    const deleteTodo = async id => {
        const serverMatch = todos.find(t => t.id === id && t.origin === 'server');
        if (serverMatch && !secret) {
            showAlert(eng.notifications.modifyServerWithoutSecretError, ALERT_SEVERITIES.ERROR);
            return;
        }

        async function handleDelete() {
            if (!secret) {
                // local only
                if (serverMatch) {
                    showAlert(eng.notifications.modifyServerWithoutSecretError, ALERT_SEVERITIES.ERROR);
                } else {
                    setTodos(prev => prev.filter(t => t.id !== id));
                    showAlert(eng.notifications.savedLocal, ALERT_SEVERITIES.SUCCESS);
                }
            } else {
                // server only
                try {
                    await deleteTodoApi(secret, id);
                    setTodos(prev => prev.filter(t => t.id !== id));
                    showAlert(eng.notifications.savedServer, ALERT_SEVERITIES.SUCCESS);
                } catch (err) {
                    var msg;
                    if (err.response?.status === 404) {
                        msg = eng.notifications.notFoundServer;
                    } else if (err.response?.status === 401) {
                        msg = eng.notifications.unauthorizedServer;
                    } else {
                        msg = eng.notifications.badRequestServerError;
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
            showAlert(eng.notifications.unknownError, ALERT_SEVERITIES.ERROR);
            return;
        }

        if (todo && todo.origin === 'server' && !secret) {
            showAlert(eng.notifications.modifyServerWithoutSecretError, ALERT_SEVERITIES.ERROR);
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
            <TodoForm open={form.open} onSubmit={form.onSubmit} todo={form.todo} onClose={() => setForm({ open: false })} />
            <ConfirmationDialog
                open={confirmDialog.open}
                title="This action cannot be undone"
                description="All changes are permanent and cannot be recovered. Are you sure you want to continue?"
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

import axios from 'axios';

export async function getTodos() {
    const response = await axios.get('/api/todos');
    return response.data;
}

export async function postTodo(secret, payload) {
    const response = await axios.post(
        '/api/todos',
        payload,
        { headers: { Authorization: secret } }
    );
    return response.data;
}

export async function putTodo(secret, id, payload) {
    const response = await axios.put(
        `/api/todos/${id}`,
        payload,
        { headers: { Authorization: secret } }
    );
    return response.data;
}

export async function deleteTodo(secret, id) {
    const response = await axios.delete(
        `/api/todos/${id}`,
        { headers: { Authorization: secret } }
    );
    return response.data;
}

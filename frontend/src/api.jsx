// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

import axios from 'axios';

const API_URL = 'http://localhost:5555/api/todos';

export const fetchTodos = () => axios.get(API_URL);
export const fetchTodoById = (id) => axios.get(`${API_URL}/${id}`);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

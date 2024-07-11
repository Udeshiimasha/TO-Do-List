// TodoForm.jsx
import { useState } from 'react';
import { createTodo, updateTodo } from './api';
import { useSnackbar } from 'notistack';

function TodoForm({ closeModal, onFormSubmit, todo }) {
  const [title, setTitle] = useState(todo ? todo.title : '');
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [dueDate, setDueDate] = useState(todo ? todo.dueDate : '');
  const [completed, setCompleted] = useState(todo ? todo.completed : false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = { title, description, dueDate, completed };

    try {
      if (todo) {
        await updateTodo(todo._id, todoData);
      } else {
        await createTodo(todoData);
      }
      onFormSubmit();
      closeModal();
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className="todo-form-container">
      <h1>{todo ? 'Edit Task' : 'New Task'}</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Completed</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">{todo ? 'Update Task' : 'Create Task'}</button>
          <button type="button" onClick={closeModal}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;

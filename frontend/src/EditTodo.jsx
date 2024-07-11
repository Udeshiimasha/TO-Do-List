import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    api.get(`/todos/${id}`)
      .then(response => {
        const { title, description, dueDate, completed } = response.data;
        setTitle(title);
        setDescription(description);
        setDueDate(dueDate.split('T')[0]);
        setCompleted(completed);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/todos/${id}`, { title, description, dueDate, completed })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div>
          <label>Completed</label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTodo;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import axios from 'axios';
import { toast } from 'react-toastify';

function TodoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    api.get(`http://localhost:5555/api/todos/${id}`)
      .then(response => setTodo(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    api.delete(`http://localhost:5555/api/todos/${id}`)
      .then(() => {
        navigate('/');
      toast.success('Task deleted successfully!');
  })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
      <p>{todo.completed ? 'Completed' : 'Incomplete'}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default TodoDetails;

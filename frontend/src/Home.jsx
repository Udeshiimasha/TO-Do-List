import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import TodoForm from './TodoForm';
import "./Home.css";
import './TodoForm.css';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/todos/${id}`);
      fetchTodos();
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await axios.put(`http://localhost:5555/api/todos/${todo.id}`, { ...todo, completed: !todo.completed });
      fetchTodos();
      toast.success('Task status updated successfully!');
    } catch (error) {
      console.error('Error toggling complete status', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedTodo(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleFormSubmit = () => {
    fetchTodos();
    closeModal();
    toast.success('Task saved successfully!');
  };

  return (
    <>
    <div className='home-header'>
      <h1><span>t</span>o.<span>d</span>o</h1>
    </div>
      <div className="home">
        <h1>To-Do List</h1>
        <button onClick={openModal}>Add New Task</button>
        {Array.isArray(todos) && todos.length > 0 ? (
          <div className="todo-list">
            {todos.map((todo) => (
              <div className="todo" key={todo.id}>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                <span> - Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo)}
                  />
                  <Link to={`/details/${todo.id}`}>Details</Link>
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No todos available</p>
        )}
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Task Form">
          <TodoForm closeModal={closeModal} onFormSubmit={handleFormSubmit} todo={selectedTodo} />
        </Modal>
      </div>
    </>
  );
};

export default Home;

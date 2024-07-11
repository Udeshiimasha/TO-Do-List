import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import TodoForm from './TodoForm';

Modal.setAppElement('#root');

function TodoList({ todos, removeTodo, selectTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="todo-list">
      <button onClick={openModal}>Add New Task</button>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <span>{todo.text}</span>
            <div>
              <Link to={`/details/${todo.id}`} onClick={() => selectTodo(todo)}>Details</Link>
              <Link to={`/edit/${todo.id}`} onClick={() => selectTodo(todo)}>Edit</Link>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>No todos available</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="New Task"
      >
        <TodoForm closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default TodoList;

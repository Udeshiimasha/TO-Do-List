import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import TodoForm from './TodoForm';
import TodoDetails from './TodoDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<TodoForm />} />
        <Route path="/details/:id" element={<TodoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

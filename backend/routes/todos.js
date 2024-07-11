import express from 'express';
import {Todos} from '../models/Todo.js';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todos.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single todo
router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo);
});

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todos({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.put('/:id', getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }
  if (req.body.dueDate != null) {
    res.todo.dueDate = req.body.dueDate;
  }
  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: 'Deleted Todo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single todo by ID
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todos.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}

export default router;

const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization');
   // console.log('Authorization Header:', token);
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
     //console.log('Decoded Token:', decoded);
      req.user = decoded.id;
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err.message);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  

// CRUD
router.post('/', auth, async (req, res) => {
    const { title, deadline, type } = req.body;
    // Validate if all required fields are present
    if (!title || !deadline || !type) {
      return res.status(400).json({ message: "Please provide title, deadline, and task type." });
    }
    try {
      const task = new Task({
        user: req.user,
        title,
        deadline,
        type,
        completed: false 
      });
  
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error: error.message });
    }
  });
  

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
    const { title, completed, deadline, type } = req.body;
    // Validate if all required fields are provided
    if (!title || !deadline || !type) {
      return res.status(400).json({ message: "Please provide title, deadline, and task type." });
    }
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, completed, deadline, type }, 
        { new: true } 
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(task); 
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error: error.message });
    }
  });
  

router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;

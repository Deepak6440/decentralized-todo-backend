const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/User');
const router = express.Router();


//Register

router.post('/register', async (req,res) =>{
    try{
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message:'User Registered'})
    }catch(err){
        res.status(500).json({error:err.message})
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
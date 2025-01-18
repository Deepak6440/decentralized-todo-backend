const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    deadline: { 
        type: Date, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['Work', 'Personal', 'Study'],
        required: true 
    }
});

module.exports = mongoose.model('Task', TaskSchema);

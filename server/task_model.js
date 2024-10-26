const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: [true, "Please enter title for task"]
        },
        
        DueDate: {
            type: Date,
            required: false,
            default: null
        },

        Priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            required: false
        },

        Description: {
            type: String,
            required: false
        }
    }
);

const Task = mongoose.model('tasks', TaskSchema)
module.exports = Task;
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});
API_TOKEN = process.env.ASHLEY_CANVAS_KEY
DB_URI = process.env.MONGODB_URI

const Task = require('./task_model.js')

const app = express();
app.use(express.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Grab all the documents the Task model
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Grab one specific document from the Task model
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.put('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if (!task) {
            return res.status(404).json({message: "Task not found"})
        }
        const newTask = await Task.findById(id);
        res.status(200).json(newTask)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({message: "Task deleted successsfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(DB_URI).then(() => {
    console.log("Database connected")
    app.listen(3000, () => {
        console.log("Connected")
    })
})

app.get('/api/v1', async(req, res)=>{
    try {
        const assignments = [];
        const get_upcoming_assignments = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });
        const ass = await get_upcoming_assignments.json();
        for(var i = 0; i < ass.length; i++){
            assignments.push([ass[i]['title'], ass[i]['description'].replace(/<[^>]+>/g, '')])
        }
        console.log(assignments)
        res.json(assignments);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
});

module.exports = app;
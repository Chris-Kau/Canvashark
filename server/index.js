const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});
API_TOKEN = process.env.ASHLEY_CANVAS_KEY
DB_URI = process.env.MONGODB_URI

const app = express();
app.use(express.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(DB_URI).then(() => console.log("Database connected"))

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)

app.get("/db", async (req, res) => {
    try {
        const user = await UserModel.find({});
        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/v1/users/self/profile', async(req, res)=>{
    try {
        const assignments = [];
        ///api/v1/users/:user_id/courses/:course_id/assignments
        const get_upcoming_assignments = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });
        const ass = await get_upcoming_assignments.json();
        for(var i = 0; i < ass.length; i++){
            //ass[i]['description'].replace(/<[^>]+>/g, '')
            assignments.push([ass[i]['title']])
        }
        console.log(assignments)
        res.json(assignments);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
});
app.listen(3000, () => {
    console.log("Connected")
})

module.exports = app;
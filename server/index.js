const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://Phu:FVqAcUxlh7Gna8tl@cluster0.axeoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("Databaseconnectd"))

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)

app.get("/", async (req, res) => {
    try {
        const user = await UserModel.find({}).lean();
        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log("Connected")
})
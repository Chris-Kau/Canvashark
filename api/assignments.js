const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_TOKEN = process.env.CANVAS_KEY
app.use(express.json());
app.use(cors());


// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get('/api/users/self/upcoming_events', async(req, res)=>{
    try {
        const API_TOKEN = req.query.token
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
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
//app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
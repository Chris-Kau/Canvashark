// const express = require('express');
// const fetch = require('node-fetch');
// require('dotenv').config();

// const app = express();

// const API_TOKEN = process.env.CANVAS_KEY
// app.use(express.json());

// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.get('/api/v1', async(req, res)=>{
//     try {
//         const assignments = [];
//         const get_upcoming_assignments = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${API_TOKEN}`,
//                 'Content-Type': 'application/json'
//             },
//         });
//         const ass = await get_upcoming_assignments.json();
//         for(var i = 0; i < ass.length; i++){
//             assignments.push([ass[i]['title'], ass[i]['description'].replace(/<[^>]+>/g, '')])
//         }
//         console.log(assignments)
//         res.json(assignments);
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//     }
// });

// //app.listen(3000, () => console.log("Server ready on port 3000."));

// module.exports = app;
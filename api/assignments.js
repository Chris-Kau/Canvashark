import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const API_TOKEN = req.query.token;
            const assignments = [];

            const get_upcoming_assignments = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });

            const ass = await get_upcoming_assignments.json();
            console.log(ass)
            for (let i = 0; i < ass.length; i++) {
                if(ass[i]['assignment']){
                    if(ass[i]['description']){
                        assignments.push([ass[i]['title'], ass[i]['description'].replace(/<[^>]+>/g, ''), ass[i]['assignment']['due_at'], ass[i]['id']]);
                    }else{
                        assignments.push([ass[i]['title'], 'No available description', ass[i]['assignment']['due_at'], ass[i]['id']]);
                    }
                }
            }
            res.status(200).json(assignments);
        } catch (error) {
            console.error('Error fetching user profile: ', error);
        }
    }
}
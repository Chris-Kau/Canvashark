import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const API_TOKEN = req.query.token;
            const assignments = [];

            // Fetch the assignments from Canvas API
            const get_upcoming_assignments = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });

            const ass = await get_upcoming_assignments.json();
            for (let i = 0; i < ass.length; i++) {
                assignments.push([ass[i]['title'], ass[i]['description'].replace(/<[^>]+>/g, '')]);
            }

            console.log(assignments);
            res.status(200).json(assignments); // Send JSON response
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
}
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

            const upcomingAssignments = await get_upcoming_assignments.json();
            for (let i = 0; i < upcomingAssignments.length; i++) {
                if(upcomingAssignments[i]['assignment']){
                    let currentAssignment = upcomingAssignments[i];
                    if(currentAssignment['description']){
                        //store the assignments' info as a list with [title, description, due date]
                        assignments.push([currentAssignment['title'], currentAssignment['description'].replace(/<[^>]+>/g, ''), currentAssignment['assignment']['due_at']]);
                    }else{
                        assignments.push([currentAssignment['title'], 'No available description', currentAssignment['assignment']['due_at']]);
                    }
                }
            }
            res.status(200).json(assignments);
        } catch (error) {
            console.error('Error fetching user profile: ', error);
        }
    }
}
import fetch from 'node-fetch';
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const API_TOKEN = req.query.token;
            const assignments = [];
            //request to the csulb instructure api using the user's token as Authorization to gain access to their information.
            const get_upcoming_assignments = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            const upcomingAssignments = await get_upcoming_assignments.json();
            console.log(upcomingAssignments);
            //go through every upcoming assignment and add its information to the assignments list
            //each assignment is stored as a list with 3 elements: title, description, and due date
            for (let i = 0; i < upcomingAssignments.length; i++) {
                if(upcomingAssignments[i]['assignment']){
                    let currentAssignment = upcomingAssignments[i];
                    assignments.push([
                        currentAssignment['context_name'].concat(': ',currentAssignment['title']), 
                        currentAssignment['description'].replace(/<[^>]+>/g, '') || "No available description",
                        currentAssignment['assignment']['due_at']
                    ]);
                }
            }
            res.status(200).json(assignments);
        } catch (error) {
            console.error('Error fetching user profile: ', error);
        }
    }
}
// import dotenv from 'dotenv';
// dotenv.config();
// const API_TOKEN = process.env.CANVAS_KEY;
async function Test() {
    let get_token = document.getElementById("inputToken")
    let API_TOKEN = get_token.value
    try {
        // const response = await fetch('https://canvashark.vercel.app/api/v1', {
        //     method: 'GET',
        // });
        const response = await fetch(`https://csulb.instructure.com/api/v1/users/self/upcoming_events`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
        }

        const data = await response.json();
        console.log('User Profile courses:', data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}
document.getElementById("importButton").addEventListener("click", Test)
async function Test() {
    let get_token = document.getElementById("inputToken")
    let API_TOKEN = get_token.value
    try {
        const response = await fetch(`/api/v1/users/self/upcoming_events?token=${API_TOKEN}`, {
            method: 'GET',
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
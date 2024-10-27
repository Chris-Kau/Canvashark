async function Test() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/', {
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
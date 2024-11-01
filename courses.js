async function Test() {
    const API_TOKEN = document.getElementById("inputToken").value;
    try {
        const response = await fetch(`/api/assignments?token=${API_TOKEN}`);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
        }
        const data = await response.json();
        console.log(`API TOKEN: ${API_TOKEN}`)
        localStorage.setItem('upcomingEvents', JSON.stringify(data))
        //console.log('Upcoming events:', data);
        return data;
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
    }
}
document.getElementById("importButton").addEventListener("click", Test)
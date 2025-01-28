async function Test() {
    const API_TOKEN = document.getElementById("inputToken").value;
    localStorage.setItem("API_TOKEN", API_TOKEN)
    try {
        const response = await fetch(`/api/assignments.js?token=${localStorage.getItem("API_TOKEN")}`);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
        }
        const data = await response.json();
        localStorage.setItem('upcomingEvents', JSON.stringify(data))
        importedCanvasAssignments();

        return data;
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
    }
}

document.getElementById("importButton").addEventListener("click", Test)
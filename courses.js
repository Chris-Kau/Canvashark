async function importCanvas() {
    const API_TOKEN = document.getElementById("inputToken").value;
    localStorage.setItem("API_TOKEN", API_TOKEN)
    try {
        //call to the assignments.js file that does the handling of retreiving from the API
        const response = await fetch(`/api/assignments.js?token=${localStorage.getItem("API_TOKEN")}`);

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
        }
        const data = await response.json();
        //store the data to local storage and call the importedCanvasAssignments to update the tasks on the user interface
        localStorage.setItem('upcomingEvents', JSON.stringify(data))
        importedCanvasAssignments();
        return data;
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
    }
}

document.getElementById("importButton").addEventListener("click", importCanvas)
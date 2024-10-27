let tasks = JSON.parse
    (localStorage.getItem('tasks')) || [];
let upcomingEvents = JSON.parse
    (localStorage.getItem('upcomingEvents')) || [];

document.addEventListener
    ("DOMContentLoaded", function () {
        renderTasks();
    });

function getTasks(id) {
    const task = tasks.find(task => task.id === id)
    if (task) {
        return task
    } else {
        console.log("Task not found")
    }
}

function updateTaskTag(taskId, newTag) {
    console.log(taskId);
    console.log(newTag)
    if (newTag === "") {
        return
    }

    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, tag: newTag }; // Update the tag for the specific task
        }
        return task;
    });
    updateLocalStorage(); // Save the updated tasks array to localStorage
    renderTasks(); // Re-render the tasks to show the updated tag
}

// Function to render tasks on the board, updated w task details
function renderTasks() {
    const columns = ['Todo', 'In-progress', 'Done'];
    columns.forEach(columnId => {
        const column = document.getElementById(columnId);
        column.querySelector('.task-container').innerHTML = '';

        tasks.forEach(task => {
            if (task.status === columnId) {
                const taskElement = createTaskElement(
                    task.content, 
                    task.id,
                    task.description,
                    task.date,
                    task.tag,
                    columnId,
                );
                column.querySelector('.task-container').appendChild(taskElement);
            }
        });
    });
}



// modal stuffs -------
function openTaskModal() {
    document.getElementById("taskModal").style.display = "block";
}

function openEditModal() {
    document.getElementById("editModal").style.display = "block";
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

function addTaskWithDetails() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const date = document.getElementById("taskDate").value;
    var tag = document.getElementById("taskTag").value.trim();
    // const status = compareDateToToday(date)
    if (tag === "") {
        tag = "Short task"
    }

    if (title !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            content: title,
            description: description,
            date: date,
            tag: tag,
            status: "Todo" // Default to 'Todo' or modify as needed
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        closeTaskModal();
        clearTaskModalFields();
    }
}

function editTaskWithDetails() {
    const title = document.getElementById("editTitle").value.trim();
    const description = document.getElementById("editDescription").value.trim();
    const date = document.getElementById("editDate").value;
    const tag = document.getElementById("editTag").value.trim();
    const id = document.getElementById("editTag").className
    const task = getTasks(id)
    console.log(task)

    
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                content: title,
                date: date,
                description: description,
                id: task.id,
                status: task.status,
                tag: tag
            }; // Update task
        }
        return task;
    });
    updateLocalStorage();
    renderTasks();
    closeEditModal();
    clearEditModalFields();
}


function clearTaskModalFields() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTag").value = "";
}

function clearEditModalFields() {
    document.getElementById("editTitle").value = "";
    document.getElementById("editDescription").value = "";
    document.getElementById("editDate").value = "";
    document.getElementById("editTag").value = "";
}



function createTaskElement(content, id, description, date, tag, colname) {
    const task = document.createElement("div");
    const durations = ['Short task', 'Medium task', "Long task"]
    let dindex = durations.indexOf(tag)

    task.id = id;
    task.className = `task${colname}`;
    task.draggable = true;
    task.innerHTML = `
        <h3>${content}</h3>
        <p class="description">${description}</p>
        <p class="date">
            <img class="icons" src='./asset/Calendar.webp'></img>
            ${date ? new Date(date).toLocaleString() : ""}
        </p>
        <span class="${(tag ? `${tag}` : "").replace(" ", '')}">${tag ? `${tag}` : ""}</span>  
        <span class="delete-btn" onclick="deleteTask('${id}')">X</span>
        <span class="edit-btn" onclick="editTask('${id}')">
            <img class="icons" src='./asset/764599.png'></img>
        </span>
    `;
    //<Select id="changeTaskTag" onChange="updateTaskTag('${id}', this.value)">
    //     <option value="${durations[dindex]}">${durations[dindex]}</option>
    //     <option value="${durations[(dindex + 1) % 3]}">${durations[(dindex + 1) % 3]}</option>
    //     <option value="${durations[(dindex + 2) % 3]}">${durations[(dindex + 2) % 3]}</option>
    // </Select>
    // <p class="tag">${tag ? `${tag}` : ""}</p>
    // <span class="delete-btn" onclick="deleteTask('${id}')">X</span>

    task.addEventListener("dragstart", drag);
    return task;
}

function editTask(id) {
    console.log(id)
    const task = getTasks(id)
    console.log(task)
    
    openEditModal()
    // const title = document.getElementById("editTitle").value.trim();
    document.getElementById("editTitle").value = task.content;
    document.getElementById("editDescription").value = task.description;
    document.getElementById("editDate").value = task.date;
    document.getElementById("editTag").value = task.tag;
    document.getElementById("editTag").className = task.id;
}
// -----


// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.
        filter(task => task.id !== taskId);
    upcomingEvents = upcomingEvents.filter(uE => uE.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.
        setData("text/plain", event.target.id);
}

function drop(event, columnId) {
    event.preventDefault();
    // console.log(columnId)
    const data = event.
        dataTransfer.getData("text/plain");
    const draggedElement =
        document.getElementById(data);
    // console.log(draggedElement)
    if (draggedElement) {
        const taskStatus = columnId;
        updateTaskStatus(data, taskStatus);
        event.target.querySelector('.task-container').
            appendChild(draggedElement);
        draggedElement.className = `task${taskStatus}`
    }
}

function addTask(columnId) {
    const taskInput =
        document.getElementById('taskInput');
    const taskContent = taskInput.value.trim();
    if (taskContent !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            content: taskContent,
            status: columnId
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
}

// Function to update task status 
// when moved to another column
function updateTaskStatus(taskId, newStatus) {
    // console.log(newStatus)
    tasks = tasks.map(task => {
        // console.log(task)
        // console.log(taskId)
        const testtask = getTasks('task-1730006093306')
        // console.log(testtask)
        if (task.id === taskId) {
            // console.log("inside if")
            return { ...task, status: newStatus };
        }
        return task;
    });
    updateLocalStorage();
}

// Function to update local 
// storage with current tasks
function updateLocalStorage() {
    console.log("task update ")
    localStorage.setItem
        ('tasks', JSON.stringify(tasks));
    localStorage.setItem
        ('upcomingEvents', JSON.stringify(upcomingEvents))
}

// function compareDateToToday(date){
//     let date1 = new Date(Date.now())
//     let date2 = new Date(date)
//     let Difference_In_Days = Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
//     if (Difference_In_Days <= 3 && Difference_In_Days >= 1){
//         return "due-soon"
//     }else if(Difference_In_Days < 1){
//         return "due-today"
//     }else{
//         return "upcoming"
//     }
// }

function importedCanvasAssignments(){
    const data = JSON.parse(localStorage.getItem('upcomingEvents'));
    console.log(data);
    for(var i =0; i < data.length; i++){
        const title = data[i][0]
        const description = data[i][1]
        const date = data[i][2].toLocaleString('en-US')
        const tag = "Short task"
        const status = "Todo"
        if (title !== "") {
            const newTask = {
                id: "task-" + data[i][3],
                content: title,
                description: description,
                date: date,
                tag: tag,
                status: status // Default to 'due-today' or modify as needed
            };
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
    }
}
}
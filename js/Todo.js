//Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

//Get Tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('mytasks')) || [];
//Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('mytasks', JSON.stringify(tasks));
}

//Add Task
function addTask(taskText) {
    const newTask = { text: taskText, completed: false, id: generatedId() };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

//Generate unique ID
function generatedId() {
    return '_' + Math.random().toString(30).substr(2, 9);
}

//Toggle Task status
function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}

//Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

//Edit Task
function editTask(id, newText) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            //preserve completed status
            return { ...task, text: newText };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

//Render Tasks
function renderTasks() {
    taskList.innerHTML = ''; //clear existing tasks
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        // Task text span
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        textSpan.style.flex = '1';
        li.appendChild(textSpan);

        // Add completed class if task is completed
        if (task.completed) {
            li.classList.add('done');
        }

        // Toggle task on click
        textSpan.addEventListener('click', () => toggleTask(task.id));

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Task';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent li/text click event
            const newText = prompt('Edit Task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                editTask(task.id, newText.trim());
            }
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent li/text click event
            deleteTask(task.id);
        });

        // Button container for right alignment
        const btnContainer = document.createElement('span');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '5px';
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);

        taskList.appendChild(li);
    });
}

//Event listener for adding task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; //Clear input
    }
});

//Initial render
renderTasks();

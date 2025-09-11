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
    tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
    saveTasks();
    renderTasks();
    // console.log('Before Edit:', tasks);
    // console.log('After Edit:', tasks);
}

//Render Tasks
function renderTasks() {
    taskList.innerHTML = ''; //clear existing tasks
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.setAttribute('data-id', task.id);

        //Add completed class if task is completed  
        if (task.completed) {
            li.classList.add('done');
        }

        //Toggle task on click
        li.addEventListener('click', () => toggleTask(task.id));

        //Add edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Task';
        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit Task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                editTask(task.id, newText.trim());
            }
        });
        li.appendChild(editBtn);

        //Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); //Prevent li click event
            deleteTask(task.id)
        });
        li.appendChild(deleteBtn);
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

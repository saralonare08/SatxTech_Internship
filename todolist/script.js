// script.js

// Load saved tasks
window.onload = () => {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const task = {
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  taskInput.value = '';
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = getTasks();
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function loadTasks() {
  renderTasks();
}


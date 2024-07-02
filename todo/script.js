const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const activeTasks = document.querySelector('.active-tasks');
const completedTasks = document.querySelector('.completed-tasks');
const taskCount = document.getElementById('taskCount');
const doneCount = document.getElementById('doneCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  activeTasks.innerHTML = '';
  completedTasks.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    if (task.completed) {
      taskDiv.classList.add('completed');
    }

    const label = document.createElement('label');
    label.textContent = task.text;
    label.addEventListener('click', () => toggleTask(index));

    const checkIcon = document.createElement('img');
    checkIcon.src = 'svg/Check.svg';
    checkIcon.alt = 'Check';
    checkIcon.classList.add('check');
    checkIcon.addEventListener('click', () => toggleTask(index));

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'svg/TrashSimple.svg';
    deleteIcon.alt = 'Trash';
    deleteIcon.addEventListener('click', () => deleteTask(index));

    taskDiv.appendChild(label);
    taskDiv.appendChild(checkIcon);
    taskDiv.appendChild(deleteIcon);

    if (task.completed) {
      completedTasks.appendChild(taskDiv);
    } else {
      activeTasks.appendChild(taskDiv);
    }
  });

  taskCount.textContent = tasks.filter(task => !task.completed).length;
  doneCount.textContent = tasks.filter(task => task.completed).length;
  saveTasksToLocalStorage();
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

renderTasks();
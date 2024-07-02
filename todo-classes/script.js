class Task {
  constructor({ text, completed }) {
    this.text = text;
    this.completed = completed || false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

class TaskManager {
  constructor() {
    this.tasks = this.getAllTasks() || [];
    this.activeTasksContainer = document.querySelector('.active-tasks');
    this.completedTasksContainer = document.querySelector('.completed-tasks');
    this.taskCountElement = document.getElementById('taskCount');
    this.doneCountElement = document.getElementById('doneCount');
    try {
      this.renderTasks();
    } catch (error) {
      console.error('Ошибка при отрисовке задач:', error);
    }
  }

  addTask(task) {
    this.tasks.push(task);
    this.renderAndSaveTasks();
  }

  toggleTask(index) {
    this.tasks[index].toggleCompleted();
    this.renderAndSaveTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderAndSaveTasks();
  }

  renderAndSaveTasks() {
    this.renderTasks();
    this.saveTasks();
  }

  renderTasks() {
    this.activeTasksContainer.innerHTML = '';
    this.completedTasksContainer.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      if (task.completed) {
        taskDiv.classList.add('completed');
      }

      const label = document.createElement('label');
      label.textContent = task.text;
      label.addEventListener('click', () => this.toggleTask(index));

      const checkIcon = document.createElement('img');
      checkIcon.src = 'svg/Check.svg';
      checkIcon.alt = 'Check';
      checkIcon.classList.add('check');
      checkIcon.addEventListener('click', () => this.toggleTask(index));

      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'svg/TrashSimple.svg';
      deleteIcon.alt = 'Trash';
      deleteIcon.addEventListener('click', () => this.deleteTask(index));

      taskDiv.appendChild(label);
      taskDiv.appendChild(checkIcon);
      taskDiv.appendChild(deleteIcon);

      if (task.completed) {
        this.completedTasksContainer.appendChild(taskDiv);
      } else {
        this.activeTasksContainer.appendChild(taskDiv);
      }
    });

    this.taskCountElement.textContent = this.tasks.filter(task => !task.completed).length;
    this.doneCountElement.textContent = this.tasks.filter(task => task.completed).length;
  }

  saveTasks() {
    localStorage.setItem('taskManager_tasks', JSON.stringify(this.tasks));
  }

  getAllTasks() {
    const storedTasks = localStorage.getItem('taskManager_tasks');
    try {
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error('Ошибка при разборе задач из локального хранилища:', error);
      return [];
    }
  }
}

const taskManager = new TaskManager();

taskManager.addTask(new Task({ text: "Hello", completed: false }));
taskManager.addTask(new Task({ text: "Hello1", completed: false }));
taskManager.addTask(new Task({ text: "Hello2", completed: false }));

// taskManager.toggleTask(0);
taskManager.toggleTask(1);
// taskManager.toggleTask(2);

// taskManager.deleteTask(0);
// taskManager.deleteTask(1);
taskManager.deleteTask(2);

const allTasks = taskManager.getAllTasks();
console.log(allTasks);


// console.log(JSON.stringify(allTasks));

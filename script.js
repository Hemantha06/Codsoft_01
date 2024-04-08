document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    loadTasks();
  
    // Add task event
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
      }
    });
  
    // Delete or edit task event (event delegation)
    taskList.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        saveTasks();
      } else if (e.target.classList.contains('edit')) {
        const taskItem = e.target.parentElement.parentElement;
        const taskTextElement = taskItem.querySelector('.task-text');
        const newText = prompt('Edit task:', taskTextElement.textContent.trim());
        if (newText !== null) {
          taskTextElement.textContent = newText.trim();
          saveTasks();
        }
      } else if (e.target.classList.contains('checkbox')) {
        const taskTextElement = e.target.nextElementSibling;
        taskTextElement.classList.toggle('completed');
        saveTasks();
      }
    });
  
    function addTask(taskText) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task-text">${taskText}</span>
        <div class="actions">
          <button class="delete">Delete</button>
          <button class="edit">Edit</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  
    function saveTasks() {
      const tasks = [];
      document.querySelectorAll('#task-list .task-text').forEach(function(task) {
        tasks.push({
          text: task.textContent.trim(),
          completed: task.classList.contains('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        tasks.forEach(function(task) {
          addTask(task.text);
          if (task.completed) {
            const taskTextElement = taskList.lastElementChild.querySelector('.task-text');
            taskTextElement.classList.add('completed');
          }
        });
      }
    }
  });
  
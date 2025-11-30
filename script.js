document.addEventListener('DOMContentLoaded', function(){
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            JSON.parse(stored).forEach(text => createTaskItem(text));
        }
    }

    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText + ' ';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if(taskText === ''){
            alert("Please Enter a task!");
            return;
        }

        createTaskItem(taskText);
        saveTasks();

        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
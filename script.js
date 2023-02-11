let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Hey I Am TODO-List');

function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="task-container">
            <div class="task">
                <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
                <label for="${task.id}"> ${task.text}</label>
            </div>
            <div class="delete-img">
                <img src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" class="delete" data-id="${task.id}" />
            </div>
        </div>
        `;
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === taskId;
    })

    if (task.length > 0) {
        const currentTaks = task[0];

        currentTaks.done = !currentTaks.done;
        renderList();
        showNotification('Task Completed Sucessfully')
    }
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    })

    tasks = newTasks;
    renderList();
    showNotification('Task Deleted Successfully')
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task Added Successfully');
        return;
    }

    showNotification('Task can not be added')
}

function showNotification(text) {
    alert(text);
}

function handelInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        console.log('text', text);

        if (!text) {
            showNotification('Task can not be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
}

function handelClickListener(e) {
    const target = e.target;
    console.log(target);

    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
    }
}


addTaskInput.addEventListener('keyup', handelInputKeypress);
document.addEventListener('click', handelClickListener);
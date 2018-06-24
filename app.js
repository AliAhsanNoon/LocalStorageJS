

const filter = document.querySelector('#filter');
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners() {

    form.addEventListener('submit', addNewTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearItemList);
    filter.addEventListener('keyup', filterList);
    // document.addEventListener('DOMContentLoaded', getTasks);

}

function addNewTask(e) {
    if (taskInput.value === '') {
        alert('Add New Task');
    }
    else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

        taskInput.value = '';

        storeTaskInLocalStorage(taskInput.value);
        e.preventDefault();
    }
}
// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }
}

function clearItemList(e) {

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function filterList(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}
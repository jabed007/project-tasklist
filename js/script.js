// Define UI Element

//alert("Hello World");

let form = document.querySelector("#task-form");
let newTask = document.querySelector("#new-task");
let filterTask = document.querySelector("#filter-task");
let taskList = document.querySelector("ul");
let clearTask = document.querySelector("#clear-task");

// Define Event Listener
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTask.addEventListener("click", clearTaskList);
filterTask.addEventListener("keyup", filterTaskList);
document.addEventListener("DOMContentLoaded", getTasks);

// Define Function
// Add Task Function
function addTask(e) {
  if (newTask.value === "") {
    alert("Plese Add a task");
  } else {
    // Create li Element
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(newTask.value + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(newTask.value);
    newTask.value = "";
  }
  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let ele = e.target.parentElement;
      ele.remove();
	  removeTaskFromLS(ele);
    }
  }
}

// Clear Task
function clearTaskList(e) {
  //taskList.innerHTML = "";
  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

// Filter Task List
function filterTaskList(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(task => {
	let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeTaskFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
	  if (li.textContent.trim() === task) {
		  tasks.splice(index, 1);
	  }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

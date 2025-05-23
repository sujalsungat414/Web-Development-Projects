// Get references to the DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load saved tasks from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos in the UI
function renderTodos() {
  todoList.innerHTML = ""; // Clear the current list
  if (todos.length === 0) {
    // Display message if no tasks are present
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "You have no tasks, add one!";
    emptyMessage.style.color = "#bbb";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.marginTop = "1rem";
    todoList.appendChild(emptyMessage);
    return;
  }
  // Loop through todos and create list items
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.setAttribute("data-index", index);

    const label = document.createElement("label");
    label.className = "task-label";
    label.textContent = todo.task;
    label.tabIndex = 0;
    label.setAttribute("aria-checked", todo.completed);
    label.setAttribute("role", "checkbox");
    // Event listeners for keyboard and click actions
    label.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        toggleTask(index);
        e.preventDefault();
      }
    });
    label.addEventListener("click", () => toggleTask(index));

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.innerHTML = "&times;"; // Delete button symbol
    deleteBtn.addEventListener("click", () => deleteTask(index));

    actionsDiv.appendChild(deleteBtn);
    li.appendChild(label);
    li.appendChild(actionsDiv);
    todoList.appendChild(li);
  });
}

// Function to add a new task
function addTask(task) {
  todos.push({ task, completed: false });
  saveTodos();
  renderTodos();
}

// Function to toggle the completion status of a task
function toggleTask(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Function to delete a task
function deleteTask(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Event listener for form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    todoInput.value = ""; // Clear input field
    todoInput.focus(); // Focus back on input
  }
});

// Initial render of todos
renderTodos();

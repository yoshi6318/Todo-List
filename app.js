//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listner
document.addEventListener("DOMContentLoaded", getTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Function
function addTodo(e) {
  //prevent form from submitting
  event.preventDefault();
  //create div .todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  //add todo into local strage
  saveLocalTodo(todoInput.value);
  //check button
  const checkButton = document.createElement("button");
  checkButton.classList.add("check-btn");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(checkButton);
  //trash  button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);
  //append list
  todoList.appendChild(todoDiv);
  //clear todoInput value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete btn
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    //remove from local strage
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  //check btn
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complated");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complated":
        if (todo.classList.contains("complated")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplated":
        if (!todo.classList.contains("complated")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  //check "do I already have that todo?""
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //save todo into local strage
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//reload todo-list from localstrage
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //copied most parts below from function of addTodo
  todos.forEach(function (todo) {
    //create div .todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    //check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkButton);
    //trash  button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    //append list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //get innertext and index of it
  const todoIndex = todo.children[0].innerText;
  //remove specific innertext by using index number
  todos.splice(todos.indexOf(todoIndex), 1);
  //↑ setItem(remove) from local strage
  localStorage.setItem("todos", JSON.stringify(todos));
}

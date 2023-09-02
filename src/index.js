//import { removeChildren } from "/utils/index.js";

// initial todos
const form = document.querySelector(".form");
const addButton = document.querySelector(".addButton");
const inputField = document.querySelector(".inputField");
const todoList = document.querySelector(".todoList");
const clearDoneButton = document.querySelector(".clearDoneButton")

let todos = [
  {
    todoID: 0,
    todoName: "Finish Homework",
    todoStatus: "Completed",
    todoCategory: "School",
    todoComplete: true,
    todoDueDate: "Sept 2, 2023",
  },
  {
    todoID: 1,
    todoName: "Groceries",
    todoStatus: "Open",
    todoCategory: "Chores",
    todoComplete: false,
    todoDueDate: "Sept 5, 2023",
  },
  {
    todoID: 2,
    todoName: "Clean the house",
    todoStatus: "Open",
    todoCategory: "Chores",
    todoComplete: false,
    todoDueDate: "Sept 3, 2023",
  },
  {
    todoID: 3,
    todoName: "Real Salt Lake game",
    todoStatus: "Open",
    todoCategory: "Dates",
    todoComplete: false,
    todoDueDate: "Sept 2, 2023",
  },
];

addButton.addEventListener("click", () => {
  const todoText = inputField.value.trim();
  if (todoText !== "") {
    const newTodo = {
      todoID: todos.length,
      todoText: todos.todoName,
      todoStatus: "Open",
      todoCategory: todos.todoCategory, 
      todoComplete: false,
      todoDueDate: todos.todoDueDate, 
    };

    todos.forEach((todo) => {
      const row = document.createElement("li");
      row.className = todo.todoComplete ? false : "";
      row.innerHTML = `
        ${todo.todoText}
        <span class="deleteBtn"><i class="fa fa-trash"></i></span>
      `;
  
      todoList.appendChild(row);
    });
  }
  
    todos.push(newTodo);
    inputField.value = '';
    const newTodoElement = document.createElement('li');
    newTodoElement.textContent = newTodo.todoText;
    todoList.appendChild(newTodoElement);
  });

  todoList.appendChild('.todoList')

function updateTable() {
  // Clear the previous content
  output.textContent = "";

  // Display the todos in the output element
  todos.forEach((todo) => {
    output.textContent += `${todo.todoID}: ${todo.todoText}\n`;
  });
}
todos.forEach((todo) => {
      const row = document.createElement("li");
      row.className = todo.todoComplete ? "done" : "";
      row.innerHTML = `
        ${todo.todoText}
        <span class="deleteBtn"><i class="fa fa-trash"></i></span>
      `;

      todoTable.appendChild(row);
    });

  clearDoneButton.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.todoComplete);
    updateTable();
  });

  function updateTable() {
    todoTable.innerHTML = "";

    todos.forEach((todo) => {
      const row = document.createElement("li");
      row.className = todo.todoComplete ? "done" : "";
      row.innerHTML = `
        ${todo.todoText}
        <span class="deleteBtn"><i class="fa fa-trash"></i></span>
      `;

      todoTable.appendChild(row);
    });
  }


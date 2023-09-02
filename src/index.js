//import { removeChildren } from "/utils/index.js";

// initial todos

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

document.addEventListener("click", () => {
  const inputField = document.querySelector(".inputField");
  const addButton = document.querySelector(".addButton");
  const todoTable = document.querySelector(".todoList");
  const pendingTasksCount = document.querySelector(".footer span");
  const clearDoneButton = document.querySelector(".footer button");

  addButton.addEventListener("click", () => {
    const todoText = inputField.value.trim();
    if (todoText !== "") {
      const newTodo = {
        todoID: todos.length,
        todoText: todoText,
        todoStatus: todoStatus,
        todoCategory: todoCategory,
        todoComplete: false,
        todoDueDate: todoDueDate,
      };
      todos.push(newTodo);
      inputField.value = "";
      updateTable();
    }
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
});

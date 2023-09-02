import "./styles.css";
import { removeChildren } from "../utils/index.js";

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

const inputField = document.querySelector('.inputField')
const todoList = document.querySelector('.todoList')

const addButton = document.createElement('button');
addButton.textContent = 'Add Task';
inputField.appendChild(addButton);

addButton.addEventListener('click', async () => {
  const todoName = inputField.value.trim();
  if (todoName.length > 0) {
    // Create a new task object
    const newTask = {
      todoID: todos.length,
      todoName,
      todoStatus: "Open",
      todoCategory: "Uncategorized",
      todoComplete: false,
      todoDueDate: "Not specified",
    };

    // Add the new task to the todos array
    todos.push(newTask);

    // Clear the input field
    inputField.value = '';

    // You can also update the UI to display the new task here
    // For example, create a new HTML element to represent the task and append it to the todoList
    const newTaskElement = document.createElement('div');
    newTaskElement.textContent = newTask.todoName;
    todoList.appendChild(newTaskElement);
  }
});



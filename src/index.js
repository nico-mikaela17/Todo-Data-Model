let form = document.querySelector("#taskForm");
let clearDoneButton = document.querySelector("#clearDoneButton");
let taskCategory = document.querySelector("#taskCategory");

let categories = [
  { name: "School", color: "#275d38" },

  { name: "Work", color: "#0065A4" },

  { name: "Chores", color: "#ffd60a" },

  { name: "Dates", color: "#c9184a" },
];

let todos = [
  {
    todoID: 0,
    todoName: "Finish Homework",
    todoCategory: categories[0],
    todoComplete: true,
    todoDueDate: "2023-09-02",
  },
];

function showCategories() {
  taskCategory.innerHTML = '<option value="">Please Select</option>';

  for (let category in categories) {
    let newCategoryName = document.createElement("option");
    newCategoryName.value = categories[category].name;
    newCategoryName.textContent = categories[category].name;

    taskCategory.appendChild(newCategoryName);
  }
}

showCategories();

function showTasks() {
  let todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";

  for (let task in todos) {
    //loop
    let taskItem = document.createElement("article"); //create item
    taskItem.style.backgroundColor = todos[task].todoCategory.color

    let taskName = document.createElement("h3");
    taskName.textContent = todos[task].todoName; //add text content
    taskItem.appendChild(taskName);

    let taskCategory = document.createElement("h4");
    taskCategory.textContent = todos[task].todoCategory.name;
    taskItem.appendChild(taskCategory);

    let taskDate = document.createElement("p");
    taskDate.textContent = todos[task].todoDueDate;
    taskItem.appendChild(taskDate);


    todoList.appendChild(taskItem);
  }
}

showTasks();

let createBtn = document.querySelector("#createTask");

function createTask() {
  let newText = document.querySelector("#tName");
  let dueDate = document.querySelector("#dueDate");
  let newCategory = {}
  
  for(let category in categories) {
    if (taskCategory.value === categories[category].name) {
      newCategory = categories[category]
    }
  }

  let newTodo = {
    todoID: todos.length,
    todoName: newText.value,
    todoCategory: newCategory,
    todoComplete: false,
    todoDueDate: dueDate.value,
  };

  todos.push(newTodo);
  console.log(todos);
  showTasks();
}

createBtn.addEventListener("click", () => {
  createTask();
});

let createCategoryBtn = document.querySelector("#createCategoryBtn");

function createNewCategory() {
  let newCategoryItem = document.querySelector("#newCategoryItem");
  let colorCategory = document.querySelector("#colorCategory");

  let newCategory = {
    name: newCategoryItem.value,
    color: colorCategory.value,
  };

  categories.push(newCategory);
  console.log(categories);
  showCategories()
}

createCategoryBtn.addEventListener("click", () => {
  createNewCategory();
});

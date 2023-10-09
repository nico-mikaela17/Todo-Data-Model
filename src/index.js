let form = document.querySelector("#taskForm");

let categories = [
  { name: "School", color: "#275d38"},

  { name: "Work", color: "#0065A4" },

  { name: "Chores", color: "#9d4edd" },

  { name: "Dates", color: "#c9184a" },
];

//delete:'<i class="fa-solid fa-trash-can"></i>'

let todos = [
  {
    todoID: 0,
    todoName: "Finish Homework",
    todoCategory: categories[0],
    todoComplete: false,
    todoDueDate: "2023-09-02",
  },
  {
    todoID: 1,
    todoName: "Collections List",
    todoCategory: categories[1],
    todoComplete: false,
    todoDueDate: "2023-09-18",
  },
  {
    todoID: 2,
    todoName: "Mop the kitchen",
    todoCategory: categories[2],
    todoComplete: false,
    todoDueDate: "2023-09-13",
  },
  {
    todoID: 3,
    todoName: "Trip to Maryland",
    todoCategory: categories[3],
    todoComplete: false,
    todoDueDate: "2023-09-21",
  },
];

function showCategories() {
  let taskCategory = document.querySelector("#taskCategory");
  taskCategory.innerHTML = '<option value="">Please Select</option>';

  for (let category in categories) {
    let newCategoryName = document.createElement("option");
    newCategoryName.value = categories[category].name;
    newCategoryName.textContent = categories[category].name;

    taskCategory.appendChild(newCategoryName);
  }
}
showCategories();

function deleteCategories() {
  let taskCategory = document.querySelector("#deleteCategorySelection");
  taskCategory.innerHTML = '<option value="">Please Select</option>';

  for (let category in categories) {
    let categoryName = document.createElement("option");
    categoryName.value = categories[category].name;
    categoryName.textContent = categories[category].name;

    taskCategory.appendChild(categoryName);
  }

}
deleteCategories()

function editCategories() {
  let taskCategory = document.querySelector("#editCategorySelection");
  taskCategory.innerHTML = '<option value="">Please Select</option>';

  for (let category in categories) {
    let categoryName = document.createElement("option");
    categoryName.value = categories[category].name;
    categoryName.textContent = categories[category].name;

    taskCategory.appendChild(categoryName);
  }

}
editCategories()

function countIncompleteTasks() {
  let count = 0;
  for (let task in todos) {
    if (todos[task].todoComplete === false) {
      count++;
    }
  }
  return count;
}

function showTasks() {
  let todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";

  for (let task in todos) {
    //creation of the article/task
    //loop
    let taskItem = document.createElement("article"); //create item
    if (todos[task].todoComplete === true) {
      taskItem.style.color = "#000";
    } else {
      taskItem.style.color = todos[task].todoCategory.color;
    }
    taskItem.contentEditable = true;

    let removeTaskBtn = document.createElement("button"); //delete button
    removeTaskBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    if (todos[task].todoComplete === true) {
      removeTaskBtn.style.color = "#000";
    } else {
      removeTaskBtn.style.color = todos[task].todoCategory.color;
    }
    removeTaskBtn.style.border = "none";
    removeTaskBtn.style.float = "right";
    removeTaskBtn.style.cursor = "pointer";
    removeTaskBtn.onclick = function () {
      removeTaskFromList(todos[task].todoID);
    };
    taskItem.appendChild(removeTaskBtn);

    let taskName = document.createElement("h3");
    taskName.textContent = todos[task].todoName; //task title

    if (todos[task].todoComplete === true) {
      taskName.style.color = "#000";
    } else {
      taskName.style.color = todos[task].todoCategory.color;
    }

    taskItem.appendChild(taskName);

    let taskCategory = document.createElement("h4"); //task category
    taskCategory.textContent = todos[task].todoCategory.name;
    if (todos[task].todoComplete === true) {
      taskCategory.style.color = "#000";
    } else {
      taskCategory.style.color = todos[task].todoCategory.color;
    }
    taskItem.appendChild(taskCategory);

    let taskDate = document.createElement("p"); //due date
    taskDate.textContent = todos[task].todoDueDate;
    if (todos[task].todoComplete === true) {
      taskDate.style.color = "#000";
    } else {
      taskDate.style.color = todos[task].todoCategory.color;
    }
    taskItem.appendChild(taskDate);

    let markAsDoneBtn = document.createElement("button"); //delete button
    markAsDoneBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    if (todos[task].todoComplete === true) {
      markAsDoneBtn.style.color = "#000";
    } else {
      markAsDoneBtn.style.color = todos[task].todoCategory.color;
    }
    markAsDoneBtn.style.border = "none";
    markAsDoneBtn.style.float = "right";
    markAsDoneBtn.style.cursor = "pointer";
    markAsDoneBtn.onclick = function () {
      markingTaskAsDone(todos[task].todoID);
    };
    taskItem.appendChild(markAsDoneBtn);

    todoList.appendChild(taskItem);
  }

  let pendingTasksCount = document.querySelector("#pendingTasksCounter");
  pendingTasksCount.textContent = `You have ${countIncompleteTasks()} pending tasks`;
}

showTasks(); // so it shows the tasks that I create

//task creation
let createBtn = document.querySelector("#createTask");

function createTask() {
  let newText = document.querySelector("#tName");
  let dueDate = document.querySelector("#dueDate");
  let newCategory = {};

  for (let category in categories) {
    if (taskCategory.value === categories[category].name) {
      newCategory = categories[category];
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
//end of task creation

//delete all completed tasks
let clearDoneButton = document.querySelector("#clearDoneButton");
clearDoneButton.addEventListener("click", () => {
  deleteAllCompletedTasks();
});
function deleteAllCompletedTasks() {
  todos = todos.filter((todo) => todo.todoComplete != true);
  showTasks();
}
//end of delete all completed tasks

//create new category
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
  showCategories();
  deleteCategories();
  editCategories();
}
 //delete categories
// let deleteCategoryBtn = document.querySelector("#deleteCategoryBtn")
// deleteCategoryBtn.addEventListener('click', () => {
//   const deleteWhatCategory = prompt('Which category would you like to delete?')})

  // function deleteACategory(taskCategory){
  //   for(let category in categories){
  //     if (categories[category].todoCategory === taskCategory){
  //       categories = categories.filter((category) => category.todoCategory != taskCategory)
  //       showCategories()
  //     }
  //   }
  // }
//end of delete categories

createCategoryBtn.addEventListener("click", () => {
  createNewCategory();
});
//end of create new category

//delete individual tasks
function removeTaskFromList(taskID) {
  for (let task in todos) {
    if (todos[task].todoID === taskID) {
      todos = todos.filter((todo) => todo.todoID != taskID);
      showTasks();
    }
  }
}
//end of delete individual tasks

//making tasks as completed
function markingTaskAsDone(taskID) {
  for (let task in todos) {
    if (todos[task].todoID === taskID) {
      todos[task].todoComplete = true;
      showTasks();
    }
  }
}
//end of marking tasks as completed


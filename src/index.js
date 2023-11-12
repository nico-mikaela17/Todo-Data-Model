//DONE:Data model should store all information about todos including (but not limited to):Todo name, Status, ID, Category, Due Date
//FIXME: add ID, also add ID to new categories, and when deleting categories use that id instead of name
// preset categories
let categories = [
  { name: "School", color: "#275d38", ID: 0 },

  { name: "Work", color: "#0065A4", ID: 1 },

  { name: "Chores", color: "#9d4edd", ID: 2 },

  { name: "Dates", color: "#c9184a", ID: 3 },
];

// preset todos so I can see different colors and layout
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

let form = document.querySelector("#createTaskForm");

//DONE: Add New Category
//DONE: allow new tasks to show any category + have a color
//create new category
let createCategoryBtn = document.querySelector("#createCategoryBtn");

function createNewCategory() {
  let newCategoryItem = document.querySelector("#newCategoryItem");
  let colorCategory = document.querySelector("#colorCategory");

  let newCategory = {
    name: newCategoryItem.value,
    color: colorCategory.value,
    ID: categories.length + 1,
  };
  console.log(newCategory.ID);

  categories.push(newCategory);
  showCategories();
  deleteCategories();
  editCategories();
  filterTasksByCategory();
}

createCategoryBtn.addEventListener("click", () => {
  createNewCategory();
});
//end of create new category

//end of creation of drop-downs

//create category
// generate the categories dropdowns in the first area based on the preset categories and the ones that we create/delete/edit later on
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

// How many tasks do I have left?
function countIncompleteTasks() {
  let count = 0;
  for (let task in todos) {
    if (todos[task].todoComplete === false) {
      count++;
    }
  }
  return count;
}

//DONE: Add New Todo
//DONE: Users need to be able to select a category when adding a new todo.
//we create a task in the first form area
let createBtn = document.querySelector("#createTaskBtn");

function createTask() {
  let newText = document.querySelector("#tName");
  let dueDate = document.querySelector("#dueDate");
  let newCategory = {};
  // if (taskCategory.value === categories[category].name) {
  //   newCategory = categories[category];
  // }

  for (let category in categories) {
    if (taskCategory.value === categories[category].name) {
      newCategory = categories[category];
    } else if (taskCategory.value === "")
      // No category selected, set a default category
      newCategory = {
        name: "No Category",
        color: "#000",
      };
  }

  let newTodo = {
    todoID: todos.length,
    todoName: newText.value,
    todoCategory: newCategory.ID,
    todoComplete: false,
    todoDueDate: dueDate.value,
  };

  todos.push(newTodo);
  showTasks();
}

createBtn.addEventListener("click", () => {
  createTask();
});
//end of task creation
// add and display tasks in the todolist
function showTasks() {
  let todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";

  for (let task in todos) {
    //creation of the article/task
    //loop so it happens to every element?
    let taskItem = document.createElement("article"); //create item
    //mark task as completed - color
    if (todos[task].todoComplete === true) {
      taskItem.style.color = "#ced4da";
    } else {
      taskItem.style.color = todos[task].todoCategory.color;
    }

    let removeTaskBtn = document.createElement("button"); //delete button
    removeTaskBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    //mark task as completed - color
    if (todos[task].todoComplete === true) {
      removeTaskBtn.style.color = "#ced4da";
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
    //mark task as completed - color
    if (todos[task].todoComplete === true) {
      taskName.style.color = "#ced4da";
    } else {
      taskName.style.color = todos[task].todoCategory.color;
    }
    taskItem.appendChild(taskName);
    taskName.contentEditable = "plaintext-only";

    let taskCategory = document.createElement("h4"); //task category
    taskCategory.textContent = todos[task].todoCategory.name;
    //FIXME: if (2 statements: delete and edit) statement might help to connect the id and if it's not there, change it to empty or no category

    if (todos[task] && !todos[task].todoCategory) {
      todos[task].todoCategory = { ID: "" }; // Set the category to "No category"
    }
    if (todos[task].todoCategory.ID === "") {
      taskCategory.textContent = "No category";
    }
    console.log(todos);

    //mark task as completed - color
    if (todos[task].todoComplete === true) {
      taskCategory.style.color = "#ced4da";
    } else {
      taskCategory.style.color = todos[task].todoCategory.color;
    }
    taskItem.appendChild(taskCategory);

    let taskDate = document.createElement("p"); //due date
    taskDate.textContent = todos[task].todoDueDate;
    //mark task as completed - color
    if (todos[task].todoComplete === true) {
      taskDate.style.color = "#ced4da";
    } else {
      taskDate.style.color = todos[task].todoCategory.color;
    }
    taskItem.appendChild(taskDate);
    //DONE: Edit Due Date
    taskDate.contentEditable = "plaintext-only";

    let markAsDoneBtn = document.createElement("button"); //delete button
    markAsDoneBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    //mark task as completed - color
    if (todos[task].todoComplete === true) {
      markAsDoneBtn.style.color = "#ced4da";
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
//end of display tasks in the todolist

//DONE: Delete Todo
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

//DONE: Complete Todo
//same as?
//DONE: Edit Status
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

//FIXME: Delete Category, it comes out of the select drop down but I want it to be gone from the task
//delete category

function deleteCategories() {
  let taskCategory = document.querySelector("#deleteCategorySelection");
  taskCategory.innerHTML = '<option value="">Please Select</option>';

  for (let category in categories) {
    let deleteCategoryName = document.createElement("option");
    deleteCategoryName.value = categories[category].name;
    deleteCategoryName.textContent = categories[category].name;

    taskCategory.appendChild(deleteCategoryName);
  }
}
deleteCategories();

let deleteCategoryBtn = document.querySelector("#deleteCategoryBtn");
let deleteCategorySelection = document.querySelector(
  "#deleteCategorySelection"
);

function deleteCategory(categoryName) {
  categories.forEach((category) => {
    if (category.name === categoryName) {
      categories = categories.filter(
        (category) => category.name != categoryName
      );
      deleteCategories();
      showCategories();
      editCategories();
      filterTasksByCategory();
    }
  });
}

deleteCategoryBtn.addEventListener("click", () => {
  deleteCategory(deleteCategorySelection.value);
});

//end of delete category

//FIXME: Edit Category (be sure to update all existing todos with the edited category)
//same as?
//FIXME: Edit Todos (be sure to update all existing todos with the edited category)
//edit categories
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
editCategories();

let editCategoryBtn = document.querySelector("#editCategoryBtn");
editCategoryBtn.addEventListener("click", () => {
  editACategory();
});

function editACategory() {
  let editedCategoryItem = document.querySelector("#editedCategoryInput");
  let editedCategorySelection = document.querySelector(
    "#editCategorySelection"
  );

  categories.forEach((category) => {
    if (category.name === editedCategorySelection.value) {
      category.name = editedCategoryItem.value;
      editedCategoryItem.value = "";
      showCategories();
      deleteCategories();
      editCategories();
      return;
    }
  });
}
//end of edit categories

//TODO: Users need to be able to view todos by category (filter by category)
function filterTasksByCategory(category) {
  let categoryFilterSelector = document.querySelector(
    "#categoryFilterSelector"
  );
  categoryFilterSelector.innerHTML = '<option value="">Please Select</option>';

  for (let category in categories) {
    let categoryName = document.createElement("option");
    categoryName.value = categories[category].name;
    categoryName.textContent = categories[category].name;

    categoryFilterSelector.appendChild(categoryName);

    // return todoList.filter((todo) => todo.todoCategory[0].categories.name === category)
  }
}
filterTasksByCategory();

// typeSelector.addEventListener('change', (event) => {
//   const usersTypeChoice = event.target.value.toLowerCase()
//  if(event.target.value === 'Show all'){
//   removeChildren(pokeGrid)
//   todoList.forEach((singletask) => {
//     populatePokeCard(singletask)})
//    } else{
//   const taskByType = filterTasksByCategory(usersTypeChoice)
//   removeChildren(pokeGrid)
//   taskByType.forEach((eachSingletask) => populatePokeCard(eachSingletask))
//   calculateHP()
// }
// })

// DONE 1. Refactor showTask() function to use the new displayTodos.

//DONE:Data model should store all information about todos including (but not limited to):Todo name, Status, ID, Category, Due Date
//FIXME: add ID, also add ID to new categories, and when deleting categories use that id instead of name
// preset categories
let categories = [
  { name: "School", color: "#275d38", ID: 0 },

  { name: "Office", color: "#0065A4", ID: 1 },

  { name: "Chores", color: "#9d4edd", ID: 2 },

  { name: "Dates", color: "#c9184a", ID: 3 },
];

// preset todos so I can see different colors and layout
let todos = [
  {
    todoID: 0,
    todoName: "Finish Homework",
    todoCategory: 0,
    todoComplete: false,
    todoDueDate: "2023-09-02",
  },
  {
    todoID: 1,
    todoName: "Collections List",
    todoCategory: 1,
    todoComplete: false,
    todoDueDate: "2023-09-18",
  },
  {
    todoID: 2,
    todoName: "Mop the kitchen",
    todoCategory: 2,
    todoComplete: false,
    todoDueDate: "2023-09-13",
  },
  {
    todoID: 3,
    todoName: "Trip to Maryland",
    todoCategory: 3,
    todoComplete: false,
    todoDueDate: "2023-09-21",
  },
];

//create a new array of todos, that is used to show/display the todos and catagories
//this will need to be called/used any time we are updating the UI/DOM
function combinedTodos() {
  let finalTodos = todos.map((todo) => {
    let todoCat = categories.find((cat) => cat.ID === todo.todoCategory);
    // if ((todoCategory = undefined)) {
    //   todoCat.name === "No Category";
    // } else{
    

    //FIXME:if todoCat is Undefined, define todocat with and object with no Category.

    return {
      todoID: todo.todoID,
      todoName: todo.todoName,
      todoCategory: todoCat.name,
      todoComplete: todo.todoComplete,
      todoDueDate: todo.todoDueDate,
      color: todoCat.color,
    }
    }
  );

  return finalTodos;
}

// 3. what happens if you delete a catagory, and a todo references a non-existing todo?
//    3a. Hint. this will happen in the combinedTodos() function

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
let taskCategory = document.querySelector("#taskCategory");
function showCategories() {
  taskCategory.innerHTML = '<option value="">Please Select</option>';

  categories.forEach((category) => {
    let newCategoryName = document.createElement("option");
    newCategoryName.value = category.ID;
    newCategoryName.textContent = category.name;

    taskCategory.appendChild(newCategoryName);
  });
}
showCategories();

// How many tasks do I have left?
function countIncompleteTasks() {
  let count = 0;
  for (let todo of todos) {
    if (todo.todoComplete === false) {
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

  for (let category of categories) {
    if (Number(taskCategory.value) === category.ID) {
      newCategory = category;
    }
  }

  let newTodo = {
    todoID: todos.length + 1,
    todoName: newText.value,
    todoCategory: Number(taskCategory.value),
    todoComplete: false,
    todoDueDate: dueDate.value,
  };

  // {
  //   todoID: 3,
  //   todoName: "Trip to Maryland",
  //   todoCategory: 3,
  //   todoComplete: false,

  todos.push(newTodo);
  showTasks();
}

createBtn.addEventListener("click", () => {
  createTask();
  showTasks();
});
//end of task creation
let todoList = document.querySelector("#todoList");
function showTasks() {
  let displayTodos = combinedTodos(); // console.log(todos);
  todoList.innerHTML = "";

  // displayTodos.forEach((task) => {

  for (let displayTodo of displayTodos) {
    //creation of the article/task
    //loop so it happens to every element?
    let taskItem = document.createElement("article"); //create item
    //mark task as completed - color
    if (displayTodo.todoComplete === true) {
      taskItem.style.color = "#ced4da";
    } else {
      taskItem.style.color = displayTodo.color;
    }

    let removeTaskBtn = document.createElement("button"); //delete button
    removeTaskBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    //mark task as completed - color
    if (displayTodo.todoComplete === true) {
      removeTaskBtn.style.color = "#ced4da";
    } else {
      removeTaskBtn.style.color = displayTodo.color;
    }
    removeTaskBtn.style.border = "none";
    removeTaskBtn.style.float = "right";
    removeTaskBtn.style.cursor = "pointer";
    removeTaskBtn.onclick = function () {
      removeTaskFromList(displayTodo.todoID);
    };
    taskItem.appendChild(removeTaskBtn);

    let taskName = document.createElement("h3");
    taskName.textContent = displayTodo.todoName; //task title
    //mark task as completed - color
    if (displayTodo.todoComplete === true) {
      taskName.style.color = "#ced4da";
    } else {
      taskName.style.color = displayTodo.color;
    }
    taskItem.appendChild(taskName);
    taskName.contentEditable = "plaintext-only";
    let taskCategory = document.createElement("h4"); //task category
    taskCategory.textContent = displayTodo.todoCategory;
    //FIXME: if (2 statements: delete and edit) statement might help to connect the id and if it's not there, change it to empty or no category

    //mark task as completed - color
    if (displayTodo.todoComplete === true) {
      taskCategory.style.color = "#ced4da";
    } else {
      taskCategory.style.color = displayTodo.color;
    }
    taskItem.appendChild(taskCategory);

    let taskDate = document.createElement("p"); //due date
    taskDate.textContent = displayTodo.todoDueDate;
    //mark task as completed - color
    if (displayTodo.todoComplete === true) {
      taskDate.style.color = "#ced4da";
    } else {
      taskDate.style.color = displayTodo.color;
    }
    taskItem.appendChild(taskDate);
    //DONE: Edit Due Date
    taskDate.contentEditable = "plaintext-only";

    let markAsDoneBtn = document.createElement("button"); //delete button
    markAsDoneBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    //mark task as completed - color
    if (displayTodos.todoComplete === true) {
      markAsDoneBtn.style.color = "#ced4da";
    } else {
      markAsDoneBtn.style.color = displayTodo.color;
    }
    markAsDoneBtn.style.border = "none";
    markAsDoneBtn.style.float = "right";
    markAsDoneBtn.style.cursor = "pointer";
    markAsDoneBtn.onclick = function () {
      markingTaskAsDone(displayTodo.todoID);
    };
    taskItem.appendChild(markAsDoneBtn);

    todoList.appendChild(taskItem);
  }
  // )
  let pendingTasksCount = document.querySelector("#pendingTasksCounter");
  pendingTasksCount.textContent = `You have ${countIncompleteTasks()} pending tasks`;
}
showTasks(); // so it shows the tasks that I create
//end of display tasks in the todolist

//DONE: Delete Todo
//delete individual tasks
function removeTaskFromList(taskID) {
  todos = todos.filter((todo) => todo.todoID != taskID);
  showTasks();
}

//end of delete individual tasks
//delete all completed tasks
let clearDoneButton = document.querySelector("#clearDoneButton");
clearDoneButton.addEventListener("click", () => {
  todos = todos.filter((todo) => todo.todoComplete != true);
  showTasks();
});
//end of delete all completed tasks

//DONE: Complete Todo
//same as?
//DONE: Edit Status
//making tasks as completed
function markingTaskAsDone(taskID) {
  for (let todo of todos) {
    if (todo.todoID === taskID) {
      //todos[task].todoComplete = true;
      todo.todoComplete = !todo.todoComplete;
    }
  }
  showTasks();
}
//end of marking tasks as completed

//FIXME: Delete Category, it comes out of the select drop down but I want it to be gone from the task
//delete category
let categoryToDelete = document.querySelector("#deleteCategorySelection");
function deleteCategories() {
  categoryToDelete.innerHTML = '<option value="">Please Select</option>';

  for (let category of categories) {
    let deleteCategoryName = document.createElement("option");
    deleteCategoryName.value = category.ID;
    deleteCategoryName.textContent = category.name;

    categoryToDelete.appendChild(deleteCategoryName);
  }
}
deleteCategories();

let deleteCategoryBtn = document.querySelector("#deleteCategoryBtn");

deleteCategoryBtn.addEventListener("click", () => {
  categories.forEach((category) => {
    if (category.ID === Number(categoryToDelete.value)) {
      categories = categories.filter(
        (category) => category.ID != Number(categoryToDelete.value)
      );
      deleteCategories();
      showCategories();
      editCategories();
      filterTasksByCategory();
      noCategory();
    }
  });
});

/* Some kind of function that checks the category assigned to each todo to make sure
that category still exists/wasn't edited */
function checkCategories(ID) {
  //   for (let task in todos) {
  //     if (todos[task].todoCategory === category) {
  //       //todos[task].todoComplete = true;
  //       todos[task].todoCategory = "";
  //       showTasks();
  //     }
  //   }
  // }
  let match;
  categories.forEach((category) => {
    if (ID === category.ID) {
      match = category;
    }
  });
  if (!match) {
    match = { name: "No category", color: "#000", ID: -1 };
  }
  return match;
}

function noCategory() {
  todos.forEach((todo) => {
    categories.forEach((category) => {
      todo.todoCategory = checkCategories(todo.todoCategory.name);
      if (category.ID === Number(categoryToDelete.value)) {
        categories = categories.filter(
          (category) => category.ID != Number(categoryToDelete.value)
        );
      }
    });
  });

  showTasks();
}
// loop through todos
// check that the category exists if statement
// if it doesn't exist do something

//end of delete category

//FIXME: Edit Category (be sure to update all existing todos with the edited category)
//same as?
//FIXME: Edit Todos (be sure to update all existing todos with the edited category)
//edit categories
// 2. When editing catagories, you will need to edit/update the catagories array then call showTasks()
function editCategories() {
  let categoryFilterSelector = document.querySelector("#editCategorySelection");
  categoryFilterSelector.innerHTML = '<option value="">Please Select</option>';

  for (let category of categories) {
    let categoryName = document.createElement("option");
    categoryName.value = category.ID;
    categoryName.textContent = category.name;

    categoryFilterSelector.appendChild(categoryName);
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
  editedCategorySelection.value = todos[category].value;

  categories.forEach((category) => {
    if (category.ID === editedCategorySelection.value) {
      category.ID = editedCategoryItem.value;
      editedCategoryItem.value = "";
      showCategories();
      deleteCategories();
      editCategories();
      filterTasksByCategory();
      return;
    }
  });
}

//end of edit categories

//TODO: Users need to be able to view todos by category (filter by category)
let categoryFilterSelector = document.querySelector("#categoryFilterSelector");
function filterTasksByCategory() {
  categoryFilterSelector.innerHTML = '<option value="">Please Select</option>';

  for (let category of categories) {
    let categoryName = document.createElement("option");
    categoryName.value = category.ID;
    categoryName.textContent = category.name;

    categoryFilterSelector.appendChild(categoryName);
  }
  /*   function removeChildren(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  } */
}

function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

categoryFilterSelector.innerHTML = '<option value="">Please Select</option>';

for (let category of categories) {
  let categoryName = document.createElement("option");
  categoryName.value = category.ID;
  categoryName.textContent = category.name;

  categoryFilterSelector.appendChild(categoryName);

  categoryFilterSelector.addEventListener("change", filterEntries, false);
  function filterEntries() {
    console.log("working");
    for (let i = 1; i < taskItem.length; i++) {
      if (category == categoryName.value) {
        taskItem.style.display = "";
      } else {
        taskItem.style.display = "none";
      }
    }
  }
}

filterTasksByCategory();

// ("change", (event) => {
//   const userChoice = event.target.value;
//   // If the value is one of the category ID's, you're showing that category
//   // Type check that you're comparing numbers Number(event.target.value) === categories[category].ID
//   if (event.target.value === "") {
//     removeChildren(todoList);
//     todoList.forEach((task) => {
//       showTasks();
//     });
//   } else {
//     const taskByType = filterTasksByCategory(userChoice);
//     removeChildren(todoList);
//     taskByType.forEach((eachSingletask) => showTasks(eachSingletask));
//   }
// });
// return todoList.filter((todo) => todo.todoCategory[0].categories.name === category)

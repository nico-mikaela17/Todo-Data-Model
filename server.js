const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//GET TODO
app.get("/api/todos", (req, res) => {
  res.send(todos);
});

// POST TODO
app.post("/api/todos", (req, res) => {
  const newTodo = req.body;
  (newTodo.todoID = todos.length + 1),
    (newTodo.todoName = "Finish API assignment"),
    (newTodo.todoCategory = 0),
    (newTodo.todoComplete = false),
    (newTodo.todoDueDate = "TBD"),
    (newTodo.todoID = todos.length + 1);
  todos.push(newTodo);
  res.json(newTodo);
});

// PUT TODO (update)
app.put("/api/todos/", (req, res) => {
  const todoID = Number(req.body.todoID);
  const newName = req.body.name;
  const newCategory = req.body.category;
  const newDate = req.body.date;

  todos[todoID].todoName = newName;
  todos[todoID].todoCategory = newCategory;
  todos[todoID].todoDueDate = newDate;

  res.send(todos);
});

// DELETE TODO
app.delete("/api/todos/:todoID", (req, res) => {
  const todoID = req.params.todoID;

  todos = todos.filter((todo) => todo.todoID !== parseInt(todoID));

  res.json({ message: `Todo ${2} deleted successfully` });
});

// GET ALL TODOS for a CATEGORY
app.get("/api/todos/category/", (req, res) => {
  const categoryID = req.body.categoryID;
  const todosInCategory = todos.filter(
    (todo) => todo.todoCategory === parseInt(categoryID)
  );
  res.json(todosInCategory);
});

// GET CATEGORIES
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

// POST CATEGORIES
app.post("/api/categories", (req, res) => {
  const newCategory = req.body;
  newCategory.ID = categories.length;
  categories.push(newCategory);
  res.json(newCategory);
});

// PUT CATEGORIES (update)
app.put("/api/categories/:categoryID", (req, res) => {
  const categoryID = req.params.categoryID;
  const updatedCategory = req.body;

  categories[categoryID] = updatedCategory;

  res.json(updatedCategory);
});

// DELETE CATEGORIES
app.delete("/api/categories/:categoryID", (req, res) => {
  const categoryID = req.params.categoryID;

  categories = categories.filter(
    (category) => category.ID !== parseInt(categoryID)
  );

  // Also update todos to remove references to this category
  todos = todos.map((todo) => {
    if (todo.todoCategory === parseInt(categoryID)) {
      todo.todoCategory = -1; // No category
    }
    return todo;
  });

  res.json({ message: "Category deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//add todo
// app.post('/api/todo',(req,res) =>{

//   todos.push({
//     todoID: todos.length + 1,
//     todoName: newText.value,
//     todoCategory: Number(taskCategory.value),
//     todoComplete: false,
//     todoDueDate: dueDate.value,
//   })
// })

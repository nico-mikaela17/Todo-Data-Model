const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! GET Request");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

let categories = [
  { name: "School", color: "#275d38", ID: 0 },

  { name: "Office", color: "#0065A4", ID: 1 },

  { name: "Chores", color: "#9d4edd", ID: 2 },

  { name: "Dates", color: "#c9184a", ID: 3 },
];

app.get("/api/todos", (req, res) => {
  res.send(todos);
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//GET TODOS
// POST TODO
// PUT TODO (update)
// DELETE TODO
// GET ALL TODOS for a CATEGORY
// GET CATEGORIES
//  POST CATEGORIES
//  PUT CATEGORIES (update)
// DELETE CATEGORIES

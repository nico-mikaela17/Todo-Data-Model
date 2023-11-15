// let isEmpty = todoValue === "";
// let isDuplicate = todos.some(
//   (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
// );

// if (isEmpty) {
//   alert("What is the to-do name?");
// } else if (isDuplicate) {
//   alert("To-do already exists");
// }

document.getElementsByTagName("input")[0].onchange = (event) => {
  document.getElementsByTagName(
    "ul"
  )[0].innerHTML += `<li>${event.target.value}</li>`;
};

todoMain();

function todoMain() {
  let inputElem, ulElem;

  getElements();
  addListeners();

  function getElements() {
    inputElem = document.getElementsByTagName("input")[0];
    ulElem = document.getElementsByTagName("ul")[0];

  }

  function addListeners() {
    inputElem.addEventListener("change", onChange,false);
  }

  function onChange(){
    let inputValue = inputElem.value;
    console.log(inputValue)
  }
}

//select the elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Variables
let LIST = [],
  id = 0;

//   =========================== localStorage code ===============
//geting items from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one on the list
  loadList(LIST); // load the list to the user interface
} else {
  //if data is not empty
  LIST = [];
  id = 0;
}

//laoding the items to user's interface
function loadList(array) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//   =========================== localStorage code ===============

// Classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//show todays date
const optoins = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", optoins);

// ============ Add To do function ================

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  } //if trash is true, following code wont execute

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
  <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// ===================== add an item to the list user the enter key

document.addEventListener("keyup", addItem);

function addItem(e) {
  if (e.keyCode === 13) {
    const toDo = input.value;
    //check if the input is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      //adding to local storage
      //shoud written anywhere that the LIST array will updated

      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
}

// }

//   event => {
//   if (event.keyCode === 13) {
//     const toDo = input.value;
//     //check if the input is not empty
//     if (toDo) {
//       addToDo(toDo, id, false, false);
//       LIST.push({
//         name: toDo,
//         id: id,
//         done: false,
//         trash: false,
//       });
//       //adding to local storage
//       //shoud written anywhere that the LIST array will updated

//       localStorage.setItem("TODO", JSON.stringify(LIST));
//       id++;
//     }
//     input.value = "";
//   }
// });

// addToDo(toDo);

//  ========== complete to-do

function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);

  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo function

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//targeting the items created dynamically

list.addEventListener("click", (event) => {
  const element = event.target; //returns the clicked element inside list
  const elementJOB = element.attributes.job.value; // complete or delete
  if (elementJOB == "complete") {
    completeTodo(element);
  } else if (elementJOB == "delete") {
    removeToDo(element);
  }
  //adding to local storage
  //shoud written anywhere that the LIST array will updated

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

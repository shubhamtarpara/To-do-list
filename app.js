const add_button = document.getElementById("add-btn");
const delete_all_button = document.getElementById("delete-all");
const delete_checked_button = document.getElementById("delete-checked");
const input_field = document.getElementById("todo-text-inputbox");
const list = document.getElementById("todo-list");

add_button.addEventListener("click", createToDo);
add_button.addEventListener("click", clickAnimation);
delete_all_button.addEventListener("click", clickAnimation);
delete_all_button.addEventListener("click", deleteAll);
delete_checked_button.addEventListener("click", clickAnimation);
delete_checked_button.addEventListener("click", deleteChecked);
input_field.addEventListener("keyup", inputCheck);

window.addEventListener("load", function () {
  const todolist = window.localStorage.getItem("todolist");
  list.innerHTML = todolist;
  const all_checkbox = this.document.getElementsByClassName("checkbox");
  for (let index = 0; index < all_checkbox.length; index++) {
    all_checkbox[index].addEventListener("click", check);
  }
  const checked_checkboxes = this.document.getElementsByClassName("checked-li");
  for (let index = 0; index < checked_checkboxes.length; index++) {
    checked_checkboxes[index].querySelector(".checkbox").setAttribute("checked","true");
  }
  const all_edit = this.document.getElementsByClassName("edit");
  for (let index = 0; index < all_edit.length; index++) {
    all_edit[index].addEventListener("click", clickAnimation);
    all_edit[index].addEventListener("click", editToDo);
  }
  const all_delete = this.document.getElementsByClassName("delete-btn");
  for (let index = 0; index < all_delete.length; index++) {
    all_delete[index].addEventListener("click", clickAnimation);
    all_delete[index].addEventListener("click", deleteToDo);
  }
  window.localStorage.clear();
});

window.addEventListener("beforeunload", function () {
  window.localStorage.setItem("todolist", list.innerHTML);
});

function inputCheck(event) {
  const input_value = document.getElementById("todo-text-inputbox").value;

  if (input_value.trim() !== "") {
    add_button.disabled = false;
    
  }
  else {
    add_button.disabled = true;
    

  }
}

function clickAnimation() {
  const obj = this;
  this.classList.add("clickstart");
  const t = setTimeout(function () {
    obj.classList.remove("clickstart");
  }, 80);
}

function createToDo() {

  const uniqe_id = `${new Date().getTime()}`;

  const input_value = document.getElementById("todo-text-inputbox").value;

  const new_to_do = document.createElement("li");
  new_to_do.innerHTML = `<div class="checkbox-container">
    <input type="checkbox" name="checked" class="checkbox" id="checkbox-${uniqe_id}">
  
  <div class="todo-text-container">
    <p class="todo-text" id="todo-text-${uniqe_id}">${input_value}</p>
  </div>
  <div class="todo-buttons-container">
    <button class="edit" id="edit-${uniqe_id}">
    <img src="edit.gif" alt="Computer man" style="width:15px;height:15px;">
    </button>
    <button class="delete-btn" id="btn-${uniqe_id}">
    <img src="trashcan.gif" alt="Computer man" style="width:15px;height:15px;">
    </button>
  </div></div>`
  new_to_do.id = `todo-${uniqe_id}`;
  
  list.appendChild(new_to_do);

  input_field.value = "";
  add_button.disabled = true;
  
  const delete_button = document.getElementById("btn-" + uniqe_id);
  delete_button.addEventListener("click", clickAnimation);
  delete_button.addEventListener("click", deleteToDo);

  const edit_button = document.getElementById("edit-" + uniqe_id);
  edit_button.addEventListener("click", clickAnimation);
  edit_button.addEventListener("click", editToDo);

  const checkbox = document.getElementById("checkbox-" + uniqe_id);
  checkbox.addEventListener("click", check);
}

function deleteToDo() {
  const obj = this;
  const t = setTimeout(deleteIt, 100);
  function deleteIt() {
    obj.parentElement.parentElement.remove();
  }
}

function editToDo() {
  const id = this.id;
  const unique_id = id.replace("edit-", "");
  let p = document.getElementById(`todo-text-${unique_id}`);
  p.contentEditable = "true";
  p.style.backgroundColor = "white";
  p.style.outline = "none";
  p.addEventListener("blur", function () {
    this.contentEditable = false;
    p.style.backgroundColor = "lightcoral";

  
  });
}

function deleteAll() {
  list.innerHTML = "";
}

function deleteChecked() {
  const checkbox_list = document.getElementsByClassName("checked-li");
  for (let index = 0; index < checkbox_list.length; index++) {
    checkbox_list[index].remove();
    index--;
  }

}

function check() {
  const id = this.id;
  const unique_id = id.replace("checkbox-", "");
  let p = document.getElementById(`todo-text-${unique_id}`);
  let checkedtodo = document.getElementById(`todo-${unique_id}`);
  let checkedtodo_edit = document.getElementById(`edit-${unique_id}`);
  if (this.checked) {
    p.style.textDecoration = "line-through";
    checkedtodo.classList.toggle("checked-li");
    checkedtodo_edit.setAttribute("disabled", "true");
  }
  else {
    p.style.textDecoration = "none";
    checkedtodo.classList.toggle("checked-li");
    checkedtodo_edit.removeAttribute("disabled");
  }
}
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todos = [];

todoForm.addEventListener("submit", function () {
  event.preventDefault();
  const text = todoInput.value;

  const newTodo = {
    id: Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  todoInput.value = "";
  console.log(todos);
  localStorage.setItem("daily-note", JSON.stringify(todos));

  //todoInput.value = "";
  //   console.log(todos);
  //   const item = document.createElement("li");
  //   item.textContent = text;
  //   todoList.append(item);
});

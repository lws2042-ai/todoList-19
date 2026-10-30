const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const message = document.querySelector("#message");

let todos = [];

todoForm.addEventListener("submit", function (event) {
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

  saveTodos();
  renderTodos();
});

function loadTodos() {
  const savedTodos = localStorage.getItem("daily-note");

  if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
  }
}

function renderTodos() {
  todoList.replaceChildren();

  todos.forEach(function (todo) {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function () {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "text-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", function () {
      console.log(todo, item);
      updateTodo(todo, item);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "text-button delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function () {
      deleteTodo(todo.id);
    });
    item.append(checkbox, text, editButton, deleteButton);
    todoList.append(item);
  });
}

function updateTodo(todo, item) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = todo.text;

  function saveUpdate() {
    // console.log("업데이트 버튼 클릭!");
    const newText = editInput.value;
    if (newText === "") {
      message.textContent = "수정할 내용을 입력해주세요.";
      return;
    }
    todo.text = newText;
    saveTodos();
    renderTodos();
  }

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.className = "text-button";
  saveButton.textContent = "저장";
  saveButton.addEventListener("click", saveUpdate);

  const cancelButton = document.createElement("button");
  cancelButton.className = "text-button";
  cancelButton.type = "button";
  cancelButton.textContent = "취소";
  cancelButton.addEventListener("click", function () {
    renderTodos();
  });

  item.append(editInput, saveButton, cancelButton);
}

function deleteTodo(id) {
  // filter 메서드는 true인것만 선택적으로 새배열로 반환함
  todos.filter(function (todo) {
    return todo.id !== id;
  });
  saveTodos();
  renderTodos();
}

function saveTodos() {
  try {
    localStorage.setItem("daily-note", JSON.stringify(todos));
  } catch (error) {
    message.textContent =
      "저장되지 않았습니다. 새로고침하여 다시 시도해 주세요.";
  }
}

loadTodos();
renderTodos();
console.log(todos);

const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');

let todos = JSON.parse(localStorage.getItem('items')) || [];
let counter = localStorage.getItem('counter') || 1;

let statusFilterValue = 'all';
let editTodoId = null;



// кнопка выполнить
function completedTodo(currentTodo) {
    if (currentTodo.active) {
        todos.forEach(todo => {
            if (todo.id === currentTodo.id) {
                todo.active = false;
                localStorage.setItem('items', JSON.stringify(todos));
            }
        })
    } else {
        todos.forEach(todo => {
            if (todo.id === currentTodo.id) {
                todo.active = true;
                localStorage.setItem('items', JSON.stringify(todos));
            }
        })
    }
    renderTodos();
}


// кнопка удалить
function deleteTodo(currentTodo) {
    todos = todos.filter(todo => todo.id !== currentTodo.id);
    renderTodos();

    localStorage.setItem('items', JSON.stringify(todos));
}


// кнопка редактировать
function editTodo(currentTodo) {
    editTodoId = currentTodo.id;
    renderTodos();
}


// создаем новый todo
function createTodoTemplate(todo) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item');

    const todosWrapper = document.createElement('div');
    todosWrapper.classList.add('todo-list__wrapper');

    const todoText = document.createElement('p');
    todoText.classList.add('todo-list__text');

    const isEdit = todo.id === editTodoId;
    
    if (isEdit) {
        const todoEditInput = document.createElement('input');
        todoEditInput.classList.add('todo-list-item__input');

        todos.forEach((todoItem) => {
            if (!todoItem.active && todoItem.id === todo.id) {
                todoEditInput.classList.add('todo-list__text--completed');
            }
        })

        todoEditInput.value = todo.text;
        todoText.append(todoEditInput);
        setTimeout(() => {
            todoEditInput.focus();
          }, 0);
  

        const buttonOk = document.createElement('button');
        buttonOk.classList.add('button', 'btn-ok');
        buttonOk.append('ok');
        todosWrapper.prepend(buttonOk);

        buttonOk.addEventListener('click', () => {
            const text = todoEditInput.value;
            todoEditInput.remove();
            todoText.innerHTML = text;
            buttonOk.remove();
            
            todos.forEach((todoItem, index) => {
                if (todoItem.id === todo.id) {
                    todos[index].text = todoEditInput.value;
                    localStorage.setItem('items', JSON.stringify(todos));
                }
            })
            editTodoId = null;
            renderTodos();
        })
        
        todoEditInput.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                buttonOk.click();
            }
        })
    } else {
        todoText.append(todo.text);

        if (!todo.active) {
            todoText.classList.add('todo-list__text--completed');
        }


        // выполнить
        const buttonCompleted = document.createElement('button');
        buttonCompleted.classList.add('button', 'btn-completed');
        buttonCompleted.append('V');
        todosWrapper.append(buttonCompleted);
        buttonCompleted.addEventListener('click', () => completedTodo(todo));


        // удалить
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('button', 'btn-del');
        buttonDel.append('X');
        todosWrapper.append(buttonDel);
        buttonDel.addEventListener('click', () => deleteTodo(todo));


        // редактировать
        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('button', 'btn-edit');
        buttonEdit.addEventListener('click', () => editTodo(todo));
        buttonEdit.append('..');
        todosWrapper.append(buttonEdit);
    }

    todoItem.append(todoText);
    todoItem.append(todosWrapper);
    todolist.append(todoItem);
}



// кнопка добавить
addButton.addEventListener('click', () => {
    if (!mainFieldInput.value) return;
    
    const todo = {
        text: `${mainFieldInput.value[0].toUpperCase()}${mainFieldInput.value.slice(1)}`,
        active: true,
        id: localStorage.getItem('counter') || counter,
    };

    mainFieldInput.value = '';
    localStorage.setItem('counter', JSON.stringify(++counter));

    if (!document.querySelector('.completed-radio').checked) {
        createTodoTemplate(todo);
    }

    todos.push(todo);
    localStorage.setItem('items', JSON.stringify(todos));
})

mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})



function renderTodos() {
    todolist.innerHTML = '';

    let filteredTodos = todos;
    if (statusFilterValue === 'active') {
        filteredTodos = todos.filter(todo => todo.active);
    } 
    if (statusFilterValue === 'completed') {
        filteredTodos = todos.filter(todo => !todo.active);
    }

    filteredTodos.forEach(todo => createTodoTemplate(todo));
}

const sortRadios = document.getElementsByName('radio');
sortRadios.forEach(radio => radio.addEventListener('click', (event) => {
    statusFilterValue = event.target.value;
    renderTodos();
}))



// кнопка очистить
clearButton.addEventListener('click', () => {
    todolist.innerHTML = '';
    todos.length = 0;
    localStorage.clear();
})

renderTodos();
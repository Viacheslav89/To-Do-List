const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');
 
let todos = JSON.parse(localStorage.getItem('items')) || [];
let counter = localStorage.getItem('counter') || 1;
 
let statusFilterValue = 'all';
let editTodoId = null;


function changelocalStorage() {
    localStorage.setItem('items', JSON.stringify(todos));
}


// кнопка выполнить
function toggleTodoActive(currentTodo) {
    todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })
    changelocalStorage();
    renderTodos();
}

// кнопка удалить
function deleteTodo(currentTodo) {
    todos = todos.filter(todo => todo.id !== currentTodo.id);
    renderTodos();
    changelocalStorage();
}

// кнопка редактировать
function openTodoEditor(currentTodo) {
    editTodoId = currentTodo.id;
    renderTodos();
}



function changeTodoText(todo, todoEditInput) {
    todos.forEach((todoItem) => {
        if (todoItem.id === todo.id) {
            todoItem.text = todoEditInput.value;
            changelocalStorage();
        }
    })
    editTodoId = null;
    renderTodos();
}


function createEditTemplate(todo) {
    const editTemplate = document.createElement('div');
    editTemplate.classList.add('content__wrapper');
 
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
 
    const todoEditInput = document.createElement('input');
    todoEditInput.classList.add('todo-list-item__input');
    editTemplate.append(todoEditInput);
 
    if (!todo.active) {
        todoEditInput.classList.add('text-completed');
    }
 
    todoEditInput.value = todo.text;
    setTimeout(() => {
        todoEditInput.focus();
    }, 0);
    
    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('button', 'btn-cancel');
    buttonCancel.append('off');
    btnWrapper.prepend(buttonCancel);
 
    const buttonOk = document.createElement('button');
    buttonOk.classList.add('button', 'btn-ok');
    buttonOk.append('ok');
    btnWrapper.prepend(buttonOk);

    editTemplate.append(btnWrapper);
 
    buttonOk.addEventListener('click', () => changeTodoText(todo, todoEditInput));
 
    buttonCancel.addEventListener('click', () => {
        editTodoId = null;
        renderTodos();
    })
    
    todoEditInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            buttonOk.click();
        }
    })

    return editTemplate;
}
 

function createBtnTodo() {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const buttonCompleted = document.createElement('button');
    buttonCompleted.classList.add('button', 'btn-completed');
    buttonCompleted.append('V');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('button', 'btn-del');
    buttonDel.append('X');

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button', 'btn-edit');
    buttonEdit.append('..');

    btnWrapper.append(buttonCompleted);
    btnWrapper.append(buttonDel);
    btnWrapper.append(buttonEdit);

    return btnWrapper;
}



function createContentTemplate(todo) {
    const todoTextEl = document.createElement('p');
    todoTextEl.classList.add('todo-list__text');
    todoTextEl.append(todo.text);

    if (!todo.active) {
        todoTextEl.classList.add('text-completed');
    }
    
    const btnWrapper = createBtnTodo();
    btnWrapper.querySelector('.btn-completed').addEventListener('click', () => toggleTodoActive(todo));
    btnWrapper.querySelector('.btn-del').addEventListener('click', () => deleteTodo(todo));
    btnWrapper.querySelector('.btn-edit').addEventListener('click', () => openTodoEditor(todo));

    return {
        todoTextEl,
        btnWrapper,
    }
}



// создаем новый todo
function createTodoItem(todo) {
    const isEdit = todo.id === editTodoId;

    const todoTemplate = document.createElement('li');
    todoTemplate.classList.add('todo-list__item');
    
    if (isEdit) {
        const editTemplate = createEditTemplate(todo);
        todoTemplate.append(editTemplate);

    } else {
        const contentTemplate = createContentTemplate(todo);
        todoTemplate.append(contentTemplate.todoTextEl);
        todoTemplate.append(contentTemplate.btnWrapper);
    }
    return todoTemplate;
}



function addTodo() {
    if (!mainFieldInput.value) return;
    
    const todo = {
        text: `${mainFieldInput.value[0].toUpperCase()}${mainFieldInput.value.slice(1)}`,
        active: true,
        id: localStorage.getItem('counter') || counter,
    };
 
    mainFieldInput.value = '';
    localStorage.setItem('counter', JSON.stringify(++counter));
 
    todos.push(todo);
    changelocalStorage();

    renderTodos();
}
 
mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})
 

addButton.addEventListener('click', addTodo);

 

function renderTodos() {
    todolist.innerHTML = '';
 
    let filteredTodos = todos;
    if (statusFilterValue === 'active') {
        filteredTodos = todos.filter(todo => todo.active);
    } 
    if (statusFilterValue === 'completed') {
        filteredTodos = todos.filter(todo => !todo.active);
    }
 
    filteredTodos.forEach(todo => todolist.append(createTodoItem(todo)));
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
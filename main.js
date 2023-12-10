const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');

const state = {
    _todos: JSON.parse(localStorage.getItem('items')) || [],
    get todos() {
        return this._todos;
    },
    set todos(value) {
        this._todos = value;
        renderTodos();
    },
};


let counter = localStorage.getItem('counter') || 1;
 
let statusFilterValue = 'all';
let editTodoId = null;


function updatelocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}


// кнопка выполнить
function toggleTodoActive(currentTodo) {
    state.todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })
    state.todos = [...state.todos];
    updatelocalStorage('items', state.todos);
    // console.log(currentTodo);
}

// кнопка удалить
function deleteTodo(currentTodo) {
    state.todos = state.todos.filter(todo => todo.id !== currentTodo.id);
    updatelocalStorage('items', state.todos);
}

// кнопка редактировать
function openTodoEditor(currentTodo) {
    editTodoId = currentTodo.id;
    renderTodos();
}



function changeTodoText(todo, todoEditInput) {
    state.todos.forEach((todoItem) => {
        if (todoItem.id === todo.id) {
            todoItem.text = todoEditInput.value;
            updatelocalStorage('items', state.todos);
        }
    })
    editTodoId = null;
    state.todos = [...state.todos];
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
 

function createBtnTodo(todo) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const buttonCompleted = document.createElement('button');
    buttonCompleted.classList.add('button', 'btn-completed');
    buttonCompleted.append('V');
    buttonCompleted.addEventListener('click', () => toggleTodoActive(todo));

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('button', 'btn-del');
    buttonDel.append('X');
    buttonDel.addEventListener('click', () => deleteTodo(todo));

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button', 'btn-edit');
    buttonEdit.append('..');
    buttonEdit.addEventListener('click', () => openTodoEditor(todo));

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
    
    const btnWrapper = createBtnTodo(todo);

    return {
        todoTextEl,
        btnWrapper,
    }
}



// создаем новый todo
function createTodoTemplate(todo) {
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


function createTodo(text) {
    const todo = {
        text,
        active: true,
        id: localStorage.getItem('counter') || counter,
    }
    return todo;
}


function addTodo() {
    if (!mainFieldInput.value) return;
    
    const todo = createTodo(mainFieldInput.value);
 
    mainFieldInput.value = '';
    updatelocalStorage('counter', ++counter);
 
    state.todos.push(todo);
    state.todos = [...state.todos];
    updatelocalStorage('items', state.todos);
}
 
mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})
 

addButton.addEventListener('click', addTodo);

 

function renderTodos() {
    todolist.innerHTML = '';
 
    let filteredTodos = state.todos;
    if (statusFilterValue === 'active') {
        filteredTodos = state.todos.filter(todo => todo.active);
    } 
    if (statusFilterValue === 'completed') {
        filteredTodos = state.todos.filter(todo => !todo.active);
    }
 
    filteredTodos.forEach(todo => todolist.append(createTodoTemplate(todo)));
}
 
const sortRadios = document.getElementsByName('radio');
sortRadios.forEach(radio => radio.addEventListener('click', (event) => {
    statusFilterValue = event.target.value;
    renderTodos();
}))


 
// кнопка очистить
clearButton.addEventListener('click', () => {
    todolist.innerHTML = '';
    state.todos.length = 0;
    localStorage.clear();
})
 
renderTodos();
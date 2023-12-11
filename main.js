const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');
let counter = localStorage.getItem('counter') || 1;


const stateTodos = {
    _todos: JSON.parse(localStorage.getItem('items')) || [],
    get todos() {
        return this._todos;
    },
    set todos(value) {
        this._todos = value;
        renderTodos();
    },
};

const stateEditTodoId = {
    _editTodoId: null,
    get editTodoId() {
        return this._editTodoId;
    },
    set editTodoId(value) {
        this._editTodoId = value;
        renderTodos();
    },
};

let stateFilterValue = {
    statusFilterValue: 'all',
}

stateFilterValue = new Proxy(stateFilterValue, {
   set(target, prop, value) {
        target[prop] = value;
        renderTodos();
   }
})


function updatelocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}


// кнопка выполнить
function toggleTodoActive(currentTodo) {
    stateTodos.todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
}

// кнопка удалить
function deleteTodo(currentTodo) {
    stateTodos.todos = stateTodos.todos.filter(todo => todo.id !== currentTodo.id);
    updatelocalStorage('items', stateTodos.todos);
}

// кнопка редактировать
function openTodoEditor(currentTodo) {
    stateEditTodoId.editTodoId = currentTodo.id;
}



function changeTodoText(todo, todoEditInput) {
    stateTodos.todos.forEach((todoItem) => {
        if (todoItem.id === todo.id) {
            todoItem.text = todoEditInput.value;
            updatelocalStorage('items', stateTodos.todos);
        }
    })
    stateEditTodoId.editTodoId = null;
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
        stateEditTodoId.editTodoId = null;
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
    const isEdit = todo.id === stateEditTodoId.editTodoId;

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
 
    stateTodos.todos.push(todo);
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
}
 
mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})
 

addButton.addEventListener('click', addTodo);

 

function renderTodos() {
    todolist.innerHTML = '';
 
    let filteredTodos = stateTodos.todos;
    if (stateFilterValue.statusFilterValue === 'active') {
        filteredTodos = stateTodos.todos.filter(todo => todo.active);
    } 
    if (stateFilterValue.statusFilterValue === 'completed') {
        filteredTodos = stateTodos.todos.filter(todo => !todo.active);
    }
 
    filteredTodos.forEach(todo => todolist.append(createTodoTemplate(todo)));
}
 
const sortRadios = document.getElementsByName('radio');
sortRadios.forEach(radio => radio.addEventListener('click', (event) => {
    stateFilterValue.statusFilterValue = event.target.value;
}))

 
// кнопка очистить
clearButton.addEventListener('click', () => {
    todolist.innerHTML = '';
    stateTodos.todos.length = 0;
    localStorage.clear();
})
 
renderTodos();
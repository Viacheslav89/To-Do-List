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
    todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })

    localStorage.setItem('items', JSON.stringify(todos));
    renderTodos();
}

 
// кнопка удалить
function deleteTodo(currentTodo) {
    todos = todos.filter(todo => todo.id !== currentTodo.id);
    renderTodos();
 
    localStorage.setItem('items', JSON.stringify(todos));
}
 
// кнопка редактировать
function openTodoEditor(currentTodo) {
    editTodoId = currentTodo.id;
    renderTodos();
}

 

function createEditTemplate(todo) {
    const editTemplate = document.createElement('div');
    editTemplate.classList.add('content__wrapper');
 
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn__wrapper');
 
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
 
    buttonOk.addEventListener('click', () => {        
        todos.forEach((todoItem) => {
            if (todoItem.id === todo.id) {
                todoItem.text = todoEditInput.value;
                localStorage.setItem('items', JSON.stringify(todos));
            }
        })
        editTodoId = null;
        renderTodos();
    })
 
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
 

// создаем новый todo
function createTodoTemplate(todo) {
    const isEdit = todo.id === editTodoId;

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item');
    
    if (isEdit) {
        const editTemplate = createEditTemplate(todo);
        todoItem.append(editTemplate);

    } else {
        const todosWrapper = document.createElement('div');
        todosWrapper.classList.add('btn__wrapper');
    
        const todoText = document.createElement('p');
        todoText.classList.add('todo-list__text');
 
        todoText.append(todo.text);
 
        if (!todo.active) {
            todoText.classList.add('text-completed');
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
        buttonEdit.addEventListener('click', () => openTodoEditor(todo));
        buttonEdit.append('..');
        todosWrapper.append(buttonEdit);
 
        todoItem.append(todoText);
        todoItem.append(todosWrapper);
    }
    
    return todoItem;
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
 
    todos.push(todo);
    localStorage.setItem('items', JSON.stringify(todos));

    renderTodos();
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
    todos.length = 0;
    localStorage.clear();
})
 
renderTodos();
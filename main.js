import './style.scss';
import { createGetSetState, createProxyState, createFunctionState } from './utility.js';

import { toggleTodoActive, deleteTodo, openTodoEditor, addTodo, changeTodoText } from './halper.js';

export const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');
// let counter = localStorage.getItem('counter') || 1;


export const stateTodos = createGetSetState(JSON.parse(localStorage.getItem('items')) || []);
export const stateFilterValue = createProxyState({ statusFilter: 'all' });
export let [ getEditTodoId, setEditTodoId ] = createFunctionState(0);



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
        setEditTodoId(null);
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



function createTodoTemplate(todo) {
    const isEdit = todo.id === getEditTodoId();

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

 

mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})
 
addButton.addEventListener('click', addTodo);

 

export function renderTodos() {
    todolist.innerHTML = '';
 
    let filteredTodos = stateTodos.todos;
    if (stateFilterValue.statusFilter === 'active') {
        filteredTodos = stateTodos.todos.filter(todo => todo.active);
    } 
    if (stateFilterValue.statusFilter === 'completed') {
        filteredTodos = stateTodos.todos.filter(todo => !todo.active);
    }
 
    filteredTodos.forEach(todo => todolist.append(createTodoTemplate(todo)));
}
 
const sortRadios = document.getElementsByName('radio');
sortRadios.forEach(radio => radio.addEventListener('click', (event) => {
    stateFilterValue.statusFilter = event.target.value;
}))


 
clearButton.addEventListener('click', () => {
    todolist.innerHTML = '';
    stateTodos.todos.length = 0;
    localStorage.clear();
})
 
renderTodos();
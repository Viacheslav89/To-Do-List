import { updatelocalStorage } from './utility.js';
import { mainFieldInput, stateTodos, setEditTodoId } from './main.js';

let counter = localStorage.getItem('counter') || 1;

export function changeTodoText(todo, todoEditInput) {
    stateTodos.todos.forEach((todoItem) => {
        if (todoItem.id === todo.id) {
            todoItem.text = todoEditInput.value;
            updatelocalStorage('items', stateTodos.todos);
        }
    })
    setEditTodoId(null);
}


export function toggleTodoActive(currentTodo) {
    stateTodos.todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
}


export function deleteTodo(currentTodo) {
    stateTodos.todos = stateTodos.todos.filter(todo => todo.id !== currentTodo.id);
    updatelocalStorage('items', stateTodos.todos);
}


export function openTodoEditor(currentTodo) {
    setEditTodoId(currentTodo.id);
}


export function createTodo(text) {
    const todo = {
        text,
        active: true,
        id: localStorage.getItem('counter') || counter,
    }
    return todo;
}


export function addTodo() {
    if (!mainFieldInput.value) return;
    
    const todo = createTodo(mainFieldInput.value);
 
    mainFieldInput.value = '';
    updatelocalStorage('counter', ++counter);
 
    stateTodos.todos.push(todo);
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
}
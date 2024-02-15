import { updatelocalStorage } from './utility.ts';
import { mainFieldInput, stateTodos, setEditTodoId } from './main.ts';

let counter = Number(localStorage.getItem('counter')) || 1;


export function changeTodoText(todo: Todo, todoEditInput: HTMLInputElement) {
    stateTodos.todos.forEach((todoItem) => {
        if (todoItem.id === todo.id) {
            todoItem.text = todoEditInput.value;
            updatelocalStorage('items', stateTodos.todos);
        }
    })
    setEditTodoId(null);
}


export function toggleTodoActive(currentTodo: Todo) {
    stateTodos.todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
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


export function deleteTodo(currentTodo: Todo) {
    stateTodos.todos = stateTodos.todos.filter(todo => todo.id !== currentTodo.id);
    updatelocalStorage('items', stateTodos.todos);
}


export function openTodoEditor(currentTodo: Todo) {
    setEditTodoId(currentTodo.id);
}


export interface Todo {
    text: string;
    active: boolean;
    id: number;
}


export function createTodo(text: string) {

    const todo = {
        text,
        active: true,
        id: Number(localStorage.getItem('counter')) || counter,
        
    }
    return todo;
}



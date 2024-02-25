import { updatelocalStorage } from './utility.ts';
import { mainFieldInput, stateTodos, setEditTodoId, Todo } from './main.ts';

let counter = Number(localStorage.getItem('counter')) || 1;


export function changeTodoText(todo: Todo, todoEditInput: HTMLInputElement): void {
    stateTodos.todos.forEach((todoItem) => {
        if (todoItem.id === todo.id) {
            todoItem.text = todoEditInput.value;
            updatelocalStorage('items', stateTodos.todos);
        }
    })
    setEditTodoId(null);
}


export function toggleTodoActive(currentTodo: Todo): void {
    stateTodos.todos.forEach(todo => {
        if (currentTodo.id !== todo.id)  return;
        todo.active = !currentTodo.active;
    })
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
}


export function addTodo(): void {
    if (!mainFieldInput.value) return;
    
    const todo = createTodo(mainFieldInput.value);
 
    mainFieldInput.value = '';
    updatelocalStorage('counter', ++counter);
 
    stateTodos.todos.push(todo);
    stateTodos.todos = [...stateTodos.todos];
    updatelocalStorage('items', stateTodos.todos);
}


export function deleteTodo(currentTodo: Todo): void {
    stateTodos.todos = stateTodos.todos.filter(todo => todo.id !== currentTodo.id);
    updatelocalStorage('items', stateTodos.todos);
}


export function openTodoEditor(currentTodo: Todo): void {
    setEditTodoId(currentTodo.id);
}


export function createTodo(text: string): Todo {

    const todo: Todo = {
        text,
        active: true,
        id: counter,
        
    }
    return todo;
}


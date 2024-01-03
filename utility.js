import { renderTodos } from './main.js';

export function createGetSetState(initialValue) {
    return {
        _todos: initialValue,
        get todos() {
            return this._todos;
        },
        set todos(value) {
            this._todos = value;
            renderTodos();
        },
    }
}


export function createProxyState(initialValue) {
    let statusFilterValue;
    return statusFilterValue = new Proxy(initialValue, {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            target[prop] = value;
            renderTodos();
            return true;
        }
    });
}


export function createFunctionState(initialValue) {
    let value = initialValue;
    return [function getEditTodoId() {
        return value;
    }, function setEditTodoId(val) {
            value = val;
            renderTodos();
    }];
}


export function updatelocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}


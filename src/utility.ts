import { renderTodos } from './main.ts';
import { Todo } from './helpers.ts';


export function createGetSetState(initialValue: Todo[] | [] ): {_todos: Todo[], get todos(): Todo[], set todos(value: any)} {
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



export function createProxyState(initialValue: any) {
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


export function createFunctionState(initialValue: number) {
    let value = initialValue;
    return [function getEditTodoId() {
        return value;
    }, function setEditTodoId(val: any) {
            value = val;
            renderTodos();
    }];
}


export function updatelocalStorage(name: string, value: Todo[] | number): void {
    localStorage.setItem(name, JSON.stringify(value));
}

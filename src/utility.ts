import { renderTodos, Todo } from './main.ts';


export function createGetSetState(initialValue: Todo[]): {_todos: Todo[], get todos(): Todo[], set todos(value: Todo[])} {
    return {
        _todos: initialValue,
        get todos() {
            return this._todos;
        },
        set todos(value: Todo[]) {
            this._todos = value;
            renderTodos();
        },
    }
}


export function createProxyState(initialValue: { statusFilter: string }) {
  const proxy = new Proxy(initialValue, {
      get(target, prop: keyof typeof initialValue) {
          return target[prop];
      },
      set(target, prop: keyof typeof initialValue, value) {
          target[prop] = value;
          renderTodos();
          return true;
      }
  });
  
  return proxy;
}


export function createFunctionState(initialValue: number | null): [ () => number | null, (val: number | null) => void ] {
    let value = initialValue;
    return [ function () {
        return value;
    }, function (val: number | null) {
            value = val;
            renderTodos();
    } ];
}


export function updatelocalStorage(name: string, value: Todo[] | number): void {
    localStorage.setItem(name, JSON.stringify(value));
}





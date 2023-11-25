const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');

const todos = [];
let counter = 1;


function createTodoItem(todoItemObj) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item');
    todoItem.id = todoItemObj.id;

    const todoText = document.createElement('p');
    todoText.classList.add('todo-list__text');
    todoText.append(todoItemObj.text);

    if (todoItemObj.active === false) {
        todoText.classList.add('todo-list__text--completed');
    }

    const todosWrapper = document.createElement('div');
    todosWrapper.classList.add('todo-list__wrapper');

    const buttonCompleted = document.createElement('button');
    buttonCompleted.classList.add('button', 'btn-completed');
    buttonCompleted.append('V');
    todosWrapper.append(buttonCompleted);


    // обработчик событий выполнено
    buttonCompleted.addEventListener('click', (event) => {
        const todoItem = event.target.closest('li');

        if (!todoItem.classList.contains('todo-list__text--completed')) {
            todoItem.classList.add('todo-list__text--completed');
            todos.forEach((todo) => {
                if (todo.id === +todoItem.id) {
                    todo.active = false;
                }
            })
        } else {
            todoItem.classList.remove('todo-list__text--completed');
            todos.forEach((todo) => {
                if (todo.id === +todoItem.id) {
                    todo.active = true;
                }
            })
        }

        if (document.querySelector('.active-radio').checked) {
            todoItem.remove();
        }
    })   

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('button', 'btn-del');
    buttonDel.append('X');
    todosWrapper.append(buttonDel);


    // обработчик событий удалить
    buttonDel.addEventListener('click', (event) => {
        const todoItem = event.target.closest('li');

        todos.forEach((todo, index) => {
            todos.splice(index, 1);
        })

        todoItem.remove();
    })    

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button', 'btn-edit');


    // обработчик событий редактировать
    buttonEdit.addEventListener('click', (event) => {
        const todoItem = event.target.closest('li');
        const btnWrapper = event.target.closest('.todo-list__wrapper');

        if (btnWrapper.childNodes.length === 4) return;

        const todoEditInput = document.createElement('input');
        todoEditInput.classList.add('todo-list-item__input');

        todos.forEach((todo) => {
            if (todo.active === false && todo.id === +todoItem.id) {
                todoEditInput.classList.add('todo-list__text--completed');
            }
        })

        const text = todoItem.querySelector('.todo-list__text').textContent;
        todoEditInput.value = text;

        const buttonOk = document.createElement('button');
        buttonOk.classList.add('button', 'btn-ok');
        buttonOk.append('ok');
        btnWrapper.prepend(buttonOk);

        const textBox = event.target.closest('li').querySelector('.todo-list__text');

        textBox.innerHTML = '';
        textBox.append(todoEditInput);
        todoEditInput.focus();
        
        buttonOk.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-ok')) {
                const text = todoEditInput.value;
                todoEditInput.remove();
                textBox.innerHTML = text;
                buttonOk.remove();
            }

            todos.forEach((todo) => {
                if (todo.id === +todoItem.id) {
                    const index = todos.map(el => el.id).indexOf(+todoItem.id);
                    todos[index].text = todoEditInput.value;
                }
            })
        })
        
        todoEditInput.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                buttonOk.click();
            }
        })
    })
    
    buttonEdit.append('..');
    todosWrapper.append(buttonEdit);
    
    todoItem.append(todoText);
    todoItem.append(todosWrapper);
    todolist.append(todoItem);
}


// обработчик событий добавить
addButton.addEventListener('click', (event) => {
    if (!mainFieldInput.value) return;
    
    const todo = {
        text: `${mainFieldInput.value[0].toUpperCase()}${mainFieldInput.value.slice(1)}`,
        active: true,
        id: counter,
    };

    counter++;
    mainFieldInput.value = '';

    if (document.querySelector('.completed-radio').checked === false) {
        createTodoItem(todo);
    }

    todos.push(todo);
})

mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})


let statusFilterValue = 'all';

function renderTodos() {
    if (statusFilterValue === 'active') {
        todos.filter(todo => todo.active === true).forEach(todo => createTodoItem(todo));
    } else if (statusFilterValue === 'completed') {
        todos.filter(todo => todo.active === false).forEach(todo => createTodoItem(todo));
    } else {
        todos.forEach(todo => createTodoItem(todo));
    }
}

const sortRadios = document.getElementsByName('radio');
sortRadios.forEach(radio => radio.addEventListener('click', (event) => {
    todolist.innerHTML = '';
    statusFilterValue = event.target.value;
    renderTodos();
}))


// кнопка удалить
clearButton.addEventListener('click', (event) => {
    todolist.innerHTML = '';
    todos.length = 0;
})
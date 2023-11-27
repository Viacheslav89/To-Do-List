const mainFieldInput = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');

const todos = JSON.parse(localStorage.getItem('items')) || [];
let counter = 1;



// создать кнопку выполнить
function createBtnCompleted(event) {
    const todoItem = event.target.closest('li');

    if (!todoItem.classList.contains('todo-list__text--completed')) {
        todoItem.classList.toggle('todo-list__text--completed');
        todos.forEach((todo) => {
            if (todo.id === +todoItem.id) {
                todo.active = false;
                localStorage.setItem('items', JSON.stringify(todos));
            }
        })
    } else {
        todoItem.classList.toggle('todo-list__text--completed');
        todos.forEach((todo) => {
            if (todo.id === +todoItem.id) {
                todo.active = true;
                localStorage.setItem('items', JSON.stringify(todos));
            }
        })
    }
    if (document.querySelector('.active-radio').checked) {
        todoItem.remove();
    }
}



// создать кнопку удалить
function createBtnDel(event) {
    const todoItem = event.target.closest('li');

    todos.forEach((todo) => {
        if (todo.id === +todoItem.id) {
            const index = todos.map(el => el.id).indexOf(+todoItem.id);
            todos.splice(index, 1);
            // JSON.parse(localStorage.getItem('items')).splice(index, 1);
            //  из localStorage при удалении пока не удаляет 
        }
    })
    
    todoItem.remove();
}



// создать кнопку редактировать
function createBtnEdit(event) {
    const todoItem = event.target.closest('li');
    const btnWrapper = event.target.closest('.todo-list__wrapper');
    if(todolist.classList.contains('edit')) return;

    [...todoItem.getElementsByClassName('button')].forEach(i => i.classList.add('hidden'));
    todolist.classList.add('edit');

    const todoEditInput = document.createElement('input');
    todoEditInput.classList.add('todo-list-item__input');

    todos.forEach((todo) => {
        if (!todo.active && todo.id === +todoItem.id) {
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
        [...document.getElementsByClassName('button')].forEach(i => i.classList.remove('hidden'));
        todolist.classList.remove('edit');
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
                localStorage.setItem('items', JSON.stringify(todos));
            }
        })
    })
    
    todoEditInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            buttonOk.click();
        }
    })
}



// создаем новый todo
function createTodoItem(todoItemObj) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item');
    todoItem.id = todoItemObj.id;

    const todoText = document.createElement('p');
    todoText.classList.add('todo-list__text');
    todoText.append(todoItemObj.text);

    if (!todoItemObj.active) {
        todoText.classList.add('todo-list__text--completed');
    }

    const todosWrapper = document.createElement('div');
    todosWrapper.classList.add('todo-list__wrapper');

    const buttonCompleted = document.createElement('button');
    buttonCompleted.classList.add('button', 'btn-completed');
    buttonCompleted.append('V');
    todosWrapper.append(buttonCompleted);


    // обработчик событий выполнено
    buttonCompleted.addEventListener('click', createBtnCompleted);

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('button', 'btn-del');
    buttonDel.append('X');
    todosWrapper.append(buttonDel);



    // обработчик событий удалить
    buttonDel.addEventListener('click', createBtnDel);
    
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button', 'btn-edit');



    // обработчик событий редактировать
    buttonEdit.addEventListener('click', createBtnEdit);
    
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

    if (!document.querySelector('.completed-radio').checked) {
        createTodoItem(todo);
    }

    todos.push(todo);
    localStorage.setItem('items', JSON.stringify(todos));
    // console.log(localStorage.getItem('items', JSON.stringify(todos)));
})

mainFieldInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
})



let statusFilterValue = 'all';

function renderTodos() {
    todolist.innerHTML = '';

    let filteredTodos = todos;
    if (statusFilterValue === 'active') {
        filteredTodos = todos.filter(todo => todo.active);
    } 
    if (statusFilterValue === 'completed') {
        filteredTodos = todos.filter(todo => !todo.active);
    }

    filteredTodos.forEach(todo => createTodoItem(todo));
}

const sortRadios = document.getElementsByName('radio');
sortRadios.forEach(radio => radio.addEventListener('click', (event) => {
    statusFilterValue = event.target.value;
    renderTodos();
}))



// кнопка удалить
clearButton.addEventListener('click', (event) => {
    todolist.innerHTML = '';
    todos.length = 0;
    localStorage.clear();
})

todos.forEach(todo => createTodoItem(todo));
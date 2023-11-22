const input = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const todolist = document.querySelector('.todo-list');

const todos = [];
let counter = 1;


addButton.addEventListener('click', function(event) {
    if (!input.value) return;
    
    const todo = {
        text: `${input.value[0].toUpperCase()}${input.value.slice(1)}`,
        active: true,
        id: counter,
    };

    counter++;
    input.value = '';

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item');
    todoItem.id = todo.id;

    const todoText = document.createElement('p');
    todoText.classList.add('todo-list__text');
    todoText.append(todo.text);

    const todosWrapper = document.createElement('div');
    todosWrapper.classList.add('todo-list__wrapper');

    const buttonCompleted = document.createElement('button');
    buttonCompleted.classList.add('button', 'btn-completed');
    buttonCompleted.append('V');
    todosWrapper.append(buttonCompleted);
    
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('button', 'btn-del');
    buttonDel.append('X');
    todosWrapper.append(buttonDel);
    
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button', 'btn-edit');
    buttonEdit.append('..');
    todosWrapper.append(buttonEdit);

    todoItem.append(todoText);
    todoItem.append(todosWrapper);
    todolist.append(todoItem);

    todos.push(todo);
})


input.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
})


// обработчики событий button
todolist.addEventListener('click', function(event) {
    const todoItem = event.target.closest('li');
    const btnWrapper = event.target.closest('.todo-list__wrapper');

    // обработчики событий выполнено
    if (event.target.classList.contains('btn-completed')) {
        if (!todoItem.classList.contains('todo-list__text--completed')) {
            todoItem.classList.add('todo-list__text--completed');
            todos.forEach((todo) => {
                if (todo.id == todoItem.id) {
                    todo.active = false;
                }
            })
        } else {
            todoItem.classList.remove('todo-list__text--completed');
            todos.forEach((todo) => {
                if (todo.id == todoItem.id) {
                    todo.active = true;
                }
            })
        }

        if (document.querySelector('.active-radio').checked) {
            todoItem.remove();
        }

    }

    // обработчики событий удалить
    if (event.target.classList.contains('btn-del')) {

        todos.forEach((todo) => {
            if (todo.id == todoItem.id) {
                const index = todos.map(el => el.id).indexOf(Number(todoItem.id));
                todos.splice(index, 1);
            }
        })

        todoItem.remove();
    }

    // обработчики событий редактировать
    if (event.target.classList.contains('btn-edit')) {
        if (btnWrapper.childNodes.length === 4) return;

        const inputLi = document.createElement('input');
        inputLi.classList.add('todo-list-item__input');

        if (todoItem.querySelector('p').classList.contains('todo-list__text--completed')) {
            inputLi.classList.add('todo-list__text--completed');
        }

        const text = todoItem.querySelector('.todo-list__text').textContent;
        inputLi.value = text;

        const buttonOk = document.createElement('button');
        buttonOk.classList.add('button', 'btn-ok');
        buttonOk.append('ok');
        btnWrapper.prepend(buttonOk);

        const textBox = event.target.closest('li').querySelector('.todo-list__text');

        textBox.innerHTML = '';
        textBox.append(inputLi);
        inputLi.focus();
        
        buttonOk.addEventListener('click', function(event) {
            if (event.target.classList.contains('btn-ok')) {
                const text = inputLi.value;
                inputLi.remove();
                textBox.innerHTML = text;
                buttonOk.remove();
            }

            todos.forEach((todo) => {
                if (todo.id == todoItem.id) {
                    const index = todos.map(el => el.id).indexOf(Number(todoItem.id));
                    todos[index].text = inputLi.value;
                }
            })
        })
        
        inputLi.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                buttonOk.click();
            }
        })
    }
})


// радио выполненые
const completedRadio = document.querySelector('.completed-radio');
completedRadio.addEventListener('click', function(event) {
    
    todolist.innerHTML = '';

    todos.forEach(todo => {
        if (todo.active === false) {

            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-list__item');
            todoItem.id = todo.id;
            
            const todoText = document.createElement('p');
            todoText.classList.add('todo-list__text', 'todo-list__text--completed');
            todoText.append(todo.text);
            
            const todosWrapper = document.createElement('div');
            todosWrapper.classList.add('todo-list__wrapper');

            const buttonCompleted = document.createElement('button');
            buttonCompleted.classList.add('button', 'btn-completed');
            buttonCompleted.append('V');
            todosWrapper.append(buttonCompleted);
            
            const buttonDel = document.createElement('button');
            buttonDel.classList.add('button', 'btn-del');
            buttonDel.append('X');
            todosWrapper.append(buttonDel);
            
            const buttonEdit = document.createElement('button');
            buttonEdit.classList.add('button', 'btn-edit');
            buttonEdit.append('..');
            todosWrapper.append(buttonEdit);
            
            todoItem.append(todoText);
            todoItem.append(todosWrapper);
            todolist.append(todoItem);
        }
    })
    
})


// радио активные
const activeRadio = document.querySelector('.active-radio');
activeRadio.addEventListener('click', function(event) {
    
    todolist.innerHTML = '';
    
    todos.forEach(todo => {
        if (todo.active === true) {
            
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-list__item');
            todoItem.id = todo.id;
            
            const todoText = document.createElement('p');
            todoText.classList.add('todo-list__text');
            todoText.append(todo.text);
            
            const todosWrapper = document.createElement('div');
            todosWrapper.classList.add('todo-list__wrapper');
        
            const buttonCompleted = document.createElement('button');
            buttonCompleted.classList.add('button', 'btn-completed');
            buttonCompleted.append('V');
            todosWrapper.append(buttonCompleted);
            
            const buttonDel = document.createElement('button');
            buttonDel.classList.add('button', 'btn-del');
            buttonDel.append('X');
            todosWrapper.append(buttonDel);
            
            const buttonEdit = document.createElement('button');
            buttonEdit.classList.add('button', 'btn-edit');
            buttonEdit.append('..');
            todosWrapper.append(buttonEdit);
            
            todoItem.append(todoText);
            todoItem.append(todosWrapper);
            todolist.append(todoItem);
        }
    })
})


// радио весь лист
const allRadio = document.querySelector('.all-radio');
allRadio.addEventListener('click', function(event) {

    todolist.innerHTML = '';
    
    todos.forEach(todo => {

        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-list__item');
        todoItem.id = todo.id;
        
        const todoText = document.createElement('p');
        todoText.classList.add('todo-list__text');
        
        if (todo.active === false) {
            todoItem.classList.add('todo-list__text--completed');
        }
            
        todoText.append(todo.text);
    
        const todosWrapper = document.createElement('div');
        todosWrapper.classList.add('todo-list__wrapper');
    
        const buttonCompleted = document.createElement('button');
        buttonCompleted.classList.add('button', 'btn-completed');
        buttonCompleted.append('V');
        todosWrapper.append(buttonCompleted);
        
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('button', 'btn-del');
        buttonDel.append('X');
        todosWrapper.append(buttonDel);
        
        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('button', 'btn-edit');
        buttonEdit.append('..');
        todosWrapper.append(buttonEdit);
        
        todoItem.append(todoText);
        todoItem.append(todosWrapper);
        todolist.append(todoItem);
    })
})


// удаляю все li с list
clearButton.addEventListener('click', function(event) {
    todolist.innerHTML = '';
    todos.length = 0;
})
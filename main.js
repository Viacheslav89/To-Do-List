const input = document.querySelector('.input');
const add = document.querySelector('.add');
const clear = document.querySelector('.clear');
const todolist = document.querySelector('.todo-list');


let todoListArr = [];
let counter = 1;


add.addEventListener('click', function(event) {
    if (!input.value) return;
    
    const todo = {
        text: input.value,
        active: true,
        id: counter,
    };
    
    if (input.value[0] !== input.value[0].toUpperCase()) {
        todo.text = `${input.value[0].toUpperCase()}${input.value.slice(1)}`;
    }

    counter++;
    input.value = '';

    const li = document.createElement('li');
    li.classList.add('todo-list__item');
    li.id = todo.id;

    const p = document.createElement('p');
    p.classList.add('todo-list__text');
    p.append(todo.text);

    const div = document.createElement('div');
    div.classList.add('todo-list-img__wrapper');
    div.innerHTML = '<img class="picture perform" src="./svg/perform.svg"><img class="picture del" src="./svg/delete.svg"><img class="picture edit" src="./svg/edit.svg"></img>';

    li.append(p);
    li.append(div);
    todolist.append(li);

    todoListArr.push(todo);
})


input.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        add.click();
    }
})


// обработчики событий svg
todolist.addEventListener('click', function(event) {
    const li = event.target.closest('li');
    const imgWrapper = event.target.closest('.todo-list-img__wrapper');

    // обработчики событий выполнено
    if (event.target.classList.contains('perform')) {
        li.classList.add('todo-list__completed');
        todoListArr.forEach((todo) => {
            if (todo.id == li.id) {
                todo.active = false;
            }
        })
    }

    // обработчики событий удалить
    if (event.target.classList.contains('del')) {
        li.remove();
    }

    // обработчики событий редактировать
    if (event.target.classList.contains('edit')) {
        if (imgWrapper.childNodes.length === 4) return;

        let inputLi = document.createElement('input');
        inputLi.classList.add('input_li');

        let text = li.querySelector('.todo-list__text').textContent;
        inputLi.value = text;


        let imgOk = document.createElement('img');
        imgOk.classList.add('picture', 'ok');
        imgOk.src = './svg/ok.svg';
        imgWrapper.prepend(imgOk);

        let textBox = event.target.closest('li').querySelector('.todo-list__text');

        textBox.innerHTML = '';
        textBox.append(inputLi);
        inputLi.focus();
        
        
        let ok = event.target.closest('li').querySelector('.ok');
        ok.addEventListener('click', function(event) {
            if (event.target.classList.contains('ok')) {
                let text = inputLi.value;
                inputLi.remove();
                textBox.innerHTML = text;
                ok.remove();
            }
        })

        
        inputLi.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                ok.click();
            }
        })
    }
})


// радио выполненые
const completedRadio = document.querySelector('.completed-radio');
completedRadio.addEventListener('click', function(event) {
    
    todolist.innerHTML = '';

    todoListArr.forEach(todo => {
        if (todo.active == false) {

            const li = document.createElement('li');
            li.classList.add('todo-list__item');
            li.id = todo.id;
            
            const p = document.createElement('p');
            p.classList.add('todo-list__text', 'todo-list__completed');
            p.append(todo.text);
            
            const div = document.createElement('div');
            div.classList.add('todo-list-img__wrapper');
            div.innerHTML = '<img class="picture perform" src="./svg/perform.svg"><img class="picture del" src="./svg/delete.svg"><img class="picture edit" src="./svg/edit.svg"></img>';
            
            li.append(p);
            li.append(div);
            todolist.append(li);
        }
    });
    
})


// радио активные
const activeRadio = document.querySelector('.active-radio');
activeRadio.addEventListener('click', function(event) {
    
    todolist.innerHTML = '';
    
    todoListArr.forEach(todo => {
        if (todo.active == true) {
            
            const li = document.createElement('li');
            li.classList.add('todo-list__item');
            li.id = todo.id;
            
            const p = document.createElement('p');
            p.classList.add('todo-list__text');
            p.append(todo.text);
            
            const div = document.createElement('div');
            div.classList.add('todo-list-img__wrapper');
            div.innerHTML = '<img class="picture perform" src="./svg/perform.svg"><img class="picture del" src="./svg/delete.svg"><img class="picture edit" src="./svg/edit.svg"></img>';
            
            li.append(p);
            li.append(div);
            todolist.append(li);
        }
    });
})


// радио весь лист
const allRadio = document.querySelector('.all-radio');
allRadio.addEventListener('click', function(event) {
    
    todolist.innerHTML = '';
    
    todoListArr.forEach(todo => {

        const li = document.createElement('li');
        li.classList.add('todo-list__item');
        li.id = todo.id;
        
        const p = document.createElement('p');
        p.classList.add('todo-list__text');
        
        if (todo.active == false) {
            p.classList.add('todo-list__completed');
        }
            
        p.append(todo.text);
        
        const div = document.createElement('div');
        div.classList.add('todo-list-img__wrapper');
        div.innerHTML = '<img class="picture perform" src="./svg/perform.svg"><img class="picture del" src="./svg/delete.svg"><img class="picture edit" src="./svg/edit.svg"></img>';
        
        li.append(p);
        li.append(div);
        todolist.append(li);
    });
})


// удаляю все li с list
clear.addEventListener('click', function(event) {
    todolist.innerHTML = '';
    todoListArr.length = 0;
})
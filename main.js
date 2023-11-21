const input = document.querySelector('.input');

const add = document.querySelector('.add');
const clear = document.querySelector('.clear');

const todolist = document.querySelector('.todo-list');


todoListArr = [];
let counter = 1;

const todo = {
    active: false, 
    id: counter, 
}


add.addEventListener('click', function(event) {
    if (!input.value) return;
    
    todo.text = input.value;
    counter++;

    input.value = '';
    todoListArr.push(todo);

    const li = document.createElement('li');
    li.classList.add('todo-list__item');
    li.id = todo.id;

    const p = document.createElement('p');
    p.classList.add('todo-list__text');
    p.classList.add(todo.class);
    p.append(todo.text);

    const div = document.createElement('div');
    div.classList.add('todo-list-img__wrapper');
    div.innerHTML = '<img class="picture perform" src="./svg/perform.svg"><img class="picture del" src="./svg/delete.svg"><img class="picture edit" src="./svg/edit.svg"></img>';

    li.append(p);
    li.append(div);
    todolist.append(li);
    
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

    // const ok = event.target.closest('li').querySelector('.ok');
    // const perform = event.target.closest('li').querySelector('.perform');
    // const del = event.target.closest('li').querySelector('.del');
    // const edit = event.target.closest('li').querySelector('.edit');

    // обработчики событий выполнено
    if (event.target.classList.contains('perform')) {
        li.classList.add('todo-list__completed');
        let id = li.id;
        todoListArr.forEach((todo) => {
            if (todo.id == id) {
                todo.active = true;
            }
        })

        // // console.log(todoListArr.filter(todo => todo.id == id));
        // let completedArr = todoListArr.filter(todo => todo.id == id);
        

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


// удаляю все li с list
clear.addEventListener('click', function(event) {
    todolist.querySelectorAll('li').forEach((li) => li.remove())
})


const completedRadio = document.querySelector('.completed-radio');
completedRadio.addEventListener('click', function(event) {
    // let id = li.id;
    // console.log(todoListArr.filter(todo => todo.id == id));
    // let completedArr = todoListArr.filter(todo => todo.id == id);
    
    
    
    // todolist.innerHTML = '';
    // console.log(todoListArr.map(todo));





})

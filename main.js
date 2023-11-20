const input = document.querySelector('.input');

const add = document.querySelector('.add');
const clear = document.querySelector('.clear');

const todolist = document.querySelector('.todo-list');


todoListArr = [];
let counter = 1;


add.addEventListener('click', function(event) {
    if (!input.value) return;


    const todo = {
        text: input.value,
        active: false, 
        id: counter, 
    }
    counter++;

    input.value = '';
    todoListArr.push(todo);
    // todolist.innerHTML = '';

    const li = document.createElement('li');
    li.classList.add('todo-list__item');

    const p = document.createElement('p');
    p.classList.add('todo-list__text');
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

    // обработчики событий вополнено
    if (event.target.classList.contains('perform')) {
        li.classList.add('todo-list__completed');
        // console.log(todoListArr);
    }

    // обработчики событий удалить
    if (event.target.classList.contains('del')) {
        li.remove();
    }

    // обработчики событий редактировать
    if (event.target.classList.contains('edit')) {
        // li.querySelector('img').classList.remove('hidden');

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
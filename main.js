const input = document.querySelector('.input');

const add = document.querySelector('.add');
const clear = document.querySelector('.clear');

const list = document.querySelector('.list');
const list2 = document.querySelector('.list2');
const list3 = document.querySelector('.list3');


// добавляю li в list
add.addEventListener('click', function(event) {
    const li = document.createElement('li');
    // const li2 = document.createElement('li');

    if (!input.value) return;

    li.innerHTML = `<div class="wrapper_svg"><img class="fit-picture perform" src="./svg/perform.svg" alt="Выполнить"><img class="fit-picture deleteLi" src="./svg/delete.svg" alt="Удалить"><img class="fit-picture edit" src="./svg/edit.svg" alt="Редактировать"></div>`;

    const textBox = document.createElement('div');
    // const textBox2 = document.createElement('div');

    textBox.append(input.value);
    // textBox2.append(input.value);

    textBox.classList.add('wrapper_text');
    // textBox2.classList.add('wrapper_text');

    li.classList.add('list_item');
    // li2.classList.add('list_item');

    li.append(textBox);
    // li2.append(textBox2);


    list.append(li);
    // list2.append(li2);

    input.value = '';
})

input.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        add.click();
    }
})


// переменные SVG
const perform = document.querySelector('.perform');
const deleteLi = document.querySelector('.deleteLi');
const edit = document.querySelector('.edit');


// обработчики событий svg
list.addEventListener('click', function(event) {
    let li = event.target.closest('li');

    // кнопка удалить
    if (event.target.classList.contains('deleteLi')) {
        li.remove();
    }

    // кнопка редактировать
    if (event.target.classList.contains('edit')) {
    
        let wrapperSvg = event.target.closest('li').querySelector('.wrapper_svg');
        if (wrapperSvg.children.length === 4) return;

        let imgOk = document.createElement('img');
        imgOk.classList.add('fit-picture', 'ok');
        imgOk.src = './svg/ok.svg';
        wrapperSvg.prepend(imgOk);

        let textBox = event.target.closest('li').querySelector('.wrapper_text')
        console.log(textBox.innerHTML);

        let inputLi = document.createElement('input');
        inputLi.classList.add('input_li');

        let text = event.target.closest('li').querySelector('.wrapper_text').textContent;
        inputLi.value = text;

        li.append(inputLi);
        textBox.innerHTML = '';

        let ok = event.target.closest('li').querySelector('.ok');
        ok.addEventListener('click', function(event) {

            let text = inputLi.value;
            inputLi.remove();
            textBox.innerHTML = text;
            ok.remove();
        })
    }

    // кнопка выполнено
    if (event.target.classList.contains('perform')) {

        let textBox = event.target.closest('li');

        // list2.querySelector('li').classList.add('list_active');

        textBox.classList.add('list_item_finish');
        const completedLi = document.createElement('li');
        completedLi.classList.add('completed', 'list_item');
        completedLi.innerHTML = li.innerHTML;
        document.querySelector('#text3').append(completedLi);
        // console.log(completedLi);
    }
})


// удаляю все li с list
clear.addEventListener('click', function(event) {
    document.querySelectorAll('li').forEach((li) => li.remove())
})


// радио весь список
const allRadio = document.querySelector('.allRadio');
allRadio.addEventListener('click', function(event) {
    list.classList.remove('hidden');
    list2.classList.add('hidden');
    list3.classList.add('hidden');
})


// радио активные
const activeRadio = document.querySelector('.activeRadio');
activeRadio.addEventListener('click', function(event) {
    list2.classList.remove('hidden');
    list.classList.add('hidden');
    list3.classList.add('hidden');

})


// радио выполненые
const completedRadio = document.querySelector('.completedRadio');
completedRadio.addEventListener('click', function(event) {
    list3.classList.remove('hidden');
    list.classList.add('hidden');
    list2.classList.add('hidden');
})


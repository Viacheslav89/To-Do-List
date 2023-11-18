const input = document.querySelector('.input');

const add = document.querySelector('.add');
const clear = document.querySelector('.clear');

const list = document.querySelector('.list');



// добавляю li в list
add.addEventListener('click', function(event) {
    const li = document.createElement('li');
    if (!input.value) return;

    li.innerHTML = `<div class="wrapper_svg"><img class="fit-picture perform" src="./svg/perform.svg"><img class="fit-picture deleteLi" src="./svg/delete.svg"><img class="fit-picture edit" src="./svg/edit.svg"></div>`;

    const textBox = document.createElement('div');
    textBox.append(input.value);
    textBox.classList.add('wrapper_text');
    li.append(textBox);

    li.classList.add('list_item')

    list.append(li);
    input.value = '';
})


// переменные SVG
const perform = document.querySelector('.perform');
const deleteLi = document.querySelector('.deleteLi');
const edit = document.querySelector('.edit');


// обработчики событий svg
list.addEventListener('click', function(event) {
    let li = event.target.closest('li');

    if (event.target.classList.contains('deleteLi')) {
        li.remove();
    }

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

    if (event.target.classList.contains('perform')) {
        let textBox = event.target.closest('li').querySelector('.wrapper_text')

        let text = event.target.closest('li').querySelector('.wrapper_text').textContent;

        textBox.classList.add('list_item_finish');
        console.log(text);
    }

})





// удаляю все li с list
clear.addEventListener('click', function(event) {
    list.querySelectorAll('li').forEach((li) => li.remove())
})



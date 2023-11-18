const input = document.querySelector('.input');

const add = document.querySelector('.add');
const clear = document.querySelector('.clear');

const list = document.querySelector('.list');



// добавляю li в list
add.addEventListener('click', function(event) {
    const li = document.createElement('li');
    if (!input.value) return;

    li.innerHTML = `${input.value}<div class="wrapper_svg"><img class="fit-picture perform" src="./svg/perform.svg"><img class="fit-picture delete" src="./svg/delete.svg"><img class="fit-picture edit" src="./svg/edit.svg"></div>`;

    li.classList.add('list_item')




    list.append(li);
    input.value = '';
    
})


// удаляю все li с list
clear.addEventListener('click', function(event) {
    list.querySelectorAll('li').forEach((li) => li.remove())
})



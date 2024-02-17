import rgbHex from './rgb-hex/index.js';

"use strict";

let ul;
let todoForm;
let todoList;

document.addEventListener('DOMContentLoaded', () => {
    ul = document.getElementById('todoList');
    todoForm = document.getElementById('todoForm');
    let todoColor = document.getElementById('todoColor');
    let todoNameError = document.getElementById('todoNameError');

    todoColor.addEventListener('click',changeButtonColor);
    getTodoList();

    todoForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        let todoName = event.target.elements[0];

        if (todoName.value.length > 2) {
            todoNameError.innerText = '';
            
        }

        if (todoName.value.length > 2) {
            let newTodo = {
                name: todoName.value,
                color: todoColor.value,
                done: false
            }

            for (let todo of todoList) {
                if (todo.name === todoName.value && todo.color === todoColor.value) {
                    todoNameError.innerText = 'Task already exist!';
                    return;
                }
            }
            
            todoList.push(newTodo);
            localStorage.setItem('todoList', JSON.stringify(todoList));
            todoName.value = "";
            renderList();

        } else {
            if (todoName.value.length < 3) {
                todoNameError.innerText = "Name is to short!"
            }
        }
     })
});

const renderList = () => {
    let liList = Array.from(ul.getElementsByTagName('li'));
    liList.forEach((li) => { 
        let icon = li.getElementsByTagName('i')[0];
    })

    ul.innerHTML ="";
    todoList.forEach((todo, index) => { 
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex','align-items-start','align-items-center','border-0','li-custom');

        let main = document.createElement('div');
        let previewHeading = document.createElement('p');
        let buttonWrap = document.createElement('div');
        let icon = document.createElement('i');
        
        let deleteWrapp = document.createElement('div');
        let iconDel = document.createElement('i');

        icon.addEventListener('click', changeTaskStatus);
        icon.style.color = todo.color;
        icon.dataset.taskId = index;

        iconDel.dataset.taskId = index;
        iconDel.addEventListener('click', deleteTask);
        iconDel.classList.add('fa-solid','fa-trash','icon-trash');

        if (!todo.done) {
            icon.classList.add('fa-regular','fa-circle','icon-check','p-2');
            iconDel.classList.add('d-none');

        } else {
            icon.classList.add('fa-solid','fa-circle-check','p-2');
            main.style.textDecoration = "line-through";
            iconDel.classList.add('d-block','icon-checked','p-2');
            icon.style.color = todo.color+"4d";
        }
       
        previewHeading.innerText = todo.name;
        previewHeading.classList.add('m-0');

        main.classList.add('flex-override','p-2');
        main.appendChild(previewHeading);

        buttonWrap.classList.add('buttons-wrapper');
        buttonWrap.appendChild(icon);

        deleteWrapp.appendChild(iconDel);

        li.appendChild(buttonWrap);
        li.appendChild(main);
        li.appendChild(deleteWrapp);
        li.dataset.taskId = index;

        ul.appendChild(li);
    })

    taskCouterAndProgressBar();
}

const changeTaskStatus = (event) => {
    let todo = todoList[event.target.dataset.taskId];

    if (todo.done === true) {
        todo.done = false;
    } else {
        todo.done = true;
    }

    renderList();
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const deleteTask = (event) => {
    let listItem = document.querySelector(`[data-task-id="${event.target.dataset.taskId}"]`)
    todoList.splice(event.target.dataset.taskId,1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    listItem.remove();
    renderList();
}

const getTodoList = () => {
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
        renderList();
    } else {
       todoList = [];
    }
}

const changeButtonColor = () => {
    let buttonsWrapper =  document.getElementById('buttonsWrapper')
    let colorWrapper = document.getElementById('colorWrapper')
    buttonsWrapper.classList.add('d-none'); 
    colorWrapper.classList.add('show');

    document.querySelectorAll('#colorWrapper button').forEach(el => {
        el.addEventListener('click', (event) => {
            todoColor.value =  el.value;
            todoColor.style.backgroundImage = `url('src/button${event.target.id}.png')`;
            buttonsWrapper.classList.remove('d-none'); 
            colorWrapper.classList.remove('show');
        })
    });

}

const taskCouterAndProgressBar = () => { 
    let taskBody = document.querySelectorAll('.card-body');
    taskBody.forEach( el => {
        let taskNumber = el.firstElementChild;
        let taskbar = el.lastElementChild.firstElementChild;
        let taskCounter = 0;
        let barCounter = 0;
        
        todoList.forEach( todo => {
            if ( todo.color == `#${rgbHex(taskbar.style.backgroundColor)}`) {
                if (todo.done == false) {
                    taskCounter += 1;
                } else if ( todo.done == true) {
                    barCounter += 1;
                }
            }      
        })

        if (taskCounter == 0 && barCounter == 0){
            taskbar.style.width = '0%';
        } else {
            taskbar.style.width = `${(barCounter/(barCounter + taskCounter))*100}%`;
            taskNumber.innerText = `${taskCounter} tasks`;
        }
    })
}



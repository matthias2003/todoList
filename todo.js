"use strict"

let ul;
let todoForm;
let todoList;

document.addEventListener('DOMContentLoaded', () => {
    ul = document.getElementById('todoList');
    todoForm = document.getElementById('todoForm');
    let todoNameError = document.getElementById('todoNameError');
    let todoDescError = document.getElementById('todoDescError');
    getTodoList();


    todoForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        let todoName = event.target.elements[0];
        let todoDesc = event.target.elements[1];

        if (todoName.value.length > 2) {
            todoName.classList.remove('input-danger'); 
            todoNameError.innerText = ''; 
        }

        if (todoDesc.value.length > 5) {
            todoDesc.classList.remove('input-danger');
            todoDescError.innerText = '';
        }

        if (todoName.value.length > 2 &&  todoDesc.value.length > 5) {
            let newTodo = {
                name: todoName.value,
                desc: todoDesc.value,
                done: false
            }

            for (let todo of todoList) {
                if (todo.name === todoName.value && todo.desc === todoDesc.value ) {
                    return;
                }
            }
            
            todoList.push(newTodo);
            
            localStorage.setItem('todoList', JSON.stringify(todoList));
            
            
            todoName.value = "";
            todoDesc.value = "";

         
            renderList();
           
        } else {

            if (todoName.value.length < 3) {
                todoName.classList.add('input-danger');
                todoNameError.innerText = "Nazwa jest za krótka!"
            }
            
            if (todoDesc.value.length < 5) {
                todoDesc.classList.add('input-danger');
                todoDescError.innerText = "Opis jest za krótki!"
            }
            
        }
       
     })
     
});


const renderList = () => {
    let liList = Array.from(ul.getElementsByTagName('li'));

    liList.forEach((li) => {
        let icon = li.getElementsByTagName('i')[0];
        icon.removeEventListener('click',changeTaskStatus)
    })
    ul.innerHTML ="";

    todoList.forEach((todo, index) => { 
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex','align-items-start','align-items-center','border-0','li-custom');

        
        let main = document.createElement('div');
        //let heading = document.createElement('h5');
        let previewHeading = document.createElement('p');
        //let paragraph = document.createElement('p');
        let buttonWrap = document.createElement('div');
        let buttonDel = document.createElement('button');
        let icon = document.createElement('i');
        let iconDel = document.createElement('i');
        let deleteWrapp = document.createElement('div');

        li.appendChild(deleteWrapp);

        icon.addEventListener('click', changeTaskStatus);
        icon.dataset.taskId = index;

        iconDel.dataset.taskId = index;
        iconDel.addEventListener('click', deleteTask);
        iconDel.classList.add('fa-solid','fa-trash','p-2');


        
            
        if (!todo.done) {
            icon.classList.add('fa-regular','fa-circle','icon-check','p-2');
            iconDel.classList.add('d-none');
        } else {
            icon.classList.add('fa-solid','fa-circle-check','icon-checked','p-2');
            main.style.textDecoration = "line-through";
            iconDel.classList.add('d-block','icon-checked','p-2');
        }


        previewHeading.innerText = todo.name;
        previewHeading.classList.add('m-0')
        //heading.innerText = todo.name;
        //heading.classList.add('m-0')

        //paragraph.innerText = todo.desc;

        main.classList.add('flex-override','p-2');
        //main.appendChild(heading);
        main.appendChild(previewHeading);
        //main.appendChild(paragraph);

        buttonWrap.classList.add('buttons-wrapper');

        buttonWrap.appendChild(icon);

        
        deleteWrapp.appendChild(iconDel);
    
        li.appendChild(buttonWrap)
        li.appendChild(main);
        li.appendChild(deleteWrapp);

        li.dataset.taskId = index;

        ul.appendChild(li);
    })
}

const changeTaskStatus = (event) => {

    let todo = todoList[event.target.dataset.taskId]
    if (todo.done === true) {
        todo.done = false;
    } else {
        todo.done = true;
    }
    renderList();
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const deleteTask = (event) => {
    todoList.splice(event.target.dataset.taskId,1);
    localStorage.setItem('todoList', JSON.stringify(todoList)); // -> do włączenia usuwanie, wyłaczone do testów
    document.querySelector(`[data-task-id="${event.target.dataset.taskId}"]`).remove();
    collapseDelete();
}

const getTodoList = () => {
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
        renderList();
    } else {
       todoList = [];
    }
}

const collapseDelete = (event) => {
    let li = document.getElementsByTagName('li');
}
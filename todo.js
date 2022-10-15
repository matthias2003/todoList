"use strict"

let ul;
let todoForm;
let todoList;
let canvas; // do ogarnięcia

document.addEventListener('DOMContentLoaded', () => {
    ul = document.getElementById('todoList');
    canvas = document.getElementById('staticBackdrop'); // do ogarnięcia
    todoForm = document.getElementById('todoForm');
    let todoColor = document.getElementById('todoColor');
    let todoNameError = document.getElementById('todoNameError');

    todoColor.addEventListener('click',changeButtonColor);

    getTodoList();


    todoForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        let todoName = event.target.elements[0];
        //let todoColor = event.target.elements[2];


        if (todoName.value.length > 2) {
           // todoName.classList.remove('input-danger'); 
            todoNameError.innerText = ''; 
        }

        if (todoName.value.length > 2) {
            let newTodo = {
                name: todoName.value,
                color: todoColor.value,
                done: false
            }

            for (let todo of todoList) {
                if (todo.name === todoName.value) {
                    return;
                }
            }
            
            todoList.push(newTodo);
            
            localStorage.setItem('todoList', JSON.stringify(todoList));
            
            
            todoName.value = "";
            todoColor.value = "#076aff";
         
            renderList();
           
        } else {

            if (todoName.value.length < 3) {
                //todoName.classList.add('input-danger');
                todoNameError.innerText = "Nazwa jest za krótka!"
            }
        }
       
     })
     
});


const renderList = () => {
    let liList = Array.from(ul.getElementsByTagName('li'));


  
    liList.forEach((li) => { 
        let icon = li.getElementsByTagName('i')[0];
        console.log(icon.getAttribute('style')); // to przyda się na później!
        //icon.removeEventListener('click',changeTaskStatus)
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
            icon.style.color = todo.color+"4d"; // do poprawy kolor ten
        }


        const collapseIconAttributes = {
            'data-bs-toggle':'collapse',
            'href':'#collapseTodoItem',
            'role':'button',
            'aria-expanded':'false',
            'aria-controls':'collapseTodoItem'
        }

        previewHeading.innerText = todo.name;
        previewHeading.classList.add('m-0')

        main.classList.add('flex-override','p-2');
        main.appendChild(previewHeading);

        buttonWrap.classList.add('buttons-wrapper');

        buttonWrap.appendChild(icon);


        deleteWrapp.appendChild(iconDel);

        li.appendChild(buttonWrap)
        li.appendChild(main);
        li.appendChild(deleteWrapp);
    
        li.dataset.taskId = index;


        ul.appendChild(li);
        //canvas.classList.toggle('show');
    

        //canvas.hide(); -> pokombinować z tym
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
    localStorage.setItem('todoList', JSON.stringify(todoList));
    document.querySelector(`[data-task-id="${event.target.dataset.taskId}"]`).remove();
    //collapseDelete();
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
    document.getElementById('colorWrapper').classList.toggle('show');
    let buttons = document.querySelectorAll('#colorWrapper button');
    buttons.forEach(el => {
        el.addEventListener('click', (event) => {
            todoColor.value =  el.value;
            todoColor.style.backgroundImage = `url('grafika/button${event.target.id}.png')`;
        });
    });
}
/*
const collapseDelete = (event) => {
    let li = document.getElementsByTagName('li');
}
*/


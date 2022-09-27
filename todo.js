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

        if (todoDesc.value.length > 20) {
            todoDesc.classList.remove('input-danger');
            todoDescError.innerText = '';
        }

        if (todoName.value.length > 2 &&  todoDesc.value.length > 20) {
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
            
            if (todoDesc.value.length < 20) {
                todoDesc.classList.add('input-danger');
                todoDescError.innerText = "Opis jest za krótki!"
            }
            
        }
       
     })
     
});


const renderList = () => {
    let liList = Array.from(ul.getElementsByTagName('li'));

    liList.forEach((li) => {
        let button = li.getElementsByTagName('button')[0];
        button.removeEventListener('click',changeTaskStatus)
    })
    ul.innerHTML ="";

    todoList.forEach((todo, index) => { 
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex','align-items-start','align-items-center','border-0','li-custom');

        
        let main = document.createElement('div');
        let heading = document.createElement('h5');
        //let paragraph = document.createElement('p');
        let button = document.createElement('button');
        let buttonsWrapper = document.createElement('div');
        let buttonDel = document.createElement('button');

        button.addEventListener('click', changeTaskStatus);
        button.dataset.taskId = index;


        //buttonDel.addEventListener('click', deleteTask);
        buttonDel.dataset.taskId = index; 
        buttonDel.classList.add('btn','btn-success','btn-sm','border-0');
        
       // let icon  = document.createElement('i');
       // icon.classList.add('fa-solid','fa-trash','delete-icon');
       // buttonDel.appendChild(icon);   // -> button dell i ikona
            
 
        let icon = document.createElement('i');
        icon.dataset.taskId = index;   // to trzeba zmienić jakoś

        if (!todo.done) {
            icon.classList.add('fa-regular','fa-circle');
            
            button.appendChild(icon);   // -> do sprzątania to całe jest jak nic
            button.classList.add('btn','btn-success','btn-sm');
        
        } else {
            icon.classList.add('fa-regular','fa-circle-check');
            button.appendChild(icon);
            button.classList.add('btn','btn-danger','btn-sm')
            main.style.textDecoration = "line-through";
            li.style.backgroundColor = "#E8E8E8"; // -> do poprawaki, kolory zmieniń, na razie tylko zamysł 
        }


        heading.innerText = todo.name;
        heading.classList.add('m-0')
        //paragraph.innerText = todo.desc;

        main.classList.add('d-flex');
        main.appendChild(heading);
        //main.appendChild(paragraph);

        buttonsWrapper.classList.add('buttons-wrapper');
        buttonsWrapper.appendChild(button);
        //buttonsWrapper.appendChild(buttonDel);    // -> dwa buttony append 
    
    
        li.appendChild(buttonsWrapper)
        li.appendChild(main);
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
    //todoList.splice(event.target.dataset.taskId,1);
   // localStorage.setItem('todoList', JSON.stringify(todoList)); // -> do włączenia usuwanie, wyłaczone do testów
    //document.querySelector(`[data-task-id="${event.target.dataset.taskId}"]`).remove();
}

const getTodoList = () => {
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
        renderList();
    } else {
       todoList = [];
    }
}


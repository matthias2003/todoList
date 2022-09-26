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
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

        let main = document.createElement('div');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let button = document.createElement('button');
        let buttonsWrapper = document.createElement('div');
        let buttonDel = document.createElement('button');

        button.addEventListener('click', changeTaskStatus);
        button.dataset.taskId = index;

        buttonDel.addEventListener('click', deleteTask);
        buttonDel.dataset.taskId = index;  // nad tym pracujemy
            
 
        if (!todo.done) {
            button.innerText = "Finish";
            button.classList.add('btn','btn-success','btn-sm')
        } else {
            button.innerText = "Revert";
            button.classList.add('btn','btn-danger','btn-sm')
            main.style.textDecoration = "line-through";
            li.style.backgroundColor = "#E8E8E8"; // -> do poprawaki, kolory zmieniń, na razie tylko zamysł 
        }

        heading.innerText = todo.name;
        paragraph.innerText = todo.desc;
        buttonDel.innerText = "Usuń";

        main.appendChild(heading);
        main.appendChild(paragraph);

        buttonsWrapper.appendChild(button);
        buttonsWrapper.appendChild(buttonDel);

        li.appendChild(main);
        li.appendChild(buttonsWrapper)
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
    localStorage.setItem('todoList', JSON.stringify(todoList));
    let todo = document.querySelector(`[data-set-index]="${event.target.dataset.taskId}"`) // ogarnać jak usunąć całe li, localStorage usuwa się, todoList też się usuwa
    console.log(todo)
}

const getTodoList = () => {
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
        renderList();
    } else {
       todoList = [];
    }
}


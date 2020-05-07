//Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', showLocalTodos);
todoBtn.addEventListener('click', addTodoBtn);
todoList.addEventListener('click', manageTodos);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodoBtn(event){
    //Prevent form from submitting
    event.preventDefault();
    
    todo = todoInput.value;
    if(todo != ""){
        addTodo(todo);
        //Add todo to local storage
        saveLocalTodos(todo);
    }
    //Clear the input box
    todoInput.value = "";
}

function addTodo(todo, checked=false){
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
        if(checked){
            todoDiv.classList.add('completed')
        }

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    
    //Check mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append the todoDiv to the ul element of the page
    todoList.appendChild(todoDiv);
}

function manageTodos(event) {
    const item = event.target;
    const todo = item.parentElement;
    const todoValue = todo.children[0].innerText

    //Delete TO DO
    if (item.classList[0] === 'trash-btn'){
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todoValue);
        todo.addEventListener('transitionend', () => todo.remove())
    }

    //Check TO DO
    if(item.classList[0] === 'complete-btn'){
        checked = todo.classList.toggle('completed');
        saveLocalTodos(todoValue, checked);
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function getLocalTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function saveLocalTodos(todoValue, checked=false){
    let todos = getLocalTodos();
    //Find the index of the todo
    todoIndex = findIndex(todos, "value", todoValue);

    if(todos[todoIndex] === undefined){
        //If that todo is not defined in local storage yet, then create it and push it into local storage
        let todo = {value:todoValue, checked:checked}
        todos.push(todo);
    }else{
        //If that todo is in local storage, update its checked property
        todos[todoIndex].checked = checked;
    }
    //Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todoValue){
    let todos = getLocalTodos();
    const todoIndex = findIndex(todos, "value", todoValue);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showLocalTodos(){
    let todos = getLocalTodos();
    todos.forEach(function(todo){
        addTodo(todo.value, todo.checked);
    })
}

//Loop through and array of objects and return the index of the object with value value in attribute attr
function findIndex(array, attr, value){
    for (let i = 0; i < array.length; i++) {
        if(array[i][attr] === value){
            return i;
        }
    }
    return -1;
}
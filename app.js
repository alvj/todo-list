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

function addTodo(todo){
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

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

    //Delete TO DO
    if (item.classList[0] === 'trash-btn'){
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove())
    }

    //Check TO DO
    if(item.classList[0] === 'complete-btn'){
        todo.classList.toggle('completed');
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

function saveLocalTodos(todo){
    let todos = getLocalTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo){
    let todos = getLocalTodos();
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showLocalTodos(){
    let todos = getLocalTodos();
    todos.forEach(function(todo){
        addTodo(todo);
    })
}
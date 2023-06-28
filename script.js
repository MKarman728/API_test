const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = () =>{
    fetch(apiURL + '?_limit=5')
    .then(res => res.json())
    .then(todo=>todo.forEach(data => addToDOM(data)))
    };

const addToDOM =(data)=>{
    const div = document.createElement('div');
            div.classList.add('todo');
            div.setAttribute('data-id',data.id);
            if(data.completed){
                div.classList.add('done');
            }
            div.appendChild(document.createTextNode(data.title));
            document.getElementById('todo-list').appendChild(div);
}

const createTodo = (e) => {
    e.preventDefault();
    const newTodo = {
        title: e.target.firstElementChild.value,
            completed: false
    }

    fetch(apiURL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newTodo)
    })
    .then(res=>res.json())
    .then(data=> addToDOM(data));
}

const toggleCompleted = (e) => {
    if(e.target.classList.contains('todo')){
        e.target.classList.toggle('done');
        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
}

const updateTodo = (id, completed) => {
    fetch(`${apiURL}/${id}`,
    {method:'PUT',
    body: JSON.stringify({completed}),
    headers:{
        'Content-Type': 'application/json'
    }})
}

const deleteTodo = (e)=>{
    if(e.target.classList.contains('done')){
        const id = e.target.dataset.id;
        fetch(`${apiURL}/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(()=> e.target.remove())
    }
}

const init = () => {
    document.addEventListener('DOMContentLoaded',getTodos);
    document.querySelector('#todo-form').addEventListener('submit',createTodo);
    document.querySelector('#todo-list').addEventListener('click',toggleCompleted);
    document.querySelector('#todo-list').addEventListener('dblclick',deleteTodo);
}

init();
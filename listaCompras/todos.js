var listsElement = document.querySelector('#lista ul');
var inputElement = document.querySelector('#lista input');
var buttonAdd = document.querySelector('#lista .buttonAdd');
var buttonDel = document.querySelector('#lista .buttonDel');

var nada = 'não está faltando nada!';
var todos = JSON.parse(localStorage.getItem('list_todos')) || [nada];

function renderTodos() {

    listsElement.innerHTML = '';
    
    for(todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        var pos = todos.indexOf(todo);

        linkElement.setAttribute('onclick', 'deleteTodos(' + pos +')');
        
        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);
        
        // adicionar a tela
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listsElement.appendChild(todoElement);
        
    }
}

renderTodos();

// adicionar nova todo
function addTodo() {
    var todoText = inputElement.value;

    var todosValue = ''+ todos[0] +'';

    if(todosValue == nada) {
        todos.splice(0,1);
    }

    todos.push(todoText);
    inputElement.value = '';

    renderTodos();
    saveToStorage();

    alert('item adicionado com sucesso!');
}

// deletar toda a todo
function limparTodo() {
    localStorage.clear();
    todos = [nada];

    renderTodos();
    window.location.reload();

    alert('Lista removida com sucesso!');
}

buttonAdd.onclick = addTodo;
buttonDel.onclick = limparTodo;

//Deletar uma todo
function deleteTodos(pos) {

    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

// Salvar no Storage
function saveToStorage() {

    localStorage.setItem('list_todos', JSON.stringify(todos));
}
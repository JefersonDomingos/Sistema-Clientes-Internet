'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

//CRUD : create, read, update, delete.

const tempClient = {
    nome: 'Jéferson',
    email: 'jeferson@email.com',
    celular: '31321112123',
    cidade: 'Urucânia-MG',
    loginPPPoE: 'jefersondmartins',
    id: '5',
    plano: '300mb'
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

//create
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
}

//read
const readClient = () => getLocalStorage();

//update
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
} 

//delete
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index,1);
    setLocalStorage(dbClient);
}

//interação com o usuário

//checando campos
const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

//Limpando os campos do modal
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

//inserindo os clientes pelo modal
const saveClient = () => {
    if(isValidFields()){
        const client = {
           nome: document.getElementById('nome').value,
           email: document.getElementById('email').value,
           celular: document.getElementById('celular').value,
           cidade: document.getElementById('cidade').value,
           loginPPPoE: document.getElementById('login').value,
           id: document.getElementById('id').value,
           plano: document.getElementById('plano').value
        }
        createClient(client);
        updateTable();
        closeModal();
        console.log('salvo com sucesso');
    }
}

//Inserindo clientes no HTML
const createRow = (client,index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>${client.loginPPPoE}</td>
    <td>${client.id}</td>
    <td>${client.plano}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `;
    
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('login').value = client.loginPPPoE;
    document.getElementById('id').value = client.id;
    document.getElementById('plano').value = client.plano;
} 

const editClient = (index) => {
    const client = readClient()[index];
    openModal();
    fillFields(client);
}

const editDelete = (event) => {
    if(event.target.type == 'button'){
        
        //const [action, index] = [botão id, botão index];              
        const [action, index] = event.target.id.split('-');

        if(action == 'edit'){
            editClient(index);
        }else {
            console.log('deletando o cliente');
        }
    }
} 

updateTable();

//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete);
'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

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

//checando campos
const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

//interação com o usuário
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

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
        clearFields();
        closeModal();
        console.log('cadastrado com sucesso');
    }
}

//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient);
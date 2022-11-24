'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

//CRUD : create, read, update, delete.

const tempClient = {
    nome: 'teste',
    email: 'teste@email.com',
    celular: '31321112123',
    cidade: 'Urucânia-MG',
    loginPPPoE: 'jefersondmartins',
    id: '5',
    plano: '300mb'
}

const createClient = (client) => {
    const db_client = JSON.parse(localStorage.getItem('db_client'));
    db_client.push(client);
    localStorage.setItem('db_client', JSON.stringify(db_client));
}

//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
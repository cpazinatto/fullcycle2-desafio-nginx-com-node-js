const {SERVER_CONFIG} = require('./config');
const express = require('express');
const db = require('./db');

const faker = require('faker');

const app = express();

app.get('/', async (request, response) => {
  await db.addPeople(faker.name.findName());
  const names = await db.readPeopleName();
  const namesList = names.reduce((accumulator, currentValue) => {
    return accumulator + `<li>${currentValue}</li>`;
  }, '');
  
  const html = `<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`;

  response.send(html);
});

app.listen(SERVER_CONFIG.port, () => {
  console.log(`Servidor Node.js rodando na porta ${SERVER_CONFIG.port}.`);
});
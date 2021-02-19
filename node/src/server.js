const {SERVER_CONFIG} = require('./config');
const express = require('express');
const db = require('./db');

const app = express();

app.get('/', async (request, response) => {
  await db.addPeople();
  const names = await db.readPeopleName();
  const namesList = names.reduce((accumulator, currentValue) => {
    return accumulator + `<li>${currentValue}</li>`;
  }, '');
  
  const html = `<h1>Full Cycle!</h1><ul>${namesList}</ul>`;

  response.send(html);
});

app.listen(SERVER_CONFIG.port, () => {
  console.log(`Servidor Node.js rodando na porta ${SERVER_CONFIG.port}.`);
});
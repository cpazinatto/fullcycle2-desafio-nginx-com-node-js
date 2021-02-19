const {DB_CONFIG} = require('./config');
const mysql = require('mysql2/promise');

async function addPeople() {
  const connection = await mysql.createConnection(DB_CONFIG);
  const query = `INSERT INTO people (name) VALUES ('Pessoa X')`;
  await connection.query(query);
  await connection.end();
}

async function readPeopleName() {
  const connection = await mysql.createConnection(DB_CONFIG);
  const query = 'SELECT name FROM people';
  const [results] = await connection.query(query);
  connection.end();
  
  const names = results.map(result => {
    return result.name;
  })
  
  return names;
}

module.exports = {addPeople, readPeopleName};

const pg = require('pg');
const Client = pg.Client;
const DATABASE_URL = 'postgres://localhost:5432/films';
const client = new Client(DATABASE_URL);

client.connect()
  .then(() => console.log('connected db', DATABASE_URL))
  .catch(err => console.error('connection error', err));

client.off('error', err => {
  console.error('\n**** DATABASE ERROR ****\n\n', err);
});

module.exports = client;
const fs = require('fs');
const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/films';
const client = new Client(databaseUrl);

client.connect();

client.query(`
  SELECT name, year, rating, genre FROM movies;
`)
  .then(
    results => {
      fs.writeFileSync(
        'movies.json',
        JSON.stringify(results.rows, true, 2)
      );
    },
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
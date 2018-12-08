const client = require('../db-client');

client.query(`
    DROP TABLE IF EXISTS movies;
    DROP TABLE IF EXISTS genres;
`)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
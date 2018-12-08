const client = require('../db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    short_name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    year INTEGER,
    rating BOOLEAN,
    genre_id INTEGER NOT NULL REFERENCES genres(id)
  );

`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
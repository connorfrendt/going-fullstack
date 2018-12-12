const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('./db-client');

app.use(morgan('dev'));

app.use(express.json());

app.get('/api/genres', (req, res) => {
  client.query(`
    SELECT id, name, short_name as "shortName"
    FROM genres
    ORDER BY name;
  `)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/movies', (req, res) => {
  client.query(`
    SELECT
      movies.id,
      movies.name as name,
      year as "year",
      rating as "rating",
      genres.id as "genreId",
      genres.name as genre
    FROM movies
    JOIN genres
      ON movies.genre_id = genres.id
    ORDER BY year DESC, name ASC;
  `)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/movies/:id', (req, res) => {
  client.query(`
    SELECT * FROM movies WHERE id = $1;
  `,
  [req.params.id])
    .then(result => {
      res.json(result.rows[0]);
    });
});

app.post('/api/movies', (req, res) => {
  const body = req.body;

  client.query(`
    INSERT INTO movies (name, genre_id)
    VALUES($1, $2)
    RETURNING id;
  `,
  [body.name, body.genreId])
    .then(result => {
      const id = result.rows[0].id;

      return client.query(`
        SELECT
          movies.id,
          movies.name as name,
          year as "year",
          genres.id as "genreId",
          genres.name as genre
        FROM movies
        JOIN genres
        ON movies.genre_id = genres.id
        WHERE movies.id = $1;
      `,
      [id]);
    })
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});
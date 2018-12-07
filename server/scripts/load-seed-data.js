const client = require('../db-client');
const movies = require('./movies.json');
const genres = require('./genres');

Promise.all(
  genres.map(genre => {
    return client.query(`
      INSERT INTO genre (name, short_name)
      VALUES ($1, $2);
    `,
    [genre.name, genre.shortName]);
  })
)
  .then(() => {
    return Promise.all(
      movies.map(movies => {
        return client.query(`
          INSERT INTO movie (name, genre_id, rating)
          SELECT
            $1 as name,
            id as genre_id,
            $2 as rating
          FROM genre
          WHERE short_name = $3;
        `,
        [movies.name, movies.rating, movies.genre]);
      })
    );
  })
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
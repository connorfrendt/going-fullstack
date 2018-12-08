const client = require('../db-client');
const movies = require('./movies.json');
const genres = require('./genres');

Promise.all(
  genres.map(genre => {
    return client.query(`
      INSERT INTO genres (name, short_name)
      VALUES ($1, $2);
    `,
    [genre.name, genre.shortName]);
  })
)
  .then(() => {
    return Promise.all(
      movies.map(movie => {
        return client.query(`
          INSERT INTO movies (name, genre_id, rating, year)
          SELECT
            $1 as name,
            id as genre_id,
            $2 as rating,
            $4 as year
          FROM genres
          WHERE short_name = $3;
        `,
        [movie.name, movie.rating, movie.genre, movie.year]);
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
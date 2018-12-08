export default {
  
  getMovies() {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  getMovie(id) {
    return fetch(`/api/movies/${id}`)
      .then(response => response.json());
  },

  addMovie(movies) {
    return fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movies)
    })
      .then(response => response.json());
  },

  getGenres() {
    return fetch('/api/genres')
      .then(response => response.json());
  }
};
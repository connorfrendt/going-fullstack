<template>
  <div class="movies">
    <h2>Movies!!</h2>
    <AddMovie :onAdd="handleAdd" />
    <!-- <RemoveMovie :onRemove="handleRemove"> -->
    <MovieList 
    :movies="movies"
    :onRemove="handleRemove" />
  </div>
</template>

<script>
import api from '../../services/api.js';
import MovieList from './MovieList.vue';
import AddMovie from './AddMovie.vue';
// import RemoveMovie from './RemoveMovie.vue';

export default {
  data() {
    return {
      movies: null,
      error: null
    };
  },
  components: {
    AddMovie,
    MovieList,
    // RemoveMovie
  },
  created() {
    api.getMovies()
      .then(movies => {
        this.movies = movies;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    handleAdd(movie) {
      return api.addMovie(movie)
        .then(saved => {
          this.movies.push(saved);
        });
    },
    handleRemove(movie) {
      api.removeMovie(movie.id)
        .then(() => {
          api.getMovies().then(movies => this.movies = movies);
        });
    }
  }
};
</script>

<style>

</style>
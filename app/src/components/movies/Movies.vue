<template>
  <div class="movies">
    <h2>Movies!!</h2>
    <AddMovie :onAdd="handleAdd" />
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import api from '../../services/api.js';
import MovieList from './MovieList.vue';
import AddMovie from './AddMovie.vue';

export default {
  data() {
    return {
      movies: null,
      error: null
    };
  },
  components: {
    AddMovie,
    MovieList
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
      console.log('added!', movie);
      return api.addMovie(movie)
        .then(saved => {
          console.log('this is saved', saved);
          this.movies.push(saved);
        });
    }
  }
};
</script>

<style>

</style>
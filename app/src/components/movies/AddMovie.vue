<template>
  <form @submit.prevent="handleSubmit">
    <p>
      <label>Name:</label>
      <input v-model="movie.name" required>
    </p>
    <p>
      <label>Year:</label>
      <input type="number"
        v-model="movie.year" required>
    </p>

    <p id="rating">
      <label>Rating:</label>
      <br />
      <label for="good">Good</label>
      <input type="radio" id="good" name="radio-button" value="true"
        v-model="movie.rating" required>
        <br />
      <label for="bad">Bad</label>
      <input type="radio" id="bad" name="radio-button" value="false"
        v-model="movie.rating" required>
    </p>
    <br />

    <p>
      <label>Genre:</label>
      <select v-if="genres"
        v-model="movie.genreId" required>
        <option value="-1" disabled>Select a Genre</option>
        <option v-for="genre in genres"
          :key="genre.id"
          :value="genre.id">
        {{genre.name}} {{genre.shortName}}
        </option>
      </select>
    </p>

    <button>Add</button>
  </form>
</template>

<script>
import api from '../../services/api';

function initMovie() {
  return {
    name: '',
    year: '',
    genreId: -1
  };
}

export default {
  props: {
    onAdd: Function
  },
  data() {
    return {
      movie: initMovie(),
      genres: null
    };
  },
  created() {
    api.getGenres()
      .then(genres => {
        console.log('this is genres', genres);
        this.genres = genres;
      });
  },
  methods: {
    handleSubmit() {
      this.onAdd(this.movie)
        .then(() => {
          this.movie = initMovie();
        });
    }
  }
};
</script>

<style>
#rating {
  display: inline-block;
  border: 1px solid black;
  padding: 10px;
}
</style>
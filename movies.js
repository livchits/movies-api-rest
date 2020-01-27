const movies = {
  listOfMovies: [
    {
      id: 1,
      title: 'Back to the Future',
      year: 1985,
      genre: 'Science Fiction'
    },
    {
      id: 2,
      title: 'Back to the Future II',
      year: 1987,
      genre: 'Science Fiction'
    }
  ],
  get list() {
    return this.listOfMovies;
  },
  addMovie: function(jsonMovie) {
    jsonMovie.id = this.listOfMovies.length + 1;
    this.listOfMovies.push(jsonMovie);
    return jsonMovie;
  },
  getMovieById: function(id) {
    return this.listOfMovies[id - 1];
  }
};

module.exports = movies;

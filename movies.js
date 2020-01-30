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
  },
  updateMovie: function(id, { title, year, genre }) {
    const movieToUpdate = this.listOfMovies[id - 1];
    movieToUpdate.title = title || movieToUpdate.title;
    movieToUpdate.year = year || movieToUpdate.year;
    movieToUpdate.genre = genre || movieToUpdate.genre;
    return movieToUpdate;
  },
  filterByCriteria: function(filterCriteria) {
    const [[key, value]] = Object.entries(filterCriteria);

    const filteredMovies = this.list.filter(movie =>
      typeof movie[key] === 'string' ? movie[key].toLowerCase() === value : movie[key] === Number(value)
    );
    return filteredMovies;
  },
  getMoviesProps: function(prop) {
    const props = this.list.reduce((acc, cur) => {
      acc.push(cur[prop]);
      return acc;
    }, []);
    return [...new Set(props)];
  },
  orderByYear: function() {
    const orderedMovies = [...this.list].sort((a, b) => a.year - b.year);
    return orderedMovies;
  },
  orderByTitle: function() {
    const orderedMovies = [...this.list].sort((a, b) => a.title.localeCompare(b.title, { sensitivity: 'base' }));
    return orderedMovies;
  }
};

module.exports = movies;

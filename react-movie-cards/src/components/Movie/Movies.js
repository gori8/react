import React, { useEffect, useState } from 'react';

import MovieList from './MovieList';
import MovieService from '../../services/MovieService';
import AddMovie from './AddMovie';

export const HandlersContext = React.createContext({});

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(MovieService.getMovies());
  }, []);

  const handleAdd = movie => {
    movie.id = (movies.length + 1) * 100;
    movie.rating = 0;
    movie.canDelete = true;
    movie.timesRated = 0;
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const handleDelete = id => {
    const newMovies = [...movies];
    setMovies(newMovies.filter(movie => movie.id !== id));
  };

  const handleRate = (id, rating) => {
    const newMovies = [...movies];
    const newMovieIndex = newMovies.findIndex(movie => movie.id === id);
    const newMovie = { ...newMovies[newMovieIndex] };
    if (newMovie.rating != 0) {
      newMovie.rating = +((newMovie.rating * newMovie.timesRated + rating) / (newMovie.timesRated + 1)).toFixed(2); // '+' used to convert to Number from string
    } else {
      newMovie.rating = rating + 0.0;
    }
    newMovie.timesRated += 1;
    newMovies[newMovieIndex] = newMovie;
    setMovies(newMovies);
  };

  return (
    <HandlersContext.Provider value={{ onDelete: handleDelete, onRate: handleRate }}>
      <div className="container-fluid" style={{ marginLeft: '-15px' }}>
        <AddMovie onAdd={handleAdd} />
        <div className="d-flex flex-row">
          <div className="col-sm-12">
            <MovieList movies={movies} onDelete={handleDelete} onRate={handleRate} />
          </div>
        </div>
      </div>
    </HandlersContext.Provider>
  );
};

export default Movies;

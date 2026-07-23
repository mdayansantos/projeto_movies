import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies, onSelectMovie }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelectMovie={() => onSelectMovie(movie.id)} />
      ))}
    </section>
  );
};

export default MovieList;

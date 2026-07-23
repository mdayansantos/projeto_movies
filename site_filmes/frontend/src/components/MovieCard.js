import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onSelectMovie }) => {
  const description = movie.description || 'Sem descrição disponível.';

  return (
    <article
      className="movie-card"
      onClick={onSelectMovie}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && onSelectMovie) {
          event.preventDefault();
          onSelectMovie();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="movie-poster">
        <img src={movie.posterUrl} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
        <p className="movie-rating">⭐ {movie.rating}</p>
        <p className="movie-description">{description}</p>
      </div>
    </article>
  );
};

export default MovieCard;

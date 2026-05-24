import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 120;
  const description = movie.description || 'Sem descrição disponível.';
  const shouldTruncate = description.length > previewLength;
  const displayedDescription = expanded || !shouldTruncate
    ? description
    : `${description.slice(0, previewLength)}...`;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <div>
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">{movie.year}</p>
          <p className="movie-rating">⭐ {movie.rating}</p>
          <p className="movie-description">{displayedDescription}</p>
        </div>
        {shouldTruncate && (
          <button
            type="button"
            className="expand-button"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? 'Mostrar menos' : 'Mostrar mais'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

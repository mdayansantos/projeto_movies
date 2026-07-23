import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title || movie.name || 'Sem título',
  year: movie.release_date ? movie.release_date.slice(0, 4) : '—',
  rating: movie.vote_average ? movie.vote_average.toFixed(1) : '—',
  description: movie.overview || 'Sem descrição disponível.',
  posterUrl: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+imagem',
  releaseDate: movie.release_date || '—',
  runtime: movie.runtime || 0,
  genres: movie.genres || [],
  homepage: movie.homepage || '',
});

const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = parseInt(id, 10);
  const preloadedMovie = movies.find((m) => m.id === movieId);
  const [movie, setMovie] = useState(
    preloadedMovie
      ? { ...preloadedMovie, genres: Array.isArray(preloadedMovie.genres) ? preloadedMovie.genres : [] }
      : null
  );
  const [loading, setLoading] = useState(!preloadedMovie);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (preloadedMovie) {
      return;
    }

    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (!apiKey) {
      setError('Chave da TMDB não encontrada. Verifique seu .env.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Filme não encontrado');
        }

        const data = await response.json();
        setMovie(formatMovie(data));
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return;
        }

        console.error(fetchError);
        setError('Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    return () => controller.abort();
  }, [movieId, preloadedMovie]);

  if (loading) {
    return (
      <div className="movie-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Voltar
        </button>
        <div className="status-panel">
          <p className="status-message">Carregando detalhes do filme...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Voltar
        </button>
        <div className="not-found">{error || 'Filme não encontrado'}</div>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Voltar
      </button>

      <div className="movie-detail">
        <div className="detail-poster">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>

          <div className="detail-meta">
            <span className="detail-year">🗓️ {movie.releaseDate}</span>
            <span className="detail-rating">⭐ {movie.rating}/10</span>
            <span className="detail-runtime">⏱️ {movie.runtime} min</span>
          </div>

          {movie.genres.length > 0 && (
            <div className="detail-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-pill">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="detail-description">
            <h2>Sinopse</h2>
            <p>{movie.description}</p>
          </div>

          {movie.homepage && (
            <div className="detail-actions">
              <a href={movie.homepage} target="_blank" rel="noreferrer" className="movie-link">
                Ver site oficial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = parseInt(id, 10);
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <div className="movie-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Voltar
        </button>
        <div className="not-found">Filme não encontrado</div>
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
          <img 
            src={movie.posterUrl} 
            alt={movie.title}
          />
        </div>
        
        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          
          <div className="detail-meta">
            <span className="detail-year">🗓️ {movie.year}</span>
            <span className="detail-rating">⭐ {movie.rating}/10</span>
          </div>
          
          <div className="detail-description">
            <h2>Sinopse</h2>
            <p>{movie.description || 'Sem descrição disponível.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

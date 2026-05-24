import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (!apiKey) {
      setError('Chave da TMDB não encontrada. Verifique seu .env.');
      setLoading(false);
      return;
    }

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar filmes na TMDB');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar os filmes.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Site de Filmes</h1>
        <p>Filmes populares carregados da API TMDB.</p>
      </header>
      <main>
        {loading && <p className="status-message">Carregando filmes...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && !error && movies.length === 0 && (
          <p className="status-message">Nenhum filme encontrado.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <section className="movie-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  title: movie.title,
                  year: movie.release_date ? movie.release_date.slice(0, 4) : '—',
                  rating: movie.vote_average ? movie.vote_average.toFixed(1) : '—',
                  description: movie.overview,
                  posterUrl: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://via.placeholder.com/150x225?text=Sem+imagem',
                }}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

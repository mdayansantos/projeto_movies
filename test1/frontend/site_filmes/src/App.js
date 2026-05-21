import logo from './logo.svg';
import './App.css';
import MovieCard from './components/MovieCard';

const movie = {
  title: 'Meu Filme',
  year: '2026',
  rating: '9.0',
  description: 'Um filme incrível para aprender React.',
  posterUrl: 'https://via.placeholder.com/150x225?text=Filme',
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Site de Filmes</h1>
        <p>Veja abaixo o componente de filme que foi criado.</p>
      </header>
      <main>
        <MovieCard movie={movie} />
      </main>
    </div>
  );
}

export default App;

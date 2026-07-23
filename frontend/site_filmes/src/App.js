import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MovieDetail from './components/MovieDetail';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import useMovies from './hooks/useMovies';

function App() {
  const {
    movies,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    retry,
    loadMore,
    page,
    totalPages,
  } = useMovies();

  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            movies={movies}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            retry={retry}
            loadMore={loadMore}
            page={page}
            totalPages={totalPages}
            onSelectMovie={(id) => navigate(`/movie/${id}`)}
          />
        }
      />
      <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

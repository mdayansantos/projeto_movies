import MovieList from '../components/MovieList';
import SkeletonCard from '../components/SkeletonCard';

function HomePage({
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
  onSelectMovie,
}) {
  const hasMore = !loading && page < totalPages;
  const skeletonCards = Array.from({ length: 6 }, (_, index) => <SkeletonCard key={index} />);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Site de Filmes</h1>
          <p>Descubra filmes em destaque, busque por título e veja detalhes rápidos.</p>
        </div>
      </header>

      <main>
        <div className="toolbar">
          <div className="search-bar">
            <label htmlFor="movie-search" className="visually-hidden">
              Pesquisar filmes
            </label>
            <input
              id="movie-search"
              className="search-input"
              type="search"
              placeholder="Pesquisar filmes"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-button"
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}
          </div>

          <div className="category-tabs" role="tablist" aria-label="Categorias de filmes">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`category-tab ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
                role="tab"
                aria-selected={selectedCategory === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="status-panel">
            <div className="movie-list loading-grid">{skeletonCards}</div>
            <p className="status-message">Carregando filmes...</p>
          </div>
        )}

        {error && (
          <div className="status-panel">
            <p className="status-message error">{error}</p>
            <button className="retry-button" type="button" onClick={retry}>
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="status-message">Nenhum filme encontrado.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <MovieList movies={movies} onSelectMovie={onSelectMovie} />
            {hasMore && (
              <div className="load-more-container">
                <button className="load-more-button" type="button" onClick={loadMore}>
                  Carregar mais filmes
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;

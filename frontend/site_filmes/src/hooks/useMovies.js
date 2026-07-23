import { useEffect, useState } from 'react';

const categories = [
  { key: 'popular', label: 'Populares' },
  { key: 'top_rated', label: 'Melhores avaliados' },
  { key: 'upcoming', label: 'Em breve' },
];

const CACHE_DURATION = 15 * 60 * 1000;

const buildCacheKey = (type, value) => `site-filmes:${type}:${value}`;

const saveCache = (key, value) => {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({ expiresAt: Date.now() + CACHE_DURATION, payload: value })
    );
  } catch {
    // Ignore storage errors in private mode.
  }
};

const loadCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.expiresAt < Date.now()) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed.payload;
  } catch {
    return null;
  }
};

const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title || movie.name || 'Sem título',
  year: movie.release_date ? movie.release_date.slice(0, 4) : '—',
  rating: movie.vote_average ? movie.vote_average.toFixed(1) : '—',
  description: movie.overview || 'Sem descrição disponível.',
  posterUrl: movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=Sem+imagem',
  releaseDate: movie.release_date || '',
});

export default function useMovies() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, debouncedSearch]);

  const retry = () => setLoadKey((prev) => prev + 1);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (!apiKey) {
      setError('Chave da TMDB não encontrada. Verifique seu .env.');
      setLoading(false);
      setMovies([]);
      return;
    }

    const controller = new AbortController();
    const cacheKey = debouncedSearch
      ? buildCacheKey('search', `${debouncedSearch.toLowerCase()}:${page}`)
      : buildCacheKey('category', `${selectedCategory}:${page}`);
    const cachedMovies = loadCache(cacheKey);

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (cachedMovies) {
          setMovies((prev) => (page === 1 ? cachedMovies : [...prev, ...cachedMovies]));
          setLoading(false);
          return;
        }

        const endpoint = debouncedSearch
          ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(
              debouncedSearch
            )}&page=${page}&include_adult=false`
          : `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=${apiKey}&language=pt-BR&page=${page}`;

        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Erro ao buscar filmes na TMDB');
        }

        const data = await response.json();
        const formattedMovies = (data.results || []).map(formatMovie);
        setMovies((prev) => (page === 1 ? formattedMovies : [...prev, ...formattedMovies]));
        setTotalPages(data.total_pages || 1);
        saveCache(cacheKey, formattedMovies);
        setLoading(false);
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return;
        }

        console.error(fetchError);
        setError('Não foi possível carregar os filmes.');
        setLoading(false);
      }
    };

    loadMovies();
    return () => controller.abort();
  }, [selectedCategory, debouncedSearch, page, loadKey]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return {
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
  };
}

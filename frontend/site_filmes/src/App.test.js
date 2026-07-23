import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App search', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async (url) => {
      const isSearch = url.includes('search/movie');
      const query = new URL(url).searchParams.get('query') || '';
      const movies = [
        {
          id: 1,
          title: 'Inception',
          overview: 'Um ladrão entra nos sonhos.',
          release_date: '2010-07-16',
          poster_path: '/inception.jpg',
          vote_average: 8.8,
        },
        {
          id: 2,
          title: 'The Matrix',
          overview: 'Um hacker descobre a realidade.',
          release_date: '1999-03-31',
          poster_path: '/matrix.jpg',
          vote_average: 8.7,
        },
      ];

      const results = isSearch
        ? movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
        : movies;

      return {
        ok: true,
        json: async () => ({ results }),
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('filters movies by title while typing', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await screen.findByText('Inception');

    const input = screen.getByPlaceholderText(/pesquisar filmes/i);
    await userEvent.type(input, 'matrix');

    await waitFor(() => {
      expect(screen.queryByText('Inception')).not.toBeInTheDocument();
    });

    expect(screen.getByText('The Matrix')).toBeInTheDocument();
  });
});

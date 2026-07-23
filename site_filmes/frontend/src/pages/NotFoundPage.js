import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="App notfound-page">
      <header className="App-header">
        <div>
          <h1>Página não encontrada</h1>
          <p>O endereço que você tentou acessar não existe.</p>
        </div>
      </header>

      <main>
        <div className="status-panel">
          <button className="retry-button" type="button" onClick={() => navigate('/')}>Voltar para o início</button>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

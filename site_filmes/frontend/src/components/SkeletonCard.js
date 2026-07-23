import './MovieCard.css';

function SkeletonCard() {
  return (
    <article className="movie-card skeleton" aria-hidden="true">
      <div className="movie-poster skeleton-box" />
      <div className="movie-info">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-meta" />
        <div className="skeleton-line skeleton-summary" />
        <div className="skeleton-line skeleton-summary" />
      </div>
    </article>
  );
}

export default SkeletonCard;

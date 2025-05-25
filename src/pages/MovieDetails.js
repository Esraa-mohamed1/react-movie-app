import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/MovieDetailsStyle.css';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&append_to_response=credits`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load movie details. Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5 mx-auto" style={{maxWidth: '600px'}}>
        {error}
        <button className="btn btn-link" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="movie-details-enhanced">
      <div className="position-relative">
        <div 
          className="backdrop-image enhanced-backdrop"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            height: '400px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px)'
          }}
        ></div>
        <div className="backdrop-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container">
            <h1 className="text-white display-4 fw-bold mb-3 drop-shadow">{movie.title}</h1>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <span className="badge badge-year">{movie.release_date.substring(0, 4)}</span>
              {movie.genres.map(genre => (
                <span key={genre.id} className="badge badge-genre">{genre.name}</span>
              ))}
              <span className="badge badge-runtime">
                <i className="bi bi-clock me-1"></i> {movie.runtime} min
              </span>
              <span className="badge badge-rating">
                <i className="bi bi-star-fill me-1"></i> {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg glass-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="img-fluid rounded-3"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=Poster+Not+Available';
                }}
              />
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 h-100 glass-card overview-card">
              <h2 className="mb-4">Overview</h2>
              <p className="lead">{movie.overview || "No overview available."}</p>
              <div className="row mt-4 g-4">
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="text-muted">Status</h5>
                    <p className="fw-bold">{movie.status}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="text-muted">Original Language</h5>
                    <p className="fw-bold text-uppercase">{movie.original_language}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="text-muted">Budget</h5>
                    <p className="fw-bold">${movie.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="text-muted">Revenue</h5>
                    <p className="fw-bold">${movie.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              {movie.credits?.cast.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-4 border-bottom pb-2">Top Cast</h3>
                  <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                    {movie.credits.cast.slice(0, 6).map((actor) => (
                      <div key={actor.id} className="col">
                        <div className="card h-100 border-0 text-center cast-card">
                          <img 
                            src={actor.profile_path 
                              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                              : 'https://via.placeholder.com/200x300?text=No+Image'}
                            alt={actor.name}
                            className="img-fluid rounded-circle mx-auto mt-3"
                            style={{width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #ff69b4', boxShadow: '0 2px 8px rgba(255,182,230,0.25)'}}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                            }}
                          />
                          <div className="card-body">
                            <h6 className="card-title mb-1">{actor.name}</h6>
                            <small className="text-muted">{actor.character}</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
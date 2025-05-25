import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites } from '../store/actions/favoritesActions';

export default function MyCard({ film }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(movie => movie.id === film.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(film.id));
    } else {
      dispatch(addToFavorites(film));
    }
  };

  return (
    <div className="col mb-4">
      <div className="card film-card h-100 border-0 bg-dark">
        <Link to={`/movie/${film.id}`} className="text-decoration-none">
          <div className="card-img-container" style={{ height: '500px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.title}
              className="card-img-top h-100 w-100 object-fit-cover"
            />
            <button 
              onClick={handleFavoriteClick}
              className="btn position-absolute top-0 end-0 m-2 p-2"
              style={{ background: 'rgba(0,0,0,0.5)', border: 'none' }}
            >
              {isFavorite ? (
                <FaHeart className="text-danger" size={24} />
              ) : (
                <FaRegHeart className="text-white" size={24} />
              )}
            </button>
          </div>
        </Link>
        <div className="card-body d-flex flex-column bg-dark text-light">
          <h5 className="card-title text-truncate">{film.title}</h5>
          <p className="card-text mt-auto">{new Date(film.release_date).getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
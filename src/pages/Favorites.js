import { useSelector } from 'react-redux';
import MyCard from '../components/MyCard';
import Navbar from '../components/Navbar';
import MyTitle from '../components/MyTitle';

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.favorites);

  return (
    <>
      <Navbar />
      <div className="container-fluid px-4 py-5">
        <MyTitle title="My Favorite Movies" />
        
        {favorites.length === 0 ? (
          <div className="text-center text-light fs-5">
            No favorite movies yet. Add some movies to your favorites!
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 g-4">
            {favorites.map((movie) => (
              <MyCard key={movie.id} film={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
} 
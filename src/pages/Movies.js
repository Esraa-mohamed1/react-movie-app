import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyCard from '../components/MyCard';
import MyTitle from '../components/MyTitle';
import { LanguageContext } from '../context/LanguageContext';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const { translations, language } = useContext(LanguageContext);
  const t = translations[language];

  useEffect(() => {
    
    if (!searchQuery) {
      setLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/movie/${category}?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&page=${page}`)
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages); 
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    
    else {
      setLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&query=${search}&page=${page}`)
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [category, searchQuery, page, search]);

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setPage(1); 
      setSearchQuery(search);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearch('');
    setSearchQuery('');
    setPage(1); 
  };

  return (
    <>
      <div className="container-fluid px-4 py-5">
        <MyTitle title={t.welcome} />
        
        <div className="mb-3">
          <div className="mb-2">
            <button className="btn filter-button text-white me-2" onClick={() => {
              setCategory('popular');
              setSearchQuery('');
              setPage(1); 
            }}>Popular</button>
            <button className="btn filter-button text-white me-2" onClick={() => {
              setCategory('top_rated');
              setSearchQuery('');
              setPage(1);
            }}>Top Rated</button>
            <button className="btn filter-button text-white me-2" onClick={() => {
              setCategory('now_playing');
              setSearchQuery('');
              setPage(1); 
            }}>Now Playing</button>
            <button className="btn filter-button text-white" onClick={() => {
              setCategory('upcoming');
              setSearchQuery('');
              setPage(1); 
            }}>Upcoming</button>
          </div>

          <form className="d-flex align-items-center w-50 mx-auto" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search movies..."
                aria-label="Search"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button className="btn search-btn" type="submit">
                <i className="bi bi-search"></i> Search
              </button>
              {searchQuery && (
                <button className="btn clear-btn" type="button" onClick={handleClearSearch}>
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </form>
        </div>

        {loading && <p>Loading...</p>}

        {!loading && movies.length === 0 && (
        <div className="text-center mt-4 text-white fs-5">
            No results found.
        </div>
        )}

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 g-4">
          {movies.map((movie) => (
            <MyCard key={movie.id} film={movie} />
          ))}
        </div>

        
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1))
                window.scrollTo(0, 0);
            }}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="d-flex align-items-center text-light">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-outline-light ms-2"
            onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages))
                window.scrollTo(0, 0);
            }}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

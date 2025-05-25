import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaLanguage } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';

export default function Navbar() {
  const favorites = useSelector(state => state.favorites.favorites);
  const { language, toggleLanguage, translations } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-white p-3">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/movies">Esraa Movies</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <div className="navbar-nav d-flex gap-3 justify-content-between align-items-center">
                <Link className="nav-link text-white" aria-current="page" to="/movies">{t.home}</Link>
                <Link className="nav-link text-white position-relative" to="/favorites">
                  <FaHeart className="text-danger me-1" />
                  {t.favorites}
                  {favorites.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <Link className="nav-link text-white" to="/register">{t.register}</Link>
                <Link className="btn login-nav-btn" to="/login">{t.login}</Link>
                <button 
                  className="btn language-btn" 
                  onClick={toggleLanguage}
                  title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                >
                  <FaLanguage style={{ marginRight: 8 }} />
                  {language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { translations, language } = useContext(LanguageContext);
  const t = translations[language];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle login logic here
    console.log('Login submitted:', { email, password });
    // Navigate to home page after successful login
    history.push('/movies');
  };

  return (
    <div className="login-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="login-box">
        <h1 className="text-center mb-4">{t.welcomeBack}</h1>
        <p className="text-center text-muted mb-4">{t.signInToContinue}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="form-label">
              {t.emailAddress}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder={t.enterEmail}
              />
            </div>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group mb-4">
            <label className="form-label" htmlFor="password">
              {t.password}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder={t.enterPassword}
              />
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button className="btn login-btn w-100 mb-3" type="submit">
            {t.signIn}
          </button>
          <div className="text-center">
            <p className="mb-0">
              {t.dontHaveAccount}{' '}
              <Link to="/register" className="register-link">
                {t.register}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

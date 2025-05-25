import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { translations, language } = useContext(LanguageContext);
  const t = translations[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle registration logic here
    console.log('Registration submitted:', formData);
  };

  return (
    <div className="login-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="login-box">
        <h1 className="text-center mb-4">{t.createAccount}</h1>
        <p className="text-center text-muted mb-4">{t.joinEsraa}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name" className="form-label">
              {t.name}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.enterName}
              />
            </div>
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="username" className="form-label">
              {t.username}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-badge"></i>
              </span>
              <input
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t.chooseUsername}
              />
            </div>
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

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
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.enterEmail}
              />
            </div>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">
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
                value={formData.password}
                onChange={handleChange}
                placeholder={t.createPassword}
              />
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button className="btn login-btn w-100 mb-3" type="submit">
            {t.createAccount}
          </button>
          <div className="text-center">
            <p className="mb-0">
              {t.alreadyHaveAccount}{' '}
              <Link to="/login" className="register-link">
                {t.login}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
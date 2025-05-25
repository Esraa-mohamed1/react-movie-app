import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Movies} />
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/movie/:id" component={MovieDetails} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;

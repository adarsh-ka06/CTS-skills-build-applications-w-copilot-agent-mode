import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Home() {
  return (
    <div className="app-container">
      <h1 className="mb-4">Octofit Tracker</h1>
      <p className="lead">
        A React 19 + Vite frontend for the Octofit Tracker multi-tier app.
      </p>
      <p>
        API base URL: <code>{apiBaseUrl}</code>
      </p>
      <p>
        Use the navigation links above to explore available data views.
      </p>
    </div>
  );
}

function PlaceholderPage({ title, endpoint }: { title: string; endpoint: string }) {
  return (
    <div className="app-container">
      <h1>{title}</h1>
      <p>
        Endpoint: <code>{`${apiBaseUrl}/${endpoint}`}</code>
      </p>
      <p>This view will fetch and display data from the backend.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mb-4">
          <div className="container-fluid">
            <span className="navbar-brand">Octofit</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">
                    Workouts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

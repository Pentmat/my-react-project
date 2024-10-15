// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import OpenComponent from './OpenComponent';
import ComponentUI from './ComponentUI'; 

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/order">Order Products</Link>
            </li>
            <li>
              <Link to="/movies">Search Movies</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<ComponentUI />} />
          <Route path="/movies" element={<OpenComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Ryzen GPU and Movie Search App!</h1>
    </div>
  );
}

export default App;
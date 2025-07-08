// import './App.css';

// function App() {
//   return (
//     <div className="App">
//     <h1>hiii</h1>
//     </div>
//   );
// }

// export default App;

// src/pages/Statistics.jsx

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<Home />} /> {/* Redirection handler */}
      </Routes>
    </Router>
  );
}

export default App;

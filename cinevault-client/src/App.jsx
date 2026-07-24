import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MediaDetail from './pages/MediaDetail';
import Auth from './pages/Auth';
import Watchlist from './pages/Watchlist';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/media/:id" element={<MediaDetail />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  );
}

export default App;
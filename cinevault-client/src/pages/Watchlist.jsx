import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getWatchlist } from '../api/watchlist';
import Navbar from '../components/Navbar';
import MediaCard from '../components/MediaCard';

export default function Watchlist() {
  const { user, token, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    getWatchlist(token)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, token, authLoading]);

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">My Watchlist</h1>

        {!user && !authLoading && (
          <p className="text-gray-400">Please log in to see your watchlist.</p>
        )}

        {loading && <p className="text-gray-400">Loading...</p>}

        {error && <p className="text-red-400">Error: {error}</p>}

        {!loading && user && items.length === 0 && !error && (
          <p className="text-gray-400">Your watchlist is empty. Add something from the home page!</p>
        )}

        <div className="flex flex-wrap gap-4">
          {items.map((media) => (
            <MediaCard key={media._id} media={media} />
          ))}
        </div>
      </div>
    </div>
  );
}
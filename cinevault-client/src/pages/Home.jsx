import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import MediaRow from '../components/MediaRow';
import { fetchFeatured, fetchMediaByType } from '../api/media';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchFeatured(), fetchMediaByType('movie'), fetchMediaByType('tv')])
      .then(([featuredData, movieData, tvData]) => {
        setFeatured(featuredData);
        setMovies(movieData);
        setTvSeries(tvData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center text-gray-400">
        Loading CineVault...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center text-red-400">
        Couldn't reach the server: {error}. Is the backend running on port 5000?
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <FeaturedCarousel items={featured} />
      <MediaRow title="Movies" items={movies} seeAllHref="/movies" />
      <MediaRow title="TV Series" items={tvSeries} seeAllHref="/tv" />
    </div>
  );
}
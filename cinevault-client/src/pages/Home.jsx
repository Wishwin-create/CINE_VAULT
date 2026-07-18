import Navbar from '../components/Navbar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import MediaRow from '../components/MediaRow';
// Temporary mock data — swap for a fetch to /api/media/featured once the backend route exists
const featured = [
  {
    title: 'The Matrix',
    year: 1999,
    rating: '18+',
    duration: '2h 16m',
    genre: ['Action', 'Sci-Fi'],
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    bannerUrl: '/banners/matrix.jpg',
  },
];

// Temporary mock data — swap for fetches to /api/media?type=movie and ?type=tv
const movies = [
  { _id: '1', title: 'The Matrix', year: 1999, rating: '18+', posterUrl: '/posters/matrix.jpg' },
  { _id: '2', title: 'Inception', year: 2010, rating: '13+', posterUrl: '/posters/inception.jpg' },
  { _id: '3', title: 'Interstellar', year: 2014, rating: '13+', posterUrl: '/posters/interstellar.jpg' },
  { _id: '4', title: 'Blade Runner 2049', year: 2017, rating: '18+', posterUrl: '/posters/blade-runner.jpg' },
  { _id: '5', title: 'Dune', year: 2021, rating: '13+', posterUrl: '/posters/dune.jpg' },
  { _id: '6', title: 'Arrival', year: 2016, rating: '13+', posterUrl: '/posters/arrival.jpg' },
];

const tvSeries = [
  { _id: '7', title: 'Stranger Things', year: 2016, rating: '16+', posterUrl: '/posters/stranger-things.jpg' },
  { _id: '8', title: 'Dark', year: 2017, rating: '16+', posterUrl: '/posters/dark.jpg' },
  { _id: '9', title: 'Severance', year: 2022, rating: '16+', posterUrl: '/posters/severance.jpg' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <FeaturedCarousel items={featured} />
      <MediaRow title="Movies" items={movies} seeAllHref="/movies" />
      <MediaRow title="TV Series" items={tvSeries} seeAllHref="/tv" />
    </div>
  );
}
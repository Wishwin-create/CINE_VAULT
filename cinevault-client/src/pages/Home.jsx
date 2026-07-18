import Navbar from '../components/Navbar';
import FeaturedCarousel from '../components/FeaturedCarousel';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <FeaturedCarousel items={featured} />
      {/* MediaRow components (Movies, TV Series) come next */}
    </div>
  );
}
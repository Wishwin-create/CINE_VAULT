import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaCard from './MediaCard';

export default function MediaRow({ title, items, seeAllHref }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 720, behavior: 'smooth' });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        {seeAllHref && (
          <Link
            to={seeAllHref}
            className="text-sm font-semibold text-accent-from hover:text-accent-to transition-colors"
          >
            See All
          </Link>
        )}
      </div>

      <div className="relative group/row">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="hidden sm:flex absolute left-0 top-0 bottom-0 z-10 w-10 items-center justify-center bg-gradient-to-r from-base to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {items.map((media) => (
            <MediaCard key={media._id} media={media} />
          ))}
        </div>

        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="hidden sm:flex absolute right-0 top-0 bottom-0 z-10 w-10 items-center justify-center bg-gradient-to-l from-base to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
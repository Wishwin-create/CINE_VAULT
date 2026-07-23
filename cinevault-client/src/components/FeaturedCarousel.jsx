import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedCarousel({ items, autoPlayMs = 7000 }) {
  const [index, setIndex] = useState(0);
  const [inList, setInList] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => setIndex((i + items.length) % items.length), [items.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    setInList(false);
  }, [index]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [next, paused, autoPlayMs, items.length]);

  if (!items.length) return null;
  const media = items[index];

  return (
    <section
      className="relative h-[420px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${media.bannerUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center max-w-xl px-6 sm:px-10 lg:px-16">
        <span className="text-accent-from font-bold text-xs sm:text-sm tracking-[0.2em] mb-2 sm:mb-3">
          FEATURED
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
          {media.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
          <Badge>{media.year}</Badge>
          <Badge accent>{media.rating}</Badge>
          <Badge>{media.duration}</Badge>
          <Badge>{media.genre.join(' / ')}</Badge>
        </div>

        <p className="hidden sm:block text-gray-300 leading-relaxed mb-6 line-clamp-3">
          {media.description}
        </p>

        <div className="flex items-center gap-3">
          <Link
            to={`/media/${media._id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-accent-from to-accent-to hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4 fill-white" />
            Watch Now
          </Link>
          <button
            onClick={() => setInList((v) => !v)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border border-white/25 hover:bg-white/10 transition-colors"
          >
            {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {inList ? 'In My List' : 'My List'}
          </button>
        </div>
      </div>

      {/* Arrows — hidden on mobile, swipe/autoplay handles navigation there */}
      {items.length > 1 && (
        <>
          <ArrowButton side="left" onClick={prev} />
          <ArrowButton side="right" onClick={next} />
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 bg-gradient-to-r from-accent-from to-accent-to'
                  : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Badge({ children, accent }) {
  return (
    <span
      className={`px-2.5 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-semibold ${
        accent ? 'bg-accent-from/90 text-white' : 'bg-surface text-gray-200'
      }`}
    >
      {children}
    </span>
  );
}

function ArrowButton({ side, onClick }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous' : 'Next'}
      className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 ${
        side === 'left' ? 'left-6' : 'right-6'
      } z-10 items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
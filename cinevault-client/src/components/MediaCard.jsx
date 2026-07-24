import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addToWatchlist, removeFromWatchlist } from '../api/watchlist';

export default function MediaCard({ media }) {
  const [inList, setInList] = useState(false);
    const { user, token } = useAuth();

   const handleToggleList = async (e) => {
    e.preventDefault(); 

   if (!user) {
      alert('Please log in to use My List');
      return;
    }

    try {
      if (inList) {
        await removeFromWatchlist(media._id, token);
        setInList(false);
      } else {
        await addToWatchlist(media._id, token);
        setInList(true);
      }
    } catch (err) {
      console.error('Watchlist error:', err);
    }
  };

  return (
    <Link
      to={`/media/${media._id}`}
      className="group relative flex-shrink-0 w-[180px] snap-start"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface">
        <img
          src={media.posterUrl}
          alt={media.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
          <div className="flex items-center gap-1 text-xs text-gray-300 mb-2">
            <Star className="w-3 h-3 fill-accent-from text-accent-from" />
            <span>{media.rating}</span>
            <span className="mx-1">·</span>
            <span>{media.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Play"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
            </button>
            <button
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
              onClick={handleToggleList}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-colors"
            >
              {inList ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
        {media.title}
      </p>
    </Link>
  );
}
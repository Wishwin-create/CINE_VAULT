import { NavLink } from 'react-router-dom';
import { Search, FolderPlus, Settings2, Clapperboard } from 'lucide-react';


const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/tv', label: 'TV Series' },
  { to: '/watchlist', label: 'Watchlist' },
];

export default function Navbar() {
 return (
     <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-base/95 backdrop-blur border-b border-white/5">
      {/* Logo */}  
      <div className="flex items-center gap-2">
      <Clapperboard className="w-6 h-6 text-accent-from" strokeWidth={2.2} />
      <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent"> CineVault</span>
       </div>

{/* Nav links */}
<nav className="flex items-center gap-1">
{navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-gray-300 hover:text-white'
              }`
            }
>
 {label}
  </NavLink>
        ))}
      </nav>

{/* Action icons */}
<div className="flex items-center gap-5 text-gray-300">
<button aria-label="Search" className="hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>    
<button aria-label="Upload media" className="hover:text-white transition-colors">
          <FolderPlus className="w-5 h-5" />
        </button>
<button aria-label="Settings" className="hover:text-white transition-colors">
          <Settings2 className="w-5 h-5" />
        </button>
</div>
    </header>
 );
}
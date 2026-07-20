import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, FolderPlus, Settings2, Clapperboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/tv', label: 'TV Series' },
  { to: '/watchlist', label: 'Watchlist' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

        {user ? (
          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <User className="w-4 h-4" />
              {user.username}
            </span>
            <button
              aria-label="Log out"
              onClick={handleLogout}
              className="hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-accent-from to-accent-to text-white hover:opacity-90 transition-opacity"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
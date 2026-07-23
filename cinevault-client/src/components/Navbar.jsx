import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Settings2, Clapperboard, LogOut, User, Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-base/95 backdrop-blur border-b border-white/5">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-accent-from" strokeWidth={2.2} />
          <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            CineVault
          </span>
        </div>

        {/* Nav links — hidden below lg, shown as horizontal row above */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Action icons — some hidden on smallest screens */}
        <div className="flex items-center gap-3 sm:gap-5 text-gray-300">
          <button aria-label="Search" className="hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Settings" className="hidden sm:inline-flex hover:text-white transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>

          {/* Auth section — hidden on mobile, shown in the slide-out menu instead */}
          <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-white/10">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <User className="w-4 h-4" />
                  {user.username}
                </span>
                <button aria-label="Log out" onClick={handleLogout} className="hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-accent-from to-accent-to text-white hover:opacity-90 transition-opacity"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Hamburger — only visible below lg */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/5 px-4 py-4 flex flex-col gap-1 bg-base">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="mt-2 pt-2 border-t border-white/5">
            {user ? (
              <div className="flex items-center justify-between px-4 py-2">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <User className="w-4 h-4" />
                  {user.username}
                </span>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-accent-from to-accent-to text-white"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
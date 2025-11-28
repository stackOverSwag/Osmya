import { Link, NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-brand-600 dark:text-brand-400">Osmya</Link>
        <nav className="flex items-center gap-6">
          {isAuthenticated && (
            <>
              <NavLink to="/products" className={({isActive}) => isActive ? 'text-brand-600 dark:text-brand-400' : ''}>Produits</NavLink>
              <NavLink to="/profile" className={({isActive}) => isActive ? 'text-brand-600 dark:text-brand-400' : ''}>Profil</NavLink>
              <button onClick={logout} className="text-sm rounded-md px-3 py-1 border border-gray-300 dark:border-gray-700">Déconnexion</button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={({isActive}) => isActive ? 'text-brand-600 dark:text-brand-400' : ''}>Connexion</NavLink>
              <NavLink to="/register" className={({isActive}) => isActive ? 'text-brand-600 dark:text-brand-400' : ''}>Inscription</NavLink>
            </>
          )}
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="text-center py-16 space-y-6">
      <h1 className="text-4xl font-bold">Bienvenue sur Osmya</h1>
      <p className="text-gray-600 dark:text-gray-400">Une boutique moderne et rapide.</p>
      {isAuthenticated ? (
        <div className="flex items-center justify-center gap-4">
          <Link to="/products" className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Voir les produits</Link>
          <Link to="/profile" className="px-4 py-2 rounded-md border border-brand-600 text-brand-700 dark:text-brand-300">Profil</Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Link to="/gate" className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Entrer</Link>
          <Link to="/login" className="px-4 py-2 rounded-md border border-brand-600 text-brand-700 dark:text-brand-300">Se connecter</Link>
          <Link to="/register" className="px-4 py-2 rounded-md border border-brand-600 text-brand-700 dark:text-brand-300">S’inscrire</Link>
        </div>
      )}
    </section>
  );
}

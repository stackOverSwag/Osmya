import { Link } from 'react-router-dom';

export default function Gate() {
  return (
    <section className="max-w-lg mx-auto text-center py-16 space-y-6">
      <h1 className="text-3xl font-bold">Bienvenue sur Osmya</h1>
      <p className="text-gray-600 dark:text-gray-400">Pour accéder au site, veuillez vous connecter ou créer un compte.</p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/login" className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Se connecter</Link>
        <Link to="/register" className="px-4 py-2 rounded-md border border-brand-600 text-brand-700 dark:text-brand-300">S’inscrire</Link>
      </div>
    </section>
  );
}

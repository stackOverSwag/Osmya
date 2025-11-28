import { useState } from 'react';
import { login } from '../lib/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuthToken } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      // Ensure context updates for guards
      setAuthToken(data.token);
      const from = (location.state as any)?.from?.pathname || '/products';
      navigate(from);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                 className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Mot de passe</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                 className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" required />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </section>
  );
}

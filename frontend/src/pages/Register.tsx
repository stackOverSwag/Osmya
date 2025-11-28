import { useState } from 'react';
import { register } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(email, password);
      navigate('/login');
    } catch (e: any) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.message;
      if (status === 400) {
        if (msg === 'Username already taken') {
          setError("Cet identifiant est déjà utilisé. Essayez un autre nom ou connectez-vous.");
        } else {
          setError(msg || 'Informations invalides (utilisateur déjà existant ou format incorrect).');
        }
      } else {
        setError(msg || 'Erreur réseau. Réessayez plus tard.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Créer un compte</h2>
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
        {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}
        <button disabled={loading} className="w-full px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">
          {loading ? 'Inscription…' : 'S’inscrire'}
        </button>
      </form>
    </section>
  );
}

function parseJwt(token: string): { sub?: string; role?: string; exp?: number } | null {
  try {
    const payload = token.split('.')[1];
    const json = JSON.parse(atob(payload));
    return { sub: json.sub, role: json.role, exp: json.exp };
  } catch {
    return null;
  }
}

export default function Profile() {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');
  const info = token ? parseJwt(token) : null;
  const expiry = info?.exp ? new Date(info.exp * 1000) : null;

  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Profil</h2>
      {!token && (
        <p className="text-sm text-gray-600 dark:text-gray-400">Vous n’êtes pas connecté.</p>
      )}
      {token && (
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4 space-y-2">
          <p><span className="font-medium">Identifiant:</span> {info?.sub || '—'}</p>
          <p><span className="font-medium">Rôle:</span> {info?.role || '—'}</p>
          {expiry && <p><span className="font-medium">Expiration:</span> {expiry.toLocaleString()}</p>}
        </div>
      )}
    </section>
  );
}

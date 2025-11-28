export default function Profile() {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');
  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Profil</h2>
      {!token && (
        <p className="text-sm text-gray-600 dark:text-gray-400">Vous n’êtes pas connecté.</p>
      )}
      {token && (
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm">Jeton stocké dans le navigateur.</p>
        </div>
      )}
      <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
        <label className="block text-sm mb-1">Clé API (x-api-key)</label>
        <input
          defaultValue={apiKey || ''}
          onBlur={(e) => localStorage.setItem('apiKey', e.target.value)}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
          placeholder="Optionnel"
        />
        <p className="text-xs mt-2 text-gray-500">Certaines routes nécessitent une clé API.</p>
      </div>
    </section>
  );
}

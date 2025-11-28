import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-md px-3 py-1 border border-gray-300 dark:border-gray-700 text-sm"
      aria-label="Basculer le thème"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}

# Osmya Frontend

Application frontend moderne pour l’API e-commerce Osmya.

## Prérequis
- Node.js 18+

## Installation

```zsh
cd Osmya/frontend
npm install
```

## Démarrer en local

Créez un fichier `.env` avec l’URL de l’API:

```zsh
echo "VITE_API_URL=http://localhost:8080" > .env
```

Puis lancez le serveur de dev:

```zsh
npm run dev
```

## Pages
- `/` Accueil
- `/products` Liste des produits
- `/products/:id` Détail produit
- `/login` Connexion
- `/register` Inscription
- `/profile` Profil (+ stockage `x-api-key`)

## Styling
Tailwind CSS avec mode sombre, palette brand et layout responsive.

## Config
- `src/lib/api.ts` configure Axios avec `Authorization: Bearer` et `x-api-key` depuis `localStorage`.
- Base URL lue via `VITE_API_URL`.

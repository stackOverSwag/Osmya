import { Link } from 'react-router-dom';
import type { Product } from '../lib/api';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex flex-col">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        {product.description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{product.description}</p>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-brand-700 dark:text-brand-300 font-bold">{product.price.toFixed(2)} €</span>
        <Link
          to={`/products/${product.id}`}
          className="px-3 py-1 rounded-md bg-brand-600 text-white hover:bg-brand-700"
        >
          Voir
        </Link>
      </div>
    </div>
  );
}

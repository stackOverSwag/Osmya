import { useEffect, useState } from 'react';
import { listProducts, type Product } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p className="text-red-600">Erreur: {error}</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Produits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

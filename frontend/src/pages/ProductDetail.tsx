import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, type Product } from '../lib/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p className="text-red-600">Erreur: {error}</p>;
  if (!product) return <p>Introuvable.</p>;

  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold">{product.name}</h2>
      {product.description && (
        <p className="mt-3 text-gray-700 dark:text-gray-300">{product.description}</p>
      )}
      <p className="mt-4 text-2xl font-semibold text-brand-700 dark:text-brand-300">
        {product.price.toFixed(2)} €
      </p>
      <button className="mt-6 px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Ajouter au panier</button>
    </section>
  );
}

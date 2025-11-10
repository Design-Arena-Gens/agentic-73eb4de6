"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartStore';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  useEffect(() => {
    fetch(`/api/products/${params.id}`).then(async (r) => setProduct(await r.json()));
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="row">
      <div>
        <div className="card">
          <div className="media">
            {product.images?.[0] ? (
              <Image src={product.images[0]} alt={product.title} width={900} height={900} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#9fb1c1' }}>No Image</div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1 className="h1">{product.title}</h1>
        <div className="badge">{product.category}</div>
        <p className="muted" style={{ marginTop: 12 }}>{product.description}</p>
        <div className="h2 price" style={{ marginTop: 14 }}>${product.price.toFixed(2)}</div>
        <div className="footer-actions" style={{ marginTop: 16 }}>
          <input className="input" type="number" min={1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || '1', 10))} style={{ width: 100 }} />
          <button className="button" onClick={() => add({ productId: product._id, title: product.title, price: product.price, image: product.images?.[0], quantity: qty })}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

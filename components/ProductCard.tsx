import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="card">
      <Link href={`/products/${product._id}`}>
        <div className="media">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.title} width={600} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#9fb1c1' }}>No Image</div>
          )}
        </div>
      </Link>
      <div className="body">
        <div className="h2">{product.title}</div>
        <div className="muted">{product.category}</div>
        <div className="footer-actions">
          <span className="price">${product.price.toFixed(2)}</span>
          <Link className="button secondary" href={`/products/${product._id}`}>View</Link>
        </div>
      </div>
    </div>
  );
}

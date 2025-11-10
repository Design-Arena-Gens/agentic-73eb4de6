import useSWR from 'swr';
import ProductCard from '@/components/ProductCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HomePage() {
  const { data: products } = useSWR('/api/products', fetcher);
  return (
    <div>
      <h1 className="h1">Featured Jewelry</h1>
      <div className="grid">
        {products?.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

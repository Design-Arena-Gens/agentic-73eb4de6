"use client";
import { useEffect, useRef, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', price: 0, category: 'Rings', description: '', images: [] as string[] });
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function refresh() {
    setLoading(true);
    const res = await fetch('/api/products');
    setProducts(await res.json());
    setLoading(false);
  }

  useEffect(() => { refresh(); }, []);

  async function uploadImage(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const up = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = await up.json();
    if (!up.ok) throw new Error(json.error || 'Upload failed');
    return json.url as string;
  }

  async function createProduct() {
    if (!form.title || !form.description || !form.price) return alert('Fill required fields');
    const res = await fetch('/api/products', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    });
    if (!res.ok) return alert('Create failed');
    setForm({ title: '', price: 0, category: 'Rings', description: '', images: [] });
    await refresh();
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) await refresh();
  }

  return (
    <div>
      <h1 className="h1">Admin ? Products</h1>
      <div className="row">
        <div>
          <div className="card">
            <div className="body">
              <h2 className="h2">Create Product</h2>
              <div className="form">
                <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <div className="row">
                  <input className="input" type="number" min={0} placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value || '0') })} />
                  <select className="select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option>Rings</option>
                    <option>Necklaces</option>
                    <option>Earrings</option>
                    <option>Bracelets</option>
                  </select>
                </div>
                <textarea className="textarea" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <div>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadImage(file);
                    setForm({ ...form, images: [...form.images, url] });
                  }} />
                  <button className="button secondary" onClick={() => fileRef.current?.click()}>Upload Image</button>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {form.images.map((url, i) => (
                    <img key={i} src={url} alt="uploaded" style={{ width: 72, height: 72, objectFit:'cover', borderRadius: 8, border:'1px solid #22303c' }} />
                  ))}
                </div>
                <button className="button" onClick={createProduct}>Create</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card">
            <div className="body">
              <h2 className="h2">All Products {loading && <span className="muted">(loading?)</span>}</h2>
              <table className="table">
                <thead>
                  <tr><th>Title</th><th>Price</th><th>Category</th><th></th></tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>{p.title}</td>
                      <td>${p.price.toFixed(2)}</td>
                      <td>{p.category}</td>
                      <td>
                        <button className="button secondary" onClick={() => deleteProduct(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useCart } from '@/components/CartStore';
import { useState } from 'react';

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({ name: '', email: '', address: '', city: '', country: '', postalCode: '' });
  const [success, setSuccess] = useState<string | null>(null);

  async function submitOrder() {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, customer }),
      });
      if (!res.ok) throw new Error('Order failed');
      setSuccess('Order placed! We\'ll email you shortly.');
      clear();
    } catch (e: any) {
      alert(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="h1">Checkout</h1>
      {items.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <div className="row">
          <div>
            <div className="card">
              <div className="body">
                <h2 className="h2">Shipping Details</h2>
                <div className="form">
                  <input className="input" placeholder="Full name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                  <input className="input" placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                  <input className="input" placeholder="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                  <div className="row">
                    <input className="input" placeholder="City" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
                    <input className="input" placeholder="Country" value={customer.country} onChange={(e) => setCustomer({ ...customer, country: e.target.value })} />
                  </div>
                  <input className="input" placeholder="Postal code" value={customer.postalCode} onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="body">
                <h2 className="h2">Order Summary</h2>
                <ul>
                  {items.map((i) => (
                    <li key={i.productId} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0' }}>
                      <span>{i.title} ? {i.quantity}</span>
                      <span>${(i.price * i.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop: 10, borderTop:'1px solid #22303c', paddingTop: 10 }}>
                  <strong>Total</strong>
                  <strong className="price">${total.toFixed(2)}</strong>
                </div>
                <button className="button" onClick={submitOrder} disabled={loading} style={{ marginTop: 14 }}>
                  {loading ? 'Placing order?' : 'Place order'}
                </button>
                {success && <p style={{ marginTop: 10 }}>{success}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useCart } from '@/components/CartStore';
import Link from 'next/link';

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <div>
      <h1 className="h1">Your Cart</h1>
      {items.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.productId}>
                  <td>{i.title}</td>
                  <td>${i.price.toFixed(2)}</td>
                  <td>
                    <input className="input" type="number" min={1} value={i.quantity} onChange={(e) => setQty(i.productId, parseInt(e.target.value || '1', 10))} style={{ width: 80 }} />
                  </td>
                  <td>${(i.price * i.quantity).toFixed(2)}</td>
                  <td><button className="button secondary" onClick={() => remove(i.productId)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop: 16 }}>
            <div className="h2">Total: <span className="price">${total.toFixed(2)}</span></div>
            <Link className="button" href="/checkout">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}

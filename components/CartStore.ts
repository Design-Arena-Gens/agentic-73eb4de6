import { create } from 'zustand';

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
};

function load(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(items));
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.productId === item.productId);
    let next: CartItem[];
    if (existing) {
      next = items.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      next = [...items, item];
    }
    set({ items: next });
    save(next);
  },
  remove: (productId) => {
    const next = get().items.filter((i) => i.productId !== productId);
    set({ items: next });
    save(next);
  },
  setQty: (productId, quantity) => {
    const next = get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
    set({ items: next });
    save(next);
  },
  clear: () => {
    set({ items: [] });
    save([]);
  },
}));

// hydrate client-side
if (typeof window !== 'undefined') {
  const initial = load();
  useCart.setState({ items: initial });
}

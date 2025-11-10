import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Aurora Jewels',
  description: 'Elegant jewelry e-commerce built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <a className="brand" href="/">Aurora Jewels</a>
            <nav className="nav">
              <a href="/products">Shop</a>
              <a href="/admin/products">Admin</a>
              <a href="/cart">Cart</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">? {new Date().getFullYear()} Aurora Jewels</div>
        </footer>
      </body>
    </html>
  );
}

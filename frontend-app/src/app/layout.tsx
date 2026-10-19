import React from 'react';

export const metadata = {
  title: 'Zero Budget Architecture',
  description: 'Scalable production stack built entirely on free tiers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#f8fafc' }}>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>💰 Zero-Budget Core</span>
          <a href="https://github.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>Docs</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

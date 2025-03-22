import './globals.css';
import React from 'react';
import Root from './root';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Auth App</title>
      </head>
      <body>
        <main>
          <Root>{children}</Root>
        </main>
      </body>
    </html>
  );
}

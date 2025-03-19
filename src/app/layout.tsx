import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Auth App</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

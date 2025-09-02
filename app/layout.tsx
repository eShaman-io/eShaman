import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>eShaman App</title>
        <meta name="description" content="Apollo + Next.js app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
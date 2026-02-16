import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morpho | Connect to the universal lending network',
  description: 'Access global liquidity at the best possible terms powered by open infrastructure.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased selection:bg-[#15181A] selection:text-white bg-[#F9F9F9]">
        {children}
      </body>
    </html>
  );
}

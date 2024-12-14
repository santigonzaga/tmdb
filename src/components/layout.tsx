import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="p-4 bg-indigo-600 text-white font-bold">
        <h1>TMDB App</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="p-4 bg-gray-200 text-center text-sm">
        &copy; 2024 TMDB App
      </footer>
    </div>
  );
}

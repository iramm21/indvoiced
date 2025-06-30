'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/PrivateSidebar';
import { Header } from '@/components/PrivateHeader';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6 bg-muted w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

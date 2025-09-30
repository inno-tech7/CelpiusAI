import type React from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminMobileNav } from '@/components/admin-mobile-nav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="body-gradient-bg min-h-screen min-w-[100vw]">
      <AdminSidebar />
      <AdminMobileNav />
      <main className="px-8 py-8 lg:ml-[20rem] max-820:pt-[8rem]">{children}</main>
    </div>
  );
}

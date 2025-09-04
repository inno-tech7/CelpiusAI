import type React from 'react';
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminMobileNav } from "@/components/admin-mobile-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-w-[100vw] min-h-screen body-gradient-bg">
            <AdminSidebar />
            <AdminMobileNav />
            <main className="py-8 px-8 lg:ml-[20rem] max-820:pt-[8rem]">
                {children}
            </main>
        </div>
    );
}

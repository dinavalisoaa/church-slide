import AppSidebar from '@/src/components/layout/app-sidebar';
import Header from '@/src/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/src/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from "react";
import KBar from "@/src/components/kbar";

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
      <KBar>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
      </KBar>
  );
}

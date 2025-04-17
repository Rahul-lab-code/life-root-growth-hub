
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const MobileMenuButton = () => {
  const { setOpenMobile } = useSidebar();
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="md:hidden fixed top-4 left-4 z-30"
      onClick={() => setOpenMobile(true)}
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Open menu</span>
    </Button>
  );
};

const MainLayoutContent = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
        <MobileMenuButton />
        <Outlet />
      </main>
    </div>
  );
};

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
};

export default MainLayout;

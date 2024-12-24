import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
    >
      <div className='min-h-screen flex w-full'>
        <AppSidebar />
        <main className='flex-1 p-6'>
          <button onClick={() => setOpen((prev) => !prev)}>{open ? <PanelRightOpen /> : <PanelLeftOpen />}</button>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;

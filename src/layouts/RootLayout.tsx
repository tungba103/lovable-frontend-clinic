import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <SidebarProvider>
      <div className='min-h-screen flex w-full'>
        <AppSidebar />
        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;

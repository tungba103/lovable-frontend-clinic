import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../components/ui/sidebar';
import AppSidebar from '../components/AppSidebar';

const RootLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
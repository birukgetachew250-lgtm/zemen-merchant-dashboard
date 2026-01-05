import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarRail />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

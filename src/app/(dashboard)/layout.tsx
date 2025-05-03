import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarApp } from "@/components/sidebar/sidebar-app";
import { HeaderMain } from "@/components/header/header-main";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <SidebarProvider>
        <SidebarApp />
        <SidebarInset>
          <HeaderMain />
          <main className="container p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}

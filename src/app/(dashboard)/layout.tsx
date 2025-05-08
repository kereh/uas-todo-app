import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarApp } from "@/components/sidebar/sidebar-app";
import { BreadCrumbsMain } from "@/components/breadcrumbs/breadcrumbs-main";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <SidebarProvider>
        <SidebarApp variant="inset" />
        <SidebarInset>
          <BreadCrumbsMain />
          <main className="container p-4">{children}</main>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}

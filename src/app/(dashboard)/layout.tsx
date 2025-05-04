import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarApp } from "@/components/sidebar/sidebar-app";
import { BreadCrumbsMain } from "@/components/breadcrumbs/breadcrumbs-main";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <SidebarProvider>
        <SidebarApp />
        <SidebarInset>
          <BreadCrumbsMain />
          <main className="container p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}

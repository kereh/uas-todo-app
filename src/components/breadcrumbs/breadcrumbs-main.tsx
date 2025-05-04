"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ThemeToggler } from "@/components/theme/theme-toggler";

const formatPathSegment = (segment: string): string => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function BreadCrumbsMain() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter((segment) => segment !== "");
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const formattedSegment = formatPathSegment(segment);
      const isLastSegment = index === segments.length - 1;

      return {
        href,
        label: formattedSegment,
        isCurrentPage: isLastSegment,
      };
    });
  }, [pathname]);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b">
      <div className="flex items-center px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.length > 0 ? (
              breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem
                  key={breadcrumb.href}
                  className={
                    index < breadcrumbs.length - 1 ? "hidden md:block" : ""
                  }
                >
                  {breadcrumb.isCurrentPage ? (
                    <BreadcrumbPage className="font-semibold">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink href={breadcrumb.href}>
                        {breadcrumb.label}
                      </BreadcrumbLink>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </>
                  )}
                </BreadcrumbItem>
              ))
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">
                  To-Do List
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center p-4">
        <ThemeToggler />
      </div>
    </header>
  );
}

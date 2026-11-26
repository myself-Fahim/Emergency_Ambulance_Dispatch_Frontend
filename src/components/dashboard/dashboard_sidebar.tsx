"use client";

import {
  Activity,
  Ambulance,
  BarChart3,
  ClipboardCheck,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  Settings,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/admin.routes";
import { customerRoutes } from "@/routes/customer.route";
import { driverRoutes } from "@/routes/driver.route";
import type { UserRole } from "@/types/roleguard.types";
import type { TSidebarGroups } from "@/types/sidebar.type";

const dashboardRole: Record<UserRole, TSidebarGroups> = {
  ADMIN: adminRoutes,
  CUSTOMER: customerRoutes,
  DRIVER: driverRoutes,
};

const routeIcons = {
  Overview: LayoutDashboard,
  "Approve Driver": ClipboardCheck,
  "Live Tracking": MapPin,
  "My Requests": Siren,
  "My Ambulance": Ambulance,
  Users,
  Reports: BarChart3,
  Settings,
};

function getRouteIcon(title: string) {
  return routeIcons[title as keyof typeof routeIcons] ?? Activity;
}

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const data = dashboardRole[role] ?? [];

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="border-sidebar-border/70">
      <SidebarHeader className="gap-4 border-b border-sidebar-border/70 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
            <Ambulance className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-sidebar-foreground">
              Ambulancia
            </p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              Emergency dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/70 px-3 py-2.5">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-sidebar-accent-foreground">
            Dispatch system online
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 py-4">
          <SidebarMenu className="gap-1">
            {data.map((group) => (
              <SidebarMenuItem key={group.title}>
                <p className="px-2 pb-1 pt-4 text-xs font-semibold text-sidebar-foreground/55 first:pt-1">
                  {group.title}
                </p>
                {group.items?.length ? (
                  <SidebarMenuSub className="mx-0 border-sidebar-border/70 px-0 pl-3">
                    {group.items.map((item) => {
                      const Icon = getRouteIcon(item.title);
                      const isActive = pathname === item.url;

                      return (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            render={<Link href={item.url} />}
                            isActive={isActive}
                            onPointerDown={closeMobileSidebar}
                            onClick={closeMobileSidebar}
                            className="h-9 gap-3 px-3"
                          >
                            <Icon className="size-4" aria-hidden="true" />
                            <span>{item.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarSeparator className="mb-3" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-9 text-sidebar-foreground/70"
              tooltip="Support"
            >
              <LifeBuoy className="size-4" aria-hidden="true" />
              <span>Dispatch support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 rounded-lg border border-sidebar-border/70 bg-sidebar-accent/40 px-3 py-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-sidebar-foreground">
                  {role.toLowerCase()} portal
                </p>
                <p className="truncate text-[11px] text-sidebar-foreground/55">
                  Secure access
                </p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

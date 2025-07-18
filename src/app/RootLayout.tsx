import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  FileSearch,
  GalleryVerticalEnd,
  LayoutDashboard,
  Plus,
  User,
  UserPlus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import UserCard from "@/components/user-card";
import { useQuery } from "@tanstack/react-query";
import { UserRepositoryImp } from "@/features/users/insfrastructure/repositories/UserRepositoryImp";
import { UserService } from "@/features/users/application/UserService";
import { TokenStorageRepositoryImp } from "@/features/core/infrastructure/TokenStorageRepositoryImp";
import { useEffect } from "react";
import { useRolesStore } from "@/features/core/infrastructure/stores/useRolesStore";
import { usePermissionsStore } from "@/features/core/infrastructure/stores/usePersmissionsStore";

const menuContent = [
  {
    name: "menuButton 1",
    icon: LayoutDashboard,
    link: "/",
  },
  {
    name: "menuButton 2",
    icon: User,
    link: "/routeFive",
  },
  {
    name: "Usuarios",
    icon: UserPlus,
    submenu: [
      {
        name: "Crear Usuario",
        icon: Plus,
        link: "/user",
      },
      {
        name: "Crear Rol",
        icon: FileSearch,
        link: "/role",
      },
      {
        name: "Crear Permiso",
        icon: FileSearch,
        link: "/permission",
      },
    ],
  },
  {
    name: "WhitSubmenu 2",
    icon: UserPlus,
    submenu: [
      {
        name: "menuButton 1",
        icon: Plus,
        link: "/routeFive",
      },
      {
        name: "menuButton 2",
        icon: FileSearch,
        link: "/routeSix",
      },
    ],
  },
];

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["obtener"],
    queryFn: async () => {
      const userRepo = new UserRepositoryImp();
      const tokenStorageRepo = new TokenStorageRepositoryImp();

      const servicio = new UserService(userRepo, tokenStorageRepo);
      const reqProfile = await servicio.obteinProfile();
      const reqRoles = await servicio.getRoles();
      const reqPermissions = await servicio.getPermissions();

      useRolesStore.getState().setRoles(reqRoles.data || []);
      usePermissionsStore.getState().setPermissions(reqPermissions.data || []);
      return reqProfile;
    },
  });

  useEffect(() => {
    if (!isPending && (error || data.status !== "success")) {
      navigate("/login");
    }
  }, [error, data, isPending]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Cargando...asdasd
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Mi Aplicación</span>
              <span className="">v1.0.0</span>
            </div>
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarMenu>
              {menuContent.map((item, index) =>
                item.submenu ? (
                  <SidebarMenuItem key={index}>
                    <Collapsible className="w-full">
                      <CollapsibleTrigger className="w-full" asChild>
                        <SidebarMenuButton
                          isActive={location.pathname.startsWith("/personal")}
                          className={`font-medium ${
                            location.pathname.startsWith("/personal")
                              ? "relative after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:rounded-l-md after:bg-primary"
                              : ""
                          }`}
                        >
                          <UserPlus
                            className={`mr-2 ${
                              location.pathname.startsWith("/crearpersonal")
                                ? "text-primary"
                                : ""
                            }`}
                          />
                          {item.name}
                          <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="">
                          {item.submenu.map((item, index) => (
                            <SidebarMenuSubItem key={index}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === item.link}
                              >
                                <Link
                                  to={item.link || "#"}
                                  className="hover:[&>svg]:text-white data-[active=true]:[&>svg]:text-white"
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  {item.name}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.link}
                    >
                      <Link to={item.link || "#"} className="w-full">
                        <item.icon />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full">
        <header className="flex w-full h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) px-2">
          <SidebarTrigger className="cursor-pointer ml-2" />
          <Separator className="mx-2" orientation="vertical" />
          <UserCard
            name={data?.data?.username || ""}
            email={data?.data?.email || ""}
          />
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

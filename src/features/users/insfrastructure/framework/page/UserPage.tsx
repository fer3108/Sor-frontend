import { useQuery } from "@tanstack/react-query";
import { UserRepositoryImp } from "../../repositories/UserRepositoryImp";
import { UserService } from "@/features/users/application/UserService";
import { TokenStorageRepositoryImp } from "@/features/core/infrastructure/TokenStorageRepositoryImp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabUsers from "../components/TabUsers";
import TabPermissions from "../components/TabPermissions/TabPermissions";
import TabRoles from "../components/TabRoles/TabRoles";
import { LockIcon, ShieldIcon, UserCog2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePermissionsStore } from "@/features/core/infrastructure/stores/usePersmissionsStore";
import { useRolesStore } from "@/features/core/infrastructure/stores/useRolesStore";

export default function UserPage() {
  const { data, isPending } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["obtainUsers"],
    queryFn: async () => {
      const userRepo = new UserRepositoryImp();
      const tokenStorageRepo = new TokenStorageRepositoryImp();

      const userService = new UserService(userRepo, tokenStorageRepo);
      const respUsers = await userService.getUsers();
      return respUsers;
    },
  });

  useQuery({
    queryKey: ["obtainPermissions"],
    queryFn: async () => {
      const userRepo = new UserRepositoryImp();
      const tokenStorageRepo = new TokenStorageRepositoryImp();

      const servicio = new UserService(userRepo, tokenStorageRepo);
      const reqPermissions = await servicio.getPermissions();
      usePermissionsStore.getState().setPermissions(reqPermissions.data || []);
      return reqPermissions;
    },
    refetchOnWindowFocus: false,
  });

  useQuery({
    queryKey: ["obtainRoles"],
    queryFn: async () => {
      const userRepo = new UserRepositoryImp();
      const tokenStorageRepo = new TokenStorageRepositoryImp();

      const servicio = new UserService(userRepo, tokenStorageRepo);
      const reqRoles = await servicio.getRoles();
      useRolesStore.getState().setRoles(reqRoles.data || []);
      return reqRoles;
    },
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        {"==>> Cargando Usuarios <<=="}
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      <div>
        <h2 className="text-2xl font-bold">Gestion de Usuarios y Accesos</h2>
        <p className="text-gray-600 text-sm">
          Gestiona los usuarios, roles y permisos del sistema.
        </p>
      </div>
      <Separator className="my-2" />
      <Tabs defaultValue="users">
        <TabsList className="gap-6 h-fit py-2 px-7 bg-gray-100 w-full">
          <TabsTrigger value="users" className="text-lg px-7 cursor-pointer">
            <UserCog2Icon className="mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="roles" className="text-lg px-7 cursor-pointer">
            <ShieldIcon className="mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            className="text-lg px-7 cursor-pointer"
          >
            <LockIcon className="mr-2" />
            Permisos
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="users">
          <TabUsers dataTable={data?.data ?? []} />
        </TabsContent>
        <TabsContent value="roles">
          <TabRoles />
        </TabsContent>
        <TabsContent value="permissions">
          <TabPermissions />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import ModalNewUser from "../components/ModalNewUser";
import { DataTableUsers } from "../components/Table/data-table-users";
import { columnsUsers } from "../components/Table/columns-users";
import { useQuery } from "@tanstack/react-query";
import { UserRepositoryImp } from "../../repositories/UserRepositoryImp";
import { UserService } from "@/features/users/application/UserService";
import { TokenStorageRepositoryImp } from "@/features/core/infrastructure/TokenStorageRepositoryImp";

export default function UserPage() {
  const { data, isPending } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["getUsers"],
    queryFn: async () => {
      const userRepo = new UserRepositoryImp();
      const tokenStorageRepo = new TokenStorageRepositoryImp();

      const userService = new UserService(userRepo, tokenStorageRepo);
      const respUsers = await userService.getUsers();
      return respUsers;
    },
  });

  console.log("==> ", data);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        {"==>> Cargando Usuarios <<=="}
      </div>
    );
  }

  return (
    <div>
      <h2>User Page</h2>
      <ModalNewUser />
      <h2 className="text-2xl font-bold">Usuarios</h2>
      <div className="px-7">
        <DataTableUsers columns={columnsUsers} data={data?.data ?? []} />
      </div>
    </div>
  );
}

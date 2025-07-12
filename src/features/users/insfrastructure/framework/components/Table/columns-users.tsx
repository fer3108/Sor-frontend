import { Badge } from "@/components/ui/badge";
import type { UserEntity } from "@/features/users/domain/entities/UserEntity";
import type { ColumnDef } from "@tanstack/react-table";

export const columnsUsers: ColumnDef<UserEntity>[] = [
  {
    header: "N°",
    cell: ({ row }: { row: { index: number } }) => {
      return row.index + 1;
    },
  },
  { accessorKey: "username", header: "Nombre" },
  { accessorKey: "email", header: "Correo Electronico" },
  {
    header: "Estado",
    accessorKey: "active",
    cell: ({ getValue }) => {
      const isActive = getValue();
      return isActive ? (
        <Badge className="bg-green-600">Activo</Badge>
      ) : (
        <Badge variant={"destructive"}>Inactivo</Badge>
      );
    },
  },
  {
    header: "Rol del Usuario",
    cell: ({ row }) => {
      const roles = row.original.roles ?? [];
      const name = roles.map((role) => role.name).join(", ");
      return name;
    },
  },
  {
    header: "Permisos del Usuario",
    accessorKey: "permissionList",
    cell: ({ row }) => {
      const roles = row.original.roles ?? [];
      const permissions = roles.flatMap((role) => role.permissionList ?? []);
      return (
        <div>
          {permissions.map((p, index) => (
            <p key={index}>{p.name}</p>
          ))}
        </div>
      );
    },
  },
];

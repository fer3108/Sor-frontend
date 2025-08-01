import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PermissionEntity } from "@/features/users/domain/entities/PermissionEntity";
import type { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";

export const columnsPermissions = (
  onEdit?: (permission: PermissionEntity) => void,
  onDelete?: (permission: PermissionEntity) => void
): ColumnDef<PermissionEntity>[] => [
  {
    header: "N°",
    cell: ({ row }: { row: { index: number } }) => {
      return row.index + 1;
    },
  },
  { accessorKey: "name", header: "Nombre Permiso" },
  { accessorKey: "description", header: "Descripción" },
  {
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 w-full">
          <Badge variant={"outline"}>Crear</Badge>
          <Badge variant={"outline"}>Listar</Badge>
          <Badge variant={"outline"}>Actualizar</Badge>
          <Badge variant={"outline"}>Eliminar</Badge>
        </div>
      );
    },
  },
  {
    header: "Estado",
    accessorKey: "enabled",
    cell: ({ getValue }) => {
      const isActive = getValue();
      return isActive ? (
        <Badge className="bg-green-600 min-w-16">Activo</Badge>
      ) : (
        <Badge className="min-w-16" variant={"destructive"}>
          Inactivo
        </Badge>
      );
    },
  },
  {
    header: " ",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 w-fit">
          <Button
            variant="outline"
            size="icon"
            className="shadow-sm cursor-pointer"
            onClick={() => onEdit && onEdit(row.original)}
          >
            <PencilIcon className="text-green-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shadow-sm cursor-pointer"
            onClick={() => {
              onDelete && onDelete(row.original);
              console.log("Deleting permission:", row.original);
            }}
          >
            <Trash2Icon className="text-red-500" />
          </Button>
        </div>
      );
    },
  },
];

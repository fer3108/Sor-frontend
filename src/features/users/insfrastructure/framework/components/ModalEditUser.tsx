import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { usePermissionsStore } from "@/features/core/infrastructure/stores/usePersmissionsStore";
import { useRolesStore } from "@/features/core/infrastructure/stores/useRolesStore";
import type { UserEntity } from "@/features/users/domain/entities/UserEntity";
import { useForm } from "@tanstack/react-form";

export default function ModalEditUser({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: UserEntity | null;
}) {
  const rolesStore = useRolesStore((state) => state.roles);
  const permissionsStore = usePermissionsStore((state) => state.permissions);

  console.log("data", data);
  const form = useForm({
    defaultValues: {
      username: data?.username,
      email: data?.email,
      roles: data?.roles,
      permissions: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user information.
          </DialogDescription>
        </DialogHeader>
        {/* {data ? (
          <>
            <p>Username: {data.username}</p>
            <p>Email: {data.email}</p>
          </>
        ) : (
          ""
        )} */}
        <form action="" className="flex flex-col gap-4 w-full">
          <form.Field
            name="username"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="font-semibold">
                  Nombre de Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* {field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched && (
                    <span className="text-red-500 text-xs">
                      *{field.state.meta.errors[0]?.message}
                    </span>
                  )} */}
              </div>
            )}
          />

          <form.Field
            name="email"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="font-semibold">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Correo Electrónico"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* {field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched && (
                    <span className="text-red-500 text-xs">
                      *{field.state.meta.errors[0]?.message}
                    </span>
                  )} */}
              </div>
            )}
          />

          <div className=" max-w-full flex gap-1">
            <form.Field
              name="roles"
              children={(field) => (
                <div className="flex flex-col w-1/2 p-2 border border-gray-300 rounded">
                  <Label>Roles Asignados</Label>
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-2">
                    {rolesStore.map((role, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          defaultChecked={
                            role.name === field.state.value?.[0]?.name
                          }
                        />
                        <Label>{role.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />

            <form.Field
              name="permissions"
              children={(field) => (
                <div className="flex flex-col w-1/2 p-2 border border-gray-300 rounded">
                  <Label>Permisos Asignados</Label>
                  <Separator className="my-2" />
                  {rolesStore.map((role, index) => (
                    <div key={index}>
                      <Label>{role.name}</Label>
                      {/* <Checkbox
                      checked={role.name === field.state.value?.[0]?.name}
                    /> */}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

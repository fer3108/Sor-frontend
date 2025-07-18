import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { newUserSchema } from "../../user.controller";
import { Toast } from "@/components/ui/toast";
import { UserRepositoryImp } from "../../repositories/UserRepositoryImp";

import { TokenStorageRepositoryImp } from "@/features/core/infrastructure/TokenStorageRepositoryImp";
import { UserService } from "@/features/users/application/UserService";
import type { ApiResponseDto } from "../../dtos/ApiResponseDto";

export default function ModalNewUser({
  onUserCreated,
}: {
  onUserCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [responseApi, setResponseApi] = useState<ApiResponseDto>();

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setShowToast(false);
    }
  };

  const form = useForm({
    defaultValues: { username: "", email: "", password: "", roles: [""] },
    validators: {
      onChange: newUserSchema,
    },
    onSubmit: async ({ value }) => {
      const userRepo = new UserRepositoryImp();
      const tokenStorageRepo = new TokenStorageRepositoryImp();
      const servicio = new UserService(userRepo, tokenStorageRepo);
      const respServicio = await servicio.createUser(value);
      console.log("modal ", respServicio);
      setResponseApi(respServicio);
      console.log("modal state", respServicio);
      setShowToast(true);
      if (respServicio.status === "success") {
        onUserCreated();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
            setOpen(true);
          }}
        >
          Crear Usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Usuario</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          noValidate
        >
          <div className="grid gap-4">
            <form.Field
              name="username"
              children={(field) => (
                <>
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
                  {field.state.meta.errors.length > 0 &&
                    field.state.meta.isTouched && (
                      <span className="text-red-500 text-xs">
                        *{field.state.meta.errors[0]?.message}
                      </span>
                    )}
                </>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <>
                  <Label htmlFor="email" className="font-semibold">
                    Correo Electronico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Correo Electronico"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 &&
                    field.state.meta.isTouched && (
                      <span className="text-red-500 text-xs">
                        *{field.state.meta.errors[0]?.message}
                      </span>
                    )}
                </>
              )}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="roles" className="font-semibold">
              Rol del Usuario
            </Label>
            <form.Field
              name="roles"
              children={(field) => (
                <>
                  <Select
                    onValueChange={(value) =>
                      field.setValue([value.toUpperCase()])
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="USER">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 &&
                    (field.state.meta.isTouched || form.state.isSubmitted) && (
                      <span className="text-red-500 text-xs">
                        *{field.state.meta.errors[0]?.message}
                      </span>
                    )}
                </>
              )}
            />
          </div>
          <Separator className="my-2" />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || showToast}>
                  {isSubmitting ? "Creando" : "Save changes"}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
        {showToast && responseApi && (
          <Toast
            message={responseApi.message}
            variant={responseApi.status === "success" ? "success" : "error"}
            duration={3000}
            onClose={() => {
              setShowToast(false);
              setOpen(responseApi.status === "success" ? false : true);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

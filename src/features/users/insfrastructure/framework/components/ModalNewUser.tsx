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
import { defaultUserValues, newUserSchema } from "../../user.controller";
import { Toast } from "@/components/ui/toast";
import { UserRepositoryImpl } from "../../user.repositoryImpl";

import type { ApiResponse } from "@/shared/dtos/api-response.dto";
import type { User } from "@/features/users/domain/user.entity";
import { UserService } from "@/features/users/application/user.service";

export default function ModalNewUser() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [responseApi, setResponseApi] = useState<ApiResponse<User>>();

  const handleFormSubmit = async ({ value }: any) => {
    const repo = new UserRepositoryImpl();
    const useCase = new UserService(repo);
    const result = await useCase.createUser(value);

    if (!result) {
      setResponseApi({ success: false, message: "algo salio mal" });
    }
    setResponseApi(result);
    console.log("Form submitted with values:", value);
    setShowToast(true);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setShowToast(false);
    }
  };

  const form = useForm({
    defaultValues: defaultUserValues,
    validators: { onChange: newUserSchema },
    onSubmit: handleFormSubmit,
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
            form.handleSubmit();
          }}
          autoComplete="off"
        >
          <div className="grid gap-3">
            <Label htmlFor="email">Correo Electronico</Label>
            <form.Field
              name="email"
              children={(field) => (
                <>
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
            <Label htmlFor="username-1">Rol del Usuario</Label>
            <form.Field
              name="role"
              children={(field) => (
                <>
                  <Select onValueChange={field.handleChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
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
            variant={responseApi.success ? "success" : "error"}
            duration={3000}
            onClose={() => {
              setShowToast(false);
              setOpen(responseApi.success ? false : true);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useRolesStore } from "@/features/core/infrastructure/stores/useRolesStore";

export default function TabRoles() {
  const rolesStore = useRolesStore((state) => state.roles);
  console.log("Roles Store:", rolesStore);
  return (
    <div className="w-full p-2 flex flex-col">
      <h2 className="text-2xl font-bold">Roles</h2>
      <p className="text-gray-600 text-sm">
        Aquí se gestionan los roles de los usuarios.
      </p>
      {/* Aquí puedes agregar más contenido relacionado con roles */}
    </div>
  );
}

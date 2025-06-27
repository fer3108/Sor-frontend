import { data } from "@/data/data";
import ModalNewUser from "./components/ModalNewUser";
import { columnsUsers } from "./components/Table/columns-users";
import { DataTableUsers } from "./components/Table/data-table-users";

export default function UserPage() {
  return (
    <div>
      <h2>User Page</h2>
      <ModalNewUser />
      <h2 className="text-2xl font-bold">Usuarios</h2>
      <DataTableUsers columns={columnsUsers} data={data} />
    </div>
  );
}

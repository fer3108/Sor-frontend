import type { UserEntity } from "@/features/users/domain/entities/UserEntity";
import ModalNewUser from "./ModalNewUser";
import { columnsUsers } from "./Table/columns-users";
import { DataTableUsers } from "./Table/data-table-users";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";

export default function TabUsers({
  dataTable,
  refreshTable,
}: {
  dataTable: any;
  refreshTable: () => void;
}) {
  const [editUser, setEditUser] = useState<UserEntity | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const columns = columnsUsers((user: UserEntity) => {
    setEditUser(user);
    setOpenEdit(true);
  });

  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div>
        <ModalNewUser onUserCreated={refreshTable} />
      </div>
      <DataTableUsers columns={columns} data={dataTable} />
      <ModalEditUser
        open={openEdit}
        onOpenChange={setOpenEdit}
        data={editUser}
      />
    </div>
  );
}

export type NewUserFormEntity = {
  username: string;
  email: string;
  password: string;
  roles: string[]; // <- Esto es importante
};

import { api } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export const getUsers = async () => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

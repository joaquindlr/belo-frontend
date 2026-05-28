import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUsers } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";

interface UserFilterProps {
  value?: string;
  onChange: (userId: string | undefined) => void;
}

function UserFilter({ value, onChange }: UserFilterProps) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <Select
      value={value || "All"}
      onValueChange={(val) => onChange(val === "All" ? undefined : val)}
    >
      <SelectTrigger className="w-full max-w-64 bg-zinc-700 text-zinc-50 border-zinc-600">
        <SelectValue
          placeholder={
            isLoading ? "Cargando usuarios..." : "Seleccionar usuario"
          }
        />
      </SelectTrigger>
      <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600 ">
        <SelectGroup>
          <SelectItem value="All">Todos los usuarios</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default UserFilter;

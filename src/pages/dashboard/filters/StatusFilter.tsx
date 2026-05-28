import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
  value?: string;
  onChange: (status: string | undefined) => void;
}

function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select value={value || "All"} onValueChange={(val) => onChange(val === "All" ? undefined : val)}>
      <SelectTrigger className="w-full max-w-48 bg-zinc-700 text-zinc-50 border-zinc-600">
        <SelectValue placeholder="Seleccionar estado" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600 ">
        <SelectGroup>
          <SelectItem value="All">Todos</SelectItem>
          <SelectItem value="pending">Pendiente</SelectItem>
          <SelectItem value="confirmed">Confirmada</SelectItem>
          <SelectItem value="rejected">Rechazada</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default StatusFilter;

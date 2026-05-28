import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function StatusFilter() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48 bg-zinc-700 text-zinc-50 border-zinc-600">
        <SelectValue placeholder="Seleccionar estado" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600 ">
        <SelectGroup>
          <SelectItem value="All">Todos</SelectItem>
          <SelectItem value="Pending">Pendiente</SelectItem>
          <SelectItem value="Confirmed">Confirmada</SelectItem>
          <SelectItem value="Rejected">Rechazada</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default StatusFilter;

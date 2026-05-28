import { useOperator } from "@/hooks/useOperator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Header() {
  const { activeOperatorId, setActiveOperatorId, operators } = useOperator();
  return (
    <header className="h-16 bg-zinc-950 text-zinc-50 flex items-center px-6 border-b border-zinc-800">
      <div className="flex items-center gap-3 justify-between w-full">
        <h2 className="text-lg font-semibold text-zinc-50">Panel de Control</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-300 w-48">
            Operador Activo:
          </span>
          <Select value={activeOperatorId} onValueChange={setActiveOperatorId}>
            <SelectTrigger className="w-full max-w-64 bg-zinc-700 text-zinc-50 border-zinc-600">
              <SelectValue placeholder="Seleccionar operador" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600 ">
              {operators.map((op) => (
                <SelectItem
                  key={op.id}
                  value={op.id}
                  className="cursor-pointer"
                >
                  {op.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}

export default Header;

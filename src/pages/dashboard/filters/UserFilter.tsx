import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UserFilter() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-64 bg-zinc-700 text-zinc-50 border-zinc-600">
        <SelectValue placeholder="Seleccionar usuario" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600 ">
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default UserFilter;

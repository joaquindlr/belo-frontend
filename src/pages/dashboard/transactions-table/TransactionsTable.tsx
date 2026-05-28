import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactions } from "@/services/transactions.service";

interface TransactionsTableProps {
  userId?: string;
  status?: string;
  page: number;
  onPageChange: (page: number) => void;
}

const statusMap = {
  pending: {
    label: "Pendiente",
    variant: "outline" as const,
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  confirmed: {
    label: "Confirmada",
    variant: "outline" as const,
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  rejected: {
    label: "Rechazada",
    variant: "outline" as const,
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

function TransactionsTable({
  userId,
  status,
  page,
  onPageChange,
}: TransactionsTableProps) {
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", { userId, status, page, limit }],
    queryFn: () => getTransactions({ userId, status, page, limit }),
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-zinc-50 font-semibold border-b border-zinc-300">
          <TableHead>Fecha</TableHead>
          <TableHead>Origen</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b border-zinc-800">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i} className="border-b border-zinc-700">
              <TableCell>
                <Skeleton className="h-4 w-24 bg-zinc-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 bg-zinc-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 bg-zinc-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 bg-zinc-700" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto bg-zinc-700" />
              </TableCell>
            </TableRow>
          ))
        ) : data?.data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
              No se encontraron transacciones
            </TableCell>
          </TableRow>
        ) : (
          data?.data.map((transaction) => {
            const statusConfig = statusMap[transaction.status];
            return (
              <TableRow
                key={transaction.id}
                className="text-zinc-300 border-b border-zinc-700"
              >
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell>{transaction.sender.name}</TableCell>
                <TableCell>{transaction.receiver.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig.variant}
                    className={statusConfig.className}
                  >
                    {statusConfig.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-zinc-50">
                  ${transaction.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
      <TableFooter className="bg-transparent text-zinc-50">
        <TableRow className="border-none hover:bg-transparent">
          <TableCell colSpan={5} className="py-4">
            <div className="flex w-full justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TransactionsTable;

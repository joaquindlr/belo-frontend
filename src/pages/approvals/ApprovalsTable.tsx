import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import Pagination from "../dashboard/transactions-table/Pagination";
import {
  getTransactions,
  approveTransaction,
  rejectTransaction,
} from "@/services/transactions.service";

interface ApprovalsTableProps {
  page: number;
  onPageChange: (page: number) => void;
}

export default function ApprovalsTable({
  page,
  onPageChange,
}: ApprovalsTableProps) {
  const limit = 10;
  const queryClient = useQueryClient();

  const [rejectingTxId, setRejectingTxId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", { status: "pending", page, limit }],
    queryFn: () => getTransactions({ status: "pending", page, limit }),
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const approveMutation = useMutation({
    mutationFn: approveTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Transacción aprobada correctamente.");
    },
    onError: () => {
      toast.error("Error al aprobar la transacción.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Transacción rechazada correctamente.");
      setRejectingTxId(null);
      setRejectReason("");
    },
    onError: () => {
      toast.error("Error al rechazar la transacción.");
    },
  });

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      toast.error("El motivo de rechazo es obligatorio.");
      return;
    }
    if (rejectingTxId) {
      rejectMutation.mutate({ id: rejectingTxId, reason: rejectReason });
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-zinc-50 font-semibold border-b border-zinc-300">
            <TableHead>Fecha</TableHead>
            <TableHead>Origen</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead className="text-center w-[120px]">Acciones</TableHead>
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
                <TableCell>
                  <Skeleton className="h-8 w-20 bg-zinc-700 mx-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                No hay transacciones pendientes de aprobación
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((transaction) => (
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
                    variant="outline"
                    className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  >
                    Pendiente
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-zinc-50">
                  ${transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-400"
                      onClick={() => approveMutation.mutate(transaction.id)}
                      disabled={
                        approveMutation.isPending || rejectMutation.isPending
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 hover:text-red-400"
                      onClick={() => setRejectingTxId(transaction.id)}
                      disabled={
                        approveMutation.isPending || rejectMutation.isPending
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter className="bg-transparent text-zinc-50">
          <TableRow className="border-none hover:bg-transparent">
            <TableCell colSpan={6} className="py-4">
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

      <Dialog
        open={!!rejectingTxId}
        onOpenChange={(open) => !open && setRejectingTxId(null)}
      >
        <DialogContent className="bg-zinc-800 text-zinc-50 border-zinc-700 sm:max-w-md ring-zinc-700">
          <DialogHeader>
            <DialogTitle>Rechazar Transacción</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Por favor, ingrese el motivo del rechazo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Escriba el motivo aquí..."
              className="bg-zinc-700 text-zinc-50 border-zinc-600 focus-visible:ring-zinc-500"
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setRejectingTxId(null)}
              className="bg-transparent text-zinc-300 border-zinc-600 hover:bg-zinc-700 hover:text-zinc-50"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleRejectConfirm}
              disabled={rejectMutation.isPending}
              className="bg-red-600 text-zinc-50 hover:bg-red-700 border-none"
            >
              Confirmar Rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

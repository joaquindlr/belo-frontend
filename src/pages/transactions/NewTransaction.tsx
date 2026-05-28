import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUsers } from "@/services/users.services";
import { createTransaction } from "@/services/transactions.service";

const transactionSchema = z
  .object({
    senderId: z.string().min(1, "La cuenta origen es requerida"),
    receiverId: z.string().min(1, "La cuenta destino es requerida"),
    amount: z.number().positive("El monto debe ser mayor a 0"),
  })
  .refine((data) => data.senderId !== data.receiverId, {
    message: "La cuenta origen y destino no pueden ser la misma",
    path: ["receiverId"],
  });

type TransactionFormValues = z.infer<typeof transactionSchema>;

function NewTransaction() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      senderId: "",
      receiverId: "",
      amount: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      reset();

      if (data.status === "confirmed") {
        toast.success("Transacción exitosa", {
          description: `Se han transferido $${data.amount} correctamente.`,
        });
      } else {
        toast.warning("Transacción retenida", {
          description: `El monto de $${data.amount} supera el límite de $50,000 y requiere aprobación manual.`,
        });
      }
      navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response?.status === 422) {
        toast.error("Transacción rechazada", {
          description:
            "Saldo insuficiente en la cuenta o posee fondos retenidos. Verifique las transacciones pendientes y el saldo e intente nuevamente.",
        });
      } else {
        toast.error("Error al procesar", {
          description: "Hubo un problema al intentar crear la transacción.",
        });
      }
    },
  });

  const onSubmit = (data: TransactionFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-full bg-zinc-950 flex items-center flex-col justify-center">
      <Card className="bg-zinc-800 ring-zinc-700 w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-zinc-50 text-xl text-center">
            Nueva Transacción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Cuenta Origen
              </label>
              <Controller
                name="senderId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-zinc-700 text-zinc-50 border-zinc-600">
                      <SelectValue
                        placeholder={
                          isLoadingUsers ? "Cargando..." : "Seleccionar origen"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600">
                      <SelectGroup>
                        {users?.map((user) => (
                          <SelectItem key={`sender-${user.id}`} value={user.id}>
                            {user.name} - ${user.balance}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.senderId && (
                <p className="text-sm text-red-500">
                  {errors.senderId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Cuenta Destino
              </label>
              <Controller
                name="receiverId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-zinc-700 text-zinc-50 border-zinc-600">
                      <SelectValue
                        placeholder={
                          isLoadingUsers ? "Cargando..." : "Seleccionar destino"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 text-zinc-50 ring-zinc-600">
                      <SelectGroup>
                        {users?.map((user) => (
                          <SelectItem
                            key={`receiver-${user.id}`}
                            value={user.id}
                          >
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.receiverId && (
                <p className="text-sm text-red-500">
                  {errors.receiverId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Monto</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-zinc-700 text-zinc-50 border-zinc-600"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <Button
              variant="outline"
              type="submit"
              className="w-full bg-zinc-600 text-zinc-50 border-zinc-500 hover:bg-zinc-500"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Procesando..." : "Transferir"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewTransaction;

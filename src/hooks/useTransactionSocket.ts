import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wsUrlBase } from "@/config/config";

export function useTransactionSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      ws = new WebSocket(wsUrlBase + "/ws/transactions");

      ws.onopen = () => {
        console.log(
          `WebSocket conectado exitosamente a ${wsUrlBase}/ws/transactions`,
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "TRANSACTION_UPDATED") {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });

            toast.info("Se actualizó una transacción", {
              description: `La transacción ${data.payload.id} cambió al estado ${data.payload.status}.`,
            });
          }
        } catch (error) {
          console.error("Error parseando mensaje WS:", error);
        }
      };

      ws.onclose = (event) => {
        console.log(
          `WebSocket cerrado con el codigo: ${event.code} y motivo: ${event.reason}. Reintentando en 3s...`,
        );
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error("Error en el WebSocket:", error);
      };
    };

    connect();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (ws) {
        ws.onclose = null;
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      }
    };
  }, [queryClient]);
}

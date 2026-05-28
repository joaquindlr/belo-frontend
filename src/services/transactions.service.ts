import { api, PaginatedResponse } from "@/lib/api";

export interface Transaction {
  id: string;
  amount: number;
  status: "pending" | "confirmed" | "rejected";
  date: string;
  rejectReason: string | null;
  sender: {
    id: string;
    name: string;
  };
  receiver: {
    id: string;
    name: string;
  };
}

export const getTransactions = async (params: {
  userId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const { data } = await api.get<PaginatedResponse<Transaction>>(
    "/transactions",
    {
      params,
    },
  );
  return data;
};

export const createTransaction = async (data: {
  senderId: string;
  receiverId: string;
  amount: number;
}) => {
  const response = await api.post<Transaction>("/transactions", data);
  return response.data;
};

export const approveTransaction = async (id: string) => {
  const { data } = await api.patch<Transaction>(`/transactions/${id}/approve`);
  return data;
};

export const rejectTransaction = async (data: { id: string; reason: string }) => {
  const response = await api.patch<Transaction>(`/transactions/${data.id}/reject`, {
    reason: data.reason,
  });
  return response.data;
};

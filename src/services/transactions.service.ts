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

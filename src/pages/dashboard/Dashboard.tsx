import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";

import UserFilter from "./filters/UserFilter";
import StatusFilter from "./filters/StatusFilter";
import TransactionsTable from "./transactions-table/TransactionsTable";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const userId = searchParams.get("userId") || undefined;
  const status = searchParams.get("status") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const handleFilterChange = (key: string, value: string | undefined) => {
    setSearchParams((prev) => {
      if (value && value !== "All") {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  return (
    <div className="h-full bg-zinc-950 flex items-center flex-col">
      <h3 className="text-lg font-semibold text-zinc-50 tracking-tight w-8/12 mt-6">
        Transacciones de usuarios
      </h3>
      <Card className="mt-6 bg-zinc-800 ring-zinc-700  w-8/12">
        <CardContent>
          <div className="flex items-center gap-4">
            <UserFilter
              value={userId}
              onChange={(val) => handleFilterChange("userId", val)}
            />
            <StatusFilter
              value={status}
              onChange={(val) => handleFilterChange("status", val)}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 bg-zinc-800 ring-zinc-700 w-8/12">
        <CardContent>
          <TransactionsTable
            userId={userId}
            status={status}
            page={page}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

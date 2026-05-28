import { Card, CardContent } from "@/components/ui/card";

import UserFilter from "./filters/UserFilter";
import StatusFilter from "./filters/StatusFilter";
import TransactionsTable from "./transactions-table/TransactionsTable";

function Dashboard() {
  return (
    <div className="h-full bg-zinc-950 flex items-center flex-col">
      <h3 className="text-lg font-semibold text-zinc-50 tracking-tight w-6/12 mt-6">
        Transacciones de usuarios
      </h3>
      <Card className="mt-6 bg-zinc-800 ring-zinc-700  w-6/12">
        <CardContent>
          <div className="flex items-center gap-4">
            <UserFilter />
            <StatusFilter />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 bg-zinc-800 ring-zinc-700 w-6/12">
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

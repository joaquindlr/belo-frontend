import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ApprovalsTable from "./ApprovalsTable";

function Approvals() {
  const [page, setPage] = useState(1);

  return (
    <div className="h-full bg-zinc-950 flex items-center flex-col">
      <h3 className="text-lg font-semibold text-zinc-50 tracking-tight w-8/12 mt-6">
        Panel de Aprobaciones
      </h3>
      <Card className="mt-6 bg-zinc-800 ring-zinc-700 w-8/12">
        <CardContent className="pt-6">
          <ApprovalsTable page={page} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Approvals;

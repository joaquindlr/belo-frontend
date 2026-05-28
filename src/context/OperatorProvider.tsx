import { setAuthHeader } from "@/lib/api";
import { useEffect, useState } from "react";
import { OperatorContext, OPERATOS_MOCK } from "./OperatorContext";

export function OperatorProvider({ children }: { children: React.ReactNode }) {
  const [activeOperatorId, setActiveOperatorId] = useState<string>(
    OPERATOS_MOCK[0].id,
  );

  useEffect(() => {
    setAuthHeader(activeOperatorId);
  }, [activeOperatorId]);

  return (
    <OperatorContext.Provider
      value={{
        operators: OPERATOS_MOCK,
        activeOperatorId,
        setActiveOperatorId,
      }}
    >
      {children}
    </OperatorContext.Provider>
  );
}

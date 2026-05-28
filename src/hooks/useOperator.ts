import { OperatorContext } from "@/context/OperatorContext";
import { useContext } from "react";

export function useOperator() {
  const context = useContext(OperatorContext);
  if (!context) {
    throw new Error("useOperator must be used within an OperatorProvider");
  }
  return context;
}

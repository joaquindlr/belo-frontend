import { createContext } from "react";

type Operator = { id: string; name: string };

export const OPERATOS_MOCK: Operator[] = [
  { id: "xxxx-xxxx-xxxx-xxx1", name: "Admin (Juan)" },
  { id: "xxxx-xxxx-xxxx-xxx2", name: "Operator 1 (María)" },
  { id: "xxxx-xxxx-xxxx-xxx3", name: "Operator 2 (Pedro)" },
];

interface OperatorContextType {
  operators: Operator[];
  activeOperatorId: string;
  setActiveOperatorId: (id: string) => void;
}

const initialContextValue: OperatorContextType = {
  operators: OPERATOS_MOCK,
  activeOperatorId: OPERATOS_MOCK[0].id,
  setActiveOperatorId: () => {},
};

export const OperatorContext =
  createContext<OperatorContextType>(initialContextValue);

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import NewTransaction from "./pages/transactions/NewTransaction";
import Approvals from "./pages/approvals/Approvals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="transacciones/nueva"
            element={<NewTransaction />}
          />

          <Route
            path="aprobaciones"
            element={<Approvals />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

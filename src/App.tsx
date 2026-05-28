import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import NewTransaction from "./pages/transactions/NewTransaction";

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
            element={<div>Menu de aprobaciones</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="transacciones/nueva"
            element={<div>Crear transaccion</div>}
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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<div>Dashboard</div>} />

          <Route
            path="transactions/new"
            element={<div>Crear transaccion</div>}
          />

          <Route path="approvals" element={<div>Menu de aprobaciones</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

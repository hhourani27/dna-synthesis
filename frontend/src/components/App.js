import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import MachinesListPage from "./machine/MachineListPage";
import MachinePage from "./machine/MachinePage";

export default function MiniDrawer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="machines" element={<MachinesListPage />} />
          <Route path="machines/:id" element={<MachinePage />} />
          <Route index element={<Navigate to="/machines" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

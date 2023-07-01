import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import MachinesListPage from "./MachinesListPage";

export default function MiniDrawer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="machines" element={<MachinesListPage />} />
          <Route index element={<Navigate to="/machines" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

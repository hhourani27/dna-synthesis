import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import MachinesListPage from "./machine/MachineListPage";
import MachinePage from "./machine/MachinePage";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function App() {
  const [machines, setMachines] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let response = await fetch(`http://localhost:3001/machines`);
      const machines = await response.json();
      response = await fetch(`http://localhost:3001/models`);
      const models = await response.json();

      setMachines(machines);
      setModels(models);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="machines"
              element={<MachinesListPage machines={machines} />}
            />
            <Route
              path="machines/:id"
              element={<MachinePage machines={machines} models={models} />}
            />
            <Route index element={<Navigate to="/machines" />} />
          </Route>
        </Routes>
      )}{" "}
    </BrowserRouter>
  );
}

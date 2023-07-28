import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import MachinesListPage from "./machine/MachineListPage";
import MachinePage from "./machine/MachinePage";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ws = new WebSocket("ws://localhost:3001/cable");

export default function App() {
  const [machines, setMachines] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [guid, setGuid] = useState("");

  ws.onopen = () => {
    console.log("Connected to websocket server");
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MachinesChannel",
        }),
      })
    );
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    // console.dir(data);
    if (data.type === "ping") {
      // console.log("Received ping message");
      return;
    }
    if (data.type === "welcome") {
      // console.log("Received welcome message");
      return;
    }
    if (data.type === "confirm_subscription") {
      // console.log("Received confirm_subscription message");
      return;
    }

    const message = data.message;
    console.log(`Received another message : type: ${message.type}`);
    if (message.type === "Machine updated") {
      const updatedMachine = message.payload;
      setMachines((machines) => {
        const updatedMachineIdx = machines.findIndex(
          (m) => m.id === message.id
        );

        if (updatedMachineIdx !== -1) {
          console.log(`[WebSocket] Update state of Machine ${message.id}`);
          return machines.map((m, idx) =>
            idx === updatedMachineIdx ? updatedMachine : m
          );
        } else {
          console.error(
            `[Websocket] Received a "Machine update" message, but couldn't find Machine with id ${message.id}`
          );
          return machines;
        }
      });
    }
  };

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

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

import Layout from "./layout/Layout";
import MachinesListPage from "./machine/MachineListPage";
import MachinePage from "./machine/MachinePage";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const WEBSOCKET_URL = "ws://localhost:3001/cable";

export default function App() {
  const [machines, setMachines] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [guid, setGuid] = useState(Math.random().toString(36).substring(2, 15));

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
    WEBSOCKET_URL,
    {
      onOpen: subscribeToChannel,
    }
  );

  function subscribeToChannel() {
    sendMessage(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MachinesChannel",
        }),
      })
    );
  }

  function handleWebSocketMessage(message) {
    if (message.type === "Machine updated") {
      const updatedMachine = message.payload;
      const updatedMachineIdx = machines.findIndex((m) => m.id === message.id);

      if (updatedMachineIdx !== -1) {
        setMachines((machines) => {
          console.log(`[WebSocket] Update state of Machine ${message.id}`);
          return machines.map((m, idx) =>
            idx === updatedMachineIdx ? updatedMachine : m
          );
        });
      } else {
        console.error(
          `[Websocket] Received a "Machine update" message, but couldn't find Machine with id ${message.id}`
        );
      }
    }
  }

  // At initial render, retrieve all data and set global state
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

  // Update global state for every new websocket message
  useEffect(() => {
    if (lastJsonMessage !== null) {
      // Rails periodically sends messages of the format data: {type: "ping|welcome|confirm_subscription"} <= Ignore them
      if ("type" in lastJsonMessage) {
        switch (lastJsonMessage.type) {
          case "ping":
            return;
          case "welcome":
            return;
          case "confirm_subscription":
            console.log(
              `Received message to confirm subscription to channel ${
                JSON.parse(lastJsonMessage.identifier).channel
              }`
            );
            console.dir(lastJsonMessage);
            return;
          default:
            console.error(
              `Received message un unknown type from Rails: ${lastJsonMessage.type}`
            );
            return;
        }
      }

      const message = lastJsonMessage.message;
      console.log(`Received message : type: ${message.type}`);
      handleWebSocketMessage(message);
    }
  }, [lastJsonMessage]);

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

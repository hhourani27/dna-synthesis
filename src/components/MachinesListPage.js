import { useState, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";

import MachinesTable from "./MachinesTable";

export default function MachinesListPage() {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3001/machines")
      .then((resp) => resp.json())
      .then((data) => {
        setMachines(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <MachinesTable machines={machines} />
      )}
    </div>
  );
}

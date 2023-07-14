import { useState, useEffect } from "react";

import Card from "../layout/Card";

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
      <Card sx={{ flexGrow: "1" }} isLoading={isLoading}>
        <MachinesTable machines={machines} />
      </Card>
    </div>
  );
}

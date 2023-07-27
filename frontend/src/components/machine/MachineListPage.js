import Card from "../layout/Card";

import MachinesTable from "./MachinesTable";

export default function MachinesListPage({ machines }) {
  return (
    <div>
      <Card sx={{ flexGrow: "1" }} isLoading={false}>
        <MachinesTable machines={machines} />
      </Card>
    </div>
  );
}

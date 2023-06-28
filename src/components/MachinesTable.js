import Table from "react-bootstrap/Table";

export default function MachinesTable({ machines }) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Model</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {machines.map((m) => (
          <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.model}</td>
            <td>{m.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

import { useParams } from "react-router-dom";

export default function MachinePage() {
  const { id } = useParams();
  return <div>MachinePage {id}</div>;
}

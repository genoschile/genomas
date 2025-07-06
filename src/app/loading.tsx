import { LiaDnaSolid } from "react-icons/lia";
import "./loading.css";

export default function Loading() {
  return (
    <div className={"loading-container"}>
      <LiaDnaSolid className={"loading-dna"} size={60} />
    </div>
  );
}

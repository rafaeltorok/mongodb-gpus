import { useContext } from "react";
import GpuTable from "./GpuTable/GpuTable";
import GpuContext from "../GpuContext";

export default function GpuList() {
  const { gpus, searchTerm } = useContext(GpuContext);

  const checkTerm = (text) => {
    return text.toLowerCase().includes(searchTerm.trimStart().toLowerCase());
  };

  return (
    <div>
      {gpus
        .filter(
          (gpu) =>
            checkTerm(gpu.manufacturer) ||
            checkTerm(gpu.gpuline) ||
            checkTerm(gpu.model),
        )
        .map((gpu) => {
          return <GpuTable gpu={gpu} key={gpu._id} />;
        })}
    </div>
  );
}

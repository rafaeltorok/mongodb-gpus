import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Utils
import calculatePerformance from "../utils/calculatePerformance";
import getManufacturerClass from "../utils/getManufacturerClass";

// Components
import GpuRow from "./GpuRow";
import GpuDivision from "./GpuDivision";

export default function Gpu({ gpu }) {
  const performance = calculatePerformance(gpu);
  const manufacturerName = getManufacturerClass(gpu);
  const vramToDisplay = gpu.vram < 1 ? `${gpu.vram * 1000}MB` : `${gpu.vram}GB`;

  return (
    <div>
      <TableContainer className="gpu-table">
        <Table aria-label="gpus table" className={manufacturerName}>
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                colSpan={2}
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#222",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  padding: "1rem",
                }}
              >
                {gpu.manufacturer} {gpu.gpuline} {gpu.model}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <GpuDivision title={"SPECIFICATIONS"} />
            <GpuRow header={"CORES"} data={String(gpu.cores)} />
            <GpuRow header={"TMUs"} data={String(gpu.tmus)} />
            <GpuRow header={"ROPs"} data={String(gpu.rops)} />
            <GpuRow header={"VRAM"} data={`${vramToDisplay} ${gpu.memtype}`} />
            <GpuRow header={"BUS WIDTH"} data={`${String(gpu.bus)} bit`} />

            <GpuDivision title={"CLOCK SPEEDS"} />
            <GpuRow header={"BASE CLOCK"} data={`${String(gpu.baseclock)} MHz`} />
            <GpuRow header={"BOOST CLOCK"} data={`${String(gpu.boostclock)} MHz`} />
            <GpuRow header={"MEMORY CLOCK"} data={`${String(gpu.memclock)} Gbps effective`} />

            <GpuDivision title={"THEORETICAL PERFORMANCE"} />
            <GpuRow header={"FP32(float)"} data={performance[0]} />
            <GpuRow header={"TEXTURE RATE"} data={performance[1]} />
            <GpuRow header={"PIXEL RATE"} data={performance[2]} />
            <GpuRow header={"BANDWIDTH"} data={performance[3]} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

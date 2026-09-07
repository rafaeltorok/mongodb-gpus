// React
import { useState } from "react";

// Material UI
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
import EditableRow from "./EditableRow";

export default function Gpu({ gpu }) {
  const [calculateMode, setCalculateMode] = useState(false);
  const [gpuData, setGpuData] = useState(gpu);
  const [editedBoostClock, setEditedBoostClock] = useState(gpu.boostclock);
  const [editedMemClock, setEditedMemClock] = useState(gpu.memclock);

  // Calculate the theoretical performance
  const performance = calculatePerformance(gpuData);

  // Get the manufacturer name to match the class with the manufacturer's color scheme
  const manufacturerName = getManufacturerClass(gpu);

  // Format the VRAM amount in either MB or GB
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
                {gpuData.manufacturer} {gpuData.gpuline} {gpuData.model}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <GpuDivision title={"SPECIFICATIONS"} />
            <GpuRow header={"CORES"} data={String(gpuData.cores)} />
            <GpuRow header={"TMUs"} data={String(gpuData.tmus)} />
            <GpuRow header={"ROPs"} data={String(gpuData.rops)} />
            <GpuRow header={"VRAM"} data={`${vramToDisplay} ${gpuData.memtype}`} />
            <GpuRow header={"BUS WIDTH"} data={`${String(gpuData.bus)} bit`} />

            <GpuDivision title={"CLOCK SPEEDS"} />
            <GpuRow header={"BASE CLOCK"} data={`${String(gpuData.baseclock)} MHz`} />
            {calculateMode ? (
              <>
                <EditableRow header={"BOOST CLOCK"} data={editedBoostClock} setData={setEditedBoostClock} />
                <EditableRow header={"MEMORY CLOCK"} data={editedMemClock} setData={setEditedMemClock} />
              </>
            ) : (
              <>
                <GpuRow header={"BOOST CLOCK"} data={`${String(gpuData.boostclock)} MHz`} />
                <GpuRow header={"MEMORY CLOCK"} data={`${String(gpuData.memclock)} Gbps effective`} />
              </>
            )}

            <GpuDivision title={"THEORETICAL PERFORMANCE"} />
            <GpuRow header={"FP32(float)"} data={performance[0]} />
            <GpuRow header={"TEXTURE RATE"} data={performance[1]} />
            <GpuRow header={"PIXEL RATE"} data={performance[2]} />
            <GpuRow header={"BANDWIDTH"} data={performance[3]} />
          </TableBody>
        </Table>

        {calculateMode ? (
          <div className="table-controls">
            <button
              onClick={() => {
                setGpuData({ ...gpuData, boostclock: editedBoostClock, memclock: editedMemClock });
                setCalculateMode(false);
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setEditedBoostClock(gpuData.boostclock);
                setEditedMemClock(gpuData.memclock);
                setCalculateMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="table-controls">
            <button
              onClick={() => setCalculateMode(true)}
            >
              Calculate
            </button>
            <button
              onClick={() => {
                setGpuData(gpu);
                setEditedBoostClock(gpu.boostclock);
                setEditedMemClock(gpu.memclock);
                setCalculateMode(false);
              }}
            >
              Reset
            </button>
          </div>
        )}
      </TableContainer>
    </div>
  );
}

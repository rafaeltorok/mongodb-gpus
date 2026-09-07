import { useState } from "react";

// Utils
import calculatePerformance from "../../utils/calculatePerformance";
import getManufacturerClass from "../../utils/getManufacturerClass";

// Components
import DivisionHeader from "./DivisionHeader";
import Row from "./Row";
import EditableRow from "./EditableRow";

export default function GpuTable({ gpu }) {
  const [calculateMode, setCalculateMode] = useState(false);
  const [gpuData, setGpuData] = useState({ ...gpu });
  const [editedBoostClock, setEditedBoostClock] = useState(gpu.boostclock);
  const [editedMemClock, setEditedMemClock] = useState(gpu.memclock);

  // Get the classname to match the manufacturer color scheme
  const manufacturerName = getManufacturerClass(gpuData);

  // Format the VRAM amount in either GB or MB
  const vramToDisplay =
    gpuData.vram < 1 ? `${gpuData.vram * 1000}MB` : `${gpuData.vram}GB`;

  // Calculate the theoretical performance
  const performance = calculatePerformance(gpuData);

  return (
    <div className="container">
      <div className="table-main-header">
        <h2 className={manufacturerName}>
          {gpuData.manufacturer} {gpuData.gpuline} {gpuData.model}
        </h2>
      </div>
      <div className="tables">
        <table className={manufacturerName}>
          <DivisionHeader title={"SPECIFICATIONS"} />
          <tbody>
            <Row label={"CORES"} data={String(gpuData.cores)} />
            <Row label={"TMUs"} data={String(gpuData.tmus)} />
            <Row label={"ROPs"} data={String(gpuData.rops)} />
            <Row label={"VRAM"} data={`${vramToDisplay} ${gpuData.memtype}`} />
            <Row label={"BUS WIDTH"} data={`${String(gpuData.bus)} bit`} />
          </tbody>
        </table>

        <table className={manufacturerName}>
          <DivisionHeader title={"CLOCK SPEEDS"} />
          <tbody>
            <Row
              label={"BASE CLOCK"}
              data={`${String(gpuData.baseclock)} MHz`}
            />
            {calculateMode ? (
              <>
                <EditableRow
                  label={"BOOST CLOCK"}
                  data={editedBoostClock}
                  setData={setEditedBoostClock}
                />
                <EditableRow
                  label={"MEMORY CLOCK"}
                  data={editedMemClock}
                  setData={setEditedMemClock}
                />
              </>
            ) : (
              <>
                <Row
                  label={"BOOST CLOCK"}
                  data={`${String(gpuData.boostclock)} MHz`}
                />
                <Row
                  label={"MEMORY CLOCK"}
                  data={`${String(gpuData.memclock)} Gbps effective`}
                />
              </>
            )}
          </tbody>
        </table>

        <table className={manufacturerName}>
          <DivisionHeader title={"THEORETICAL PERFORMANCE"} />
          <tbody>
            <Row label={"FP32(float)"} data={performance[0]} />
            <Row label={"TEXTURE RATE"} data={performance[1]} />
            <Row label={"PIXEL RATE"} data={performance[2]} />
            <Row label={"BANDWIDTH"} data={performance[3]} />
          </tbody>
        </table>
      </div>

      {calculateMode ? (
        <button
          className="calculate-button"
          onClick={() => {
            setGpuData({
              ...gpuData,
              boostclock: editedBoostClock,
              memclock: editedMemClock,
            });
            setCalculateMode(false);
          }}
        >
          Confirm
        </button>
      ) : (
        <button
          className="calculate-button"
          onClick={() => {
            setCalculateMode(true);
          }}
        >
          Calculate performance
        </button>
      )}

      {calculateMode ? (
        <>
          <button
            className="cancel-button"
            onClick={() => {
              setEditedBoostClock(gpuData.boostclock);
              setEditedMemClock(gpuData.memclock);
              setCalculateMode(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="reset-button"
            onClick={() => {
              setGpuData({ ...gpu });
              setEditedBoostClock(gpu.boostclock);
              setEditedMemClock(gpu.memclock);
              setCalculateMode(false);
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}

import calculatePerformance from "../utils/calculatePerformance";

function renderRow(label, data) {
  return (
    <tr>
      <th>{label}</th>
      <td>{data}</td>
    </tr>
  );
}

function renderDivisionHeader(title) {
  return (
    <thead>
      <tr>
        <th className="table-header" colSpan={2}>
          {title}
        </th>
      </tr>
    </thead>
  );
}

function Gpu({ gpu }) {
  const manufacturerName =
    gpu.manufacturer.toLowerCase() === "nvidia"
      ? "nvidia"
      : gpu.manufacturer.toLowerCase() === "amd"
        ? "amd"
        : gpu.manufacturer.toLowerCase() === "intel"
          ? "intel"
          : gpu.gpuline.toLowerCase() === "geforce"
            ? "nvidia"
            : gpu.gpuline.toLowerCase() === "radeon"
              ? "amd"
              : gpu.gpuline.toLowerCase() === "arc"
                ? "intel"
                : "generic";
  const vramToDisplay = gpu.vram < 1 ? `${gpu.vram * 1000}MB` : `${gpu.vram}GB`;

  const performance = calculatePerformance(gpu);

  return (
    <div className="container">
      <div className="table-main-header">
        <h2 className={manufacturerName}>
          {gpu.manufacturer} {gpu.gpuline} {gpu.model}
        </h2>
      </div>
      <div className="tables">
        <table className={manufacturerName}>
          {renderDivisionHeader("SPECIFICATIONS")}
          <tbody>
            {renderRow("CORES", String(gpu.cores))}
            {renderRow("TMUs", String(gpu.tmus))}
            {renderRow("ROPs", String(gpu.rops))}
            {renderRow("VRAM", `${vramToDisplay} ${gpu.memtype}`)}
            {renderRow("BUS WIDTH", `${gpu.bus} bit`)}
          </tbody>
        </table>

        <table className={manufacturerName}>
          {renderDivisionHeader("CLOCK SPEEDS")}
          <tbody>
            {renderRow("BASE CLOCK", `${gpu.baseclock} MHz`)}
            {renderRow("BOOST CLOCK", `${gpu.boostclock} MHz`)}
            {renderRow("MEMORY CLOCK", `${gpu.memclock} Gbps effective`)}
          </tbody>
        </table>

        <table className={manufacturerName}>
          {renderDivisionHeader("THEORETICAL PERFORMANCE")}
          <tbody>
            {renderRow("FP32(float)", performance[0])}
            {renderRow("TEXTURE RATE", performance[1])}
            {renderRow("PIXEL RATE", performance[2])}
            {renderRow("BANDWIDTH", performance[3])}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Gpu;

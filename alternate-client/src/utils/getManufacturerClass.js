export default function getManufacturerClass(gpu) {
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
  return manufacturerName;
}

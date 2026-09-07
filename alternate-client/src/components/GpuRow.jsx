import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function GpuRow({ header, data }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {header}
      </TableCell>
      <TableCell align="right">{data}</TableCell>
    </TableRow>
  );
}

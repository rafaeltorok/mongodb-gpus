import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function GpuDivision({ title }) {
  return (
    <TableRow className="table-header">
      <TableCell component="th" colSpan={2}>
        {title}
      </TableCell>
    </TableRow>
  );
}

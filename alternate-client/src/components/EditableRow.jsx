import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function EditableRow({ header, data, setData }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {header}
      </TableCell>
      <TableCell align="right">
        <input
          className="edit-input-field"
          type="text"
          value={data}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val <= 0 || isNaN(val)) {
              setData(1);
            } else {
              setData(val);
            }
          }}
        />
      </TableCell>
    </TableRow>
  );
}

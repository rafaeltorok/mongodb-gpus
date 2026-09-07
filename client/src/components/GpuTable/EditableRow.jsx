export default function EditableRow({ label, data, setData }) {
  return (
    <tr>
      <th>{label}</th>
      <td>
        <input
          className="edit-mode-input-field"
          value={data}
          type="text"
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val <= 0 || isNaN(val)) {
              setData(1);
            } else {
              setData(val);
            }
          }}
        />
      </td>
    </tr>
  );
}

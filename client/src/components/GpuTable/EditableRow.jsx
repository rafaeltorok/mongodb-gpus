export default function EditableRow({ label, data, setData }) {
  return (
    <tr>
      <th>{label}</th>
      <td>
        <input
          className="edit-mode-input-field"
          value={data}
          type="number"
          onChange={(e) => setData(Number(e.target.value))}
        />
      </td>
    </tr>
  );
}

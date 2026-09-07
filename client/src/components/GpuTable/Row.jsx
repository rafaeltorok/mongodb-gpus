export default function Row({ label, data }) {
  return (
    <tr>
      <th>{label}</th>
      <td>{data}</td>
    </tr>
  );
}

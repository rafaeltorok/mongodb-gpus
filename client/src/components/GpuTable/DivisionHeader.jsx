export default function DivisionHeader({ title }) {
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

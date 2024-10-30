function TableRow(props) {
  const { td1, td2, td3, children } = props;
  return (
    <tr>
      <td className="pb-2 text-left">{td1}</td>
      <td className="pb-2 text-left">{td2}</td>
      <td className="pb-2 text-left">{td3}</td>
      <td className="pb-2 text-left">{children}</td>
    </tr>
  );
}

export default TableRow;

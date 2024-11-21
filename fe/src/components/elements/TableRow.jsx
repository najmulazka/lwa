function TableRow(props) {
  const { td1, td2, td3, children } = props;
  return (
    <tr>
      <td className="text-left">{td1}</td>
      <td className="text-center  bg-blue-100 rounded-lg">{td2}</td>
      <td className="text-left">{td3}</td>
      <td className="text-left">{children}</td>
    </tr>
  );
}

export default TableRow;

function Table(props) {
  const { th1, th2, th3, th4, children } = props;
  return (
    <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
      <table className="table w-full text-base border-separate md:border-spacing-y-4 md:border-spacing-x-2">
        <thead>
          <tr className="text-blue-300">
            <th className="md:w-2 pb-2 md:pr-4 text-left">{th1}</th>
            <th className="w-1/3 md:w-1/5 pb-2 text-left">{th2}</th>
            <th className="text-left pb-2 text-left">{th3}</th>
            <th className="md:w-24 pb-2 text-left">{th4}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

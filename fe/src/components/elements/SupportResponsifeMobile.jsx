function SupportResponsifeMobile(props) {
  const { children } = props;
  return (
    <div>
      <div className="block lg:hidden text-center bg-red-100 text-red-700 border border-red-300 p-4 rounded">Tampilan belum mendukung responsif mobile.</div>
      <div className="hidden lg:block">{children}</div>
    </div>
  );
}

export default SupportResponsifeMobile;

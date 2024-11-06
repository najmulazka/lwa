function Overview(props) {
  const { name, image } = props;
  return (
    <div className="flex flex-row justify-between py-4 px-16 items-center border-b-2 border-gray-200 bg-white">
      <span className="text-3xl">Overview</span>
      <div className="flex flex-row items-center space-x-2">
        <span>{name}</span>
        <img src={image} alt="gambar" className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

export default Overview;

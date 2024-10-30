function TestimoniItem(props) {
  const { children, image, name, position } = props;
  return (
    <div id="testimoni" className="h-72 w-80 border shadow-md rounded-lg p-4 relative mb-4 bg-white flex-shrink-0">
      <p className="mb-4">{children}</p>
      <div className="absolute bottom-4 left-4 flex space-x-2 items-center">
        <img src={image} alt="image" className="h-10 w-10 rounded-full" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimoniItem;

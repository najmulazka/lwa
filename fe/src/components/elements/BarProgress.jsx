function ProgressBar(props) {
  const { label, current, total } = props;
  // Hitung persentase berdasarkan nilai current dan total
  const percentage = (current / total) * 100;

  return (
    <div className="mb-2 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800 font-medium">{label}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="flex justify-end">
        <span className={`${current >= total * 0.7 ? 'text-green-500' : 'text-red-500'} text-sm`}>
          {current}/{total}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;

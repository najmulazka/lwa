function CircleProgress(props) {
  const { percentage } = props;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="rotate-90 w-32 h-32 md:w-44 md:h-44 "
        viewBox="0 0 180 180"
      >
        <circle
          stroke="#e6e6e6"
          strokeWidth="20"
          fill="transparent"
          r={radius}
          cx="90"
          cy="90"
        />
        <circle
          stroke="#4ade80"
          strokeWidth="20"
          fill="transparent"
          r={radius}
          cx="90"
          cy="90"
          strokeDasharray={circumference}
          strokeDashoffset={isNaN(offset) ? 0 : offset}
        />
      </svg>
      <div className="absolute text-3xl font-bold text-blue-500 sm:text-xl">
        {percentage}%
      </div>
    </div>
  );
}


export default CircleProgress;

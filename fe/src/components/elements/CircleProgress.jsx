// import PropTypes from 'prop-types';

function CircleProgress(props) {
  const { percentage } = props;
  const radius = 80; // Perbesar radius lingkaran
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width="180" height="180" className="rotate-90">
        <circle
          stroke="#e6e6e6"
          strokeWidth="20"
          fill="transparent"
          r={radius}
          cx="90" // Sesuaikan posisi tengah
          cy="90"
        />
        <circle stroke="#4ade80" strokeWidth="20" fill="transparent" r={radius} cx="90" cy="90" strokeDasharray={circumference} strokeDashoffset={isNaN(offset) ? 0 : offset} />
      </svg>
      <div className="absolute text-3xl font-bold text-blue-500">{percentage}%</div>
    </div>
  );
}

export default CircleProgress;

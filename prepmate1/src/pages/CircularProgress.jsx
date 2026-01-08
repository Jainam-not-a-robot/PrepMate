const ResultDonut = ({ correct, wrong, unattempted, total }) => {
  const radius = 80;
  const stroke = 30;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const correctLength = (correct / total) * circumference;
  const unattemptedLength = (unattempted / total) * circumference;
  const wrongLength = (wrong / total) * circumference;

  return (
    <div className="relative w-[200px] h-[200px]">
      <svg height="200" width="200">
        {/* Background circle */}
        <circle
          stroke="#1f2933"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="100"
          cy="100"
        />

        {/* Correct (Green) */}
        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${correctLength} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          r={normalizedRadius}
          cx="100"
          cy="100"
          transform="rotate(-90 100 100)"
        />

        {/* Unattempted (Yellow) */}
        <circle
          stroke="#eab308"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${unattemptedLength} ${circumference}`}
          strokeDashoffset={-correctLength}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="100"
          cy="100"
          transform="rotate(-90 100 100)"
        />

        {/* Wrong (Red) */}
        <circle
          stroke="#ef4444"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${wrongLength} ${circumference}`}
          strokeDashoffset={-(correctLength + unattemptedLength)}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="100"
          cy="100"
          transform="rotate(-90 100 100)"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-green-400">
          {correct}
        </p>
        <p className="text-gray-400 text-sm">
          out of {total}
        </p>
      </div>
    </div>
  );
};

export default ResultDonut;

import React from "react";

interface Props {
  data: number[];       // [135000, 90000, 45000, 30000]
  colors: string[];     // ["#FF9F5B", "#FFD86E", ...]
  centerText: string;   // "350,000"
}

const CategoryDonutChart = ({ data, colors, centerText }: Props) => {
  const total = data.reduce((sum, v) => sum + v, 0);
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  // 각 항목별 퍼센트 → stroke-dasharray 로 변환
  let offset = 0;
  const segments = data.map((value, index) => {
    const percent = value / total;
    const arcLength = percent * circumference;
    const segment = {
      color: colors[index],
      dash: `${arcLength} ${circumference - arcLength}`,
      offset,
    };
    offset += arcLength;
    return segment;
  });

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="#EDEDED"
          strokeWidth="20"
        />

        {segments.map((seg, idx) => (
          <circle
            key={idx}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={seg.color}
            strokeWidth="20"
            strokeDasharray={seg.dash}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>

      {/* 가운데 텍스트 */}
      <span className="absolute text-text-primary font-semibold text-[16px]">
        {centerText}
      </span>
    </div>
  );
};

export default CategoryDonutChart;

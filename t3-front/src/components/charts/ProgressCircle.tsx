import Chart from "react-apexcharts";
import { UNITS } from "../../constants/";

interface ProgressCircleProps {
  current: number;
  goal: number;
  mode?: "percent" | "fraction";
}

export default function ProgressCircle({
  current,
  goal,
  mode = "fraction",
}: ProgressCircleProps) {
  const percent = Math.round((current / goal) * 100);
  const series = [percent];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },

    colors: ["#00DE4D"], // primary-green
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: "54%",
        },
        track: {
          background: "#EDEDED",
          strokeWidth: "100%",
        },
        dataLabels: {
          show: false,
        },
      },
    },

    stroke: { lineCap: "round" },
  };

  return (
    <div className="relative w-40 h-28 flex items-center justify-center">
      <Chart options={options} series={series} type="radialBar" width="64%" />

      {mode === "fraction" ? (
        <div className="absolute flex items-end gap-[3px] translate-y-[18px]">
          <span className="text-text-green font-bold text-[1.5rem] leading-none">
            {current}
          </span>
          <span className="text-text-gray font-semibold text-[1.2rem] leading-none">
            /{goal}
          </span>
        </div>
      ) : (
        <div className="absolute flex items-end gap-[2px] translate-y-[10px]">
          <span className="text-text-green font-bold text-2xl leading-none">
            {percent}
          </span>
          <span className="text-text-gray font-semibold text-lg leading-none">
            {UNITS.PERCENT}
          </span>
        </div>
      )}
    </div>
  );
}

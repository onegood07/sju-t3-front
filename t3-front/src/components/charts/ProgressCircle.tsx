import Chart from "react-apexcharts";

interface ProgressCircleProps {
    current: number;
    goal: number;
    mode?: "percent" | "fraction"; // 추가됨
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
                    size: "70%",
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
            <Chart options={options} series={series} type="radialBar" width="100%" />


            {mode === "fraction" ? (
                <div className="absolute flex items-end gap-[3px] translate-y-[18px]">
                    <span className="text-text-green font-bold text-[20px] leading-none">
                        {current}
                    </span>
                    <span className="text-text-gray font-semibold text-[17px] leading-none">
                        /{goal}
                    </span>
                </div>
            ) : (
                <div className="absolute flex items-end gap-[2px] translate-y-[18px]">
                    <span className="text-text-green font-bold text-[20px] leading-none">
                        {percent}
                    </span>
                    <span className="text-text-gray font-semibold text-[17px] leading-none">
                        %
                    </span>
                </div>
            )}
        </div>
    );
}

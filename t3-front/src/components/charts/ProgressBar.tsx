type ProgressVariant = "green" | "red";

interface ProgressBarProps {
    label: string;       //즉흥, 계획 키워드 
    value: number;       //각 키워드 개수
    total: number;       //전체 키워드 개수
    variant?: ProgressVariant; //색상
}

export default function ProgressBar({
    label,
    value,
    total,
    variant = "green",
}: ProgressBarProps) {
    const percent = (value / total) * 100;

    // variant 기반 색상 매핑
    const variantColors: Record<ProgressVariant, string> = {
        green: "bg-primary-green",
        red: "bg-primary-red",
    };

    const barColor = variantColors[variant];

    return (
        <div className="w-full mb-2">
            <div className="flex justify-between text-sm mb-1">
                <span className="text-text-primary">{label}</span>
                <span className="text-text-gray">{value}개</span>
            </div>

            <div className="w-full h-3 bg-gray-chart rounded-full overflow-hidden">
                <div
                    className={`${barColor} h-3 rounded-full`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

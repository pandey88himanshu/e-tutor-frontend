import { ReactNode } from "react";

interface StatsCardProps {
    icon: ReactNode;
    value: number | string;
    label: string;
    iconBgColor?: string;
    iconColor?: string;
}

const StatsCard = ({
    icon,
    value,
    label,
    iconBgColor = "bg-[rgb(var(--primary-100))]",
    iconColor = "text-[rgb(var(--primary-500))]",
}: StatsCardProps) => {
    return (
        <div className="flex items-center gap-3 p-4 bg-white border border-[rgb(var(--gray-200))] rounded-lg">
            {/* Icon Container - Circular */}
            <div
                className={`flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 ${iconBgColor}`}
            >
                <span className={`text-lg ${iconColor}`}>{icon}</span>
            </div>

            {/* Text */}
            <div>
                <p className="text-xl font-semibold text-[rgb(var(--gray-900))]">
                    {value}
                </p>
                <p className="body-sm-400 text-[rgb(var(--gray-500))]">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default StatsCard;
